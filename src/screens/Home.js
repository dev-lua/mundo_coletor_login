import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Imagem
import logo_mundo_coletor from '../img/favicon.png';

// Componentes
import Separator from '../components/Separator';
import ImageLogo from '../components/CustomImageLogo';

export default function Home({ navigation, route }) {
    async function handleCollectDelete() {
        try {
            await AsyncStorage.clear();
            Alert.alert(
                'Cadastro de Coletas:',
                'Todos as coletas foram excluídas com sucesso!'
            );
        } catch(error) {
            Alert.alert(
                'Erro na exclusão de coletas:',
                error
            );
        }
    }

    return (
        <>
            <View style={styles.containerHeader}>
                <ImageLogo
                    fromWeb={false}
                    image={logo_mundo_coletor}
                    text={['Olá, ' + global.nameLogin + '! Seja bem-vindo(a)!']}
                />
            </View>
            <View style={styles.containerBody}>
                <Text>É tão bom vê-lo(a) por aqui! </Text>
                <Separator marginVertical={10} />
                <Text>Vamos cadastrar novas coletas?</Text>

                <TouchableOpacity style={styles.saveButton} onPress={handleCollectDelete}>
                    <Text>Deletar todas as Coletas</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    containerBody: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        position: 'relative',
    },
    containerFooter: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    },
});