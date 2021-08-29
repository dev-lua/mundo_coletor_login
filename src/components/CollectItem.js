import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CollectModel from '../models/CollectModel';

export default function CollectItem(props) {

    async function handleEditButton() {
        const item = await CollectModel.getItem(props.item.id);
        props.navigation.navigate("Collect", item);
    }

    function handleDeletePress() {
        Alert.alert(
            "Atenção:",
            `Tem certeza que deseja excluir "${props.item.name}"?`,
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                        CollectModel.deleteItem(props.item.id)
                            .then(response => props.navigation.navigate("CollectList", { id: props.item.id }));
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.itemTextName}>{props.item.name}</Text>
            <View style={styles.itemLayoutDetail}>
                <Text style={styles.itemTextDetailTitle}>PROTOCOLO: </Text>
                <Text style={styles.itemTextDetail}>{props.item.id}</Text>
            </View>
            <View style={styles.itemLayoutDetail}>
                <Text style={styles.itemTextDetailTitle}>Taxa: R$ </Text>
                <Text style={styles.itemTextDetail}>{props.item.price},00</Text>
            </View>
            <View style={styles.itemLayoutDetail}>
                <Text style={styles.itemTextDetailTitle}>Peso: </Text>
                <Text style={styles.itemTextDetail}>{props.item.qty}Kg</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                    <MaterialCommunityIcons name="delete-forever" color="#FFF" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEditButton}>
                    <MaterialCommunityIcons name="file-document-edit-outline" color="#FFF" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 15,
        width: '100%',
        borderRadius: 10,
        padding: 5,
    },
    itemLayoutDetail: {
        flexDirection: 'row',
    },
    itemTextName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    itemTextDetailTitle: {
        fontSize: 15,
        color: '#222',
    },
    itemTextDetail: {
        fontSize: 15,
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    editButton: {
        marginLeft: 10,
        height: 30,
        backgroundColor: '#333',
        borderRadius: 7,
        padding: 5,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 30,
        backgroundColor: '#333',
        borderRadius: 7,
        padding: 5,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
});