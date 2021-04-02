import React from 'react';
import {StyleSheet, View} from 'react-native';
import AutocompleteAddress from "./index.js";

export default function App() {
    return (
        <View style={styles.container}>
            <AutocompleteAddress inputWidth={400} onFindAddress={(address) => {
                console.log(address)
            }} onSearchError={(e) => {
                console.log(e)
            }} placeholder={"Cherchez une adresse, un lieu..."}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
