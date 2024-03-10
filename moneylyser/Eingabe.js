/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SelectList } from 'react-native-dropdown-select-list';

function Eingabe() {
    const [number, onChangeNumber] = React.useState('');
    const [konto, setKonto] = React.useState("");
    const [a, setA] = React.useState("")

    const art = [
        { item: 'Einnahme', value: 'Einnahme' },
        { item: 'Ausgabe', value: 'Ausgabe' }
    ];

    const konten = [
        { item: 'Girokonto', value: 'Girokonto' },
        { item: 'Urlaub', value: 'Urlaub' },
        { item: 'Notgroschen', value: 'Notgroschen' },
        { item: 'R&uuml;ckstellungen', value: 'Rückstellungen' },
        { item: 'Aktien/ETFs', value: 'Aktien/ETFs' },
        { item: 'Timeless', value: 'Timeless' }
    ];

    return (
        <View
            style={styles.centeredContainer}
        >
            <SelectList
                boxStyles={styles.dropdown}
                placeholder='Konto'
                setSelected={(val) => setKonto(val)}
                data={konten}
                save="value"
            />
            <SelectList
                boxStyles={styles.dropdown}
                placeholder='Zu-/Abfluss'
                setSelected={(val) => setA(val)}
                data={art}
                save="value"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Betrag"
                keyboardType="numeric"
            />
            <Text>{number}</Text>
            <Text>{a}</Text>
            <Text>{konto}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredContainer: {
        backgroundColor: "white",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default Eingabe;