/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import Checkbox from 'expo-checkbox';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Pressable,
  Modal,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bezeichnung,setBezeichnung] = React.useState("");
  const [laden, setLaden] = React.useState("");
  const [lastStore, setLastStore] = React.useState(null);
  const [date, seteDate] = React.useState(null);
  let item = {};

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const renderItems = () => {

    /*
    const arr = new Set(items.map((item: any) => item.store));
    const arr2 = [{'Aldi': ['Pizza', 'Eis']}, {'Lidl': ['Eis', 'Pommes']}];
    console.log(arr2[1].Lidl);*/

    if (items.length < 1) {return}
    const sortedItems = items.sort((a: any, b: any) => {return a.store.localeCompare(b.store)});

    return sortedItems.map((item: any, index: number) => {
        // Überprüfe, ob es ein vorheriges Element gibt
        const previousItem = index > 0 ? sortedItems[index - 1] : null;
      
      // Überprüfe, ob der aktuelle Wert von item.store nicht mit dem vorherigen übereinstimmt
      const showStore = !previousItem || item.store !== previousItem.store;
    
      return (
        <View key={index}>
        <View>
          {showStore && <Text style={styles.storeText}>{item.store}</Text>}
        </View>
        <View style={styles.itemView} key={item.id}>
          <Text style={styles.taskItem}>{item.title}</Text>
          <View style={styles.checkboxView}>
            <Checkbox style={styles.checkbox}
              value={item.isDone}
              onValueChange={() => {
                item.isDone = !item.isDone;
                item.changeDate = new Date();
                updateItems(items);
                resetFeatures();
              }}
            />
          </View>
        </View>
        </View>
      );
    });
    

  };

  const [items, setItems] = React.useState<any>([]);

  useEffect(() => {
    // Diese Funktion wird beim Start der App aufgerufen
    //clearAllData();
    loadItemsFromStorage();
  }, []);

  const loadItemsFromStorage = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('items');
      if (savedItems) {
        // Wenn gespeicherte Aufgaben gefunden wurden, lade sie in den State
        const parsedItems = JSON.parse(savedItems);

        saveItemsToStorage(parsedItems);
        const filteredItems = parsedItems.filter((element: any) => {

          if (element.isDone === false) {return true};

          if (element.changeDate < new Date()) {return false};

          return true;
        })
        setItems(filteredItems);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Aufgaben: ' + error);
    }
  };

  const saveItemsToStorage = async (newTasks: any) => {
    try {
      // Speichere die Aufgaben im AsyncStorage
      await AsyncStorage.setItem('items', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Fehler beim Speichern der Aufgaben: ' + error);
    }
  };

  async function clearAllData() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Fehler beim Löschen des AsyncStorage:', error);
    }
  };

  function createItems(){

    //let itemId: number = items.length > 0 ? items[items.length-1].id+1 : 1;
    let itemId = null;
    if (items.length > 0) {
      itemId = items.length+1;
    } else {itemId = 1};

    item = {
      'id': itemId,
      'title': bezeichnung,
      'store': laden,
      'isDone': false,
      'changeDate': null,
    };

    addItem(item);

    updateItems(items);
    {resetFeatures()};
    {renderItems};

  };

  const addItem = (newItem: any) => {
    
    items.push(newItem);
    saveItemsToStorage(items);
  };

  const updateItems = (itemsToSave: any) => {
    {saveItemsToStorage(itemsToSave)};
    loadItemsFromStorage();
  };

  const resetFeatures = (): void => {
    setBezeichnung('');
    setLaden('');
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},]}
          >
            <TextInput
              style={[{backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}
              placeholder="Bezeichnung"
              placeholderTextColor={isDarkMode ? Colors.lighter : Colors.darker}
              value={bezeichnung}
              onChangeText={setBezeichnung}
            />
            <TextInput
              style={[{backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}
              placeholder="Laden"
              placeholderTextColor={isDarkMode ? Colors.lighter : Colors.darker}
              value={laden}
              onChangeText={setLaden}
            />
            
            <Pressable
              style={[styles.buttonAnlegen]}
              onPress={() => {
                if (bezeichnung.length < 1 || laden.length < 1){
                  Alert.alert('Bitte geben Sie Bezeichnung und einen Laden ein!');
                  return;
                }
                setModalVisible(false);
           
                createItems();
           
              }}
            >
            <Text style={styles.textStyle}>erstellen</Text>
           </Pressable>
          </View>
        </View>
      </Modal>
      {renderItems()}
      <View style={styles.buttonView}>
        <Pressable
          style={[styles.button, styles.buttonNewItem]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>+</Text>
        </Pressable>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  checkboxView: {
    width: '40%',
  },
  checkbox: {
    alignSelf: 'center',
    checkedIcon: 'dot-circle-o',
    uncheckedIcon: 'square-o',
  },
  taskItem:{
    width: '30%',
    marginBottom: 3,
    marginLeft: '30%',
  },
  itemView:{
    flexDirection: "row",
    alignItems:"flex-start" ,
    width: '100%',
    marginLeft: 5,
    borderBottomColor: '#000',
    borderBottomWidth: .3,
    borderStyle: 'solid',
    marginTop: 3,
  },
  buttonNewItem: {
    backgroundColor: '#2196F3',
    height: 50,
    width: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 1,
    bottom: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      alignSelf: 'flex-end',
      backgroundColor: '#2196F3',
      height: 50,
      width: '33%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
  },
  modalView: {
    width: "75%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    boxShadow: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonAnlegen: {
    backgroundColor: '#2196F3',
    height: 20,
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default App;
