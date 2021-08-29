import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {
  async function handleCollectsDelete() {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        'Excluir Coletas',
        'Todos as coletas foram excluídas com sucesso!'
      );
    } catch (error) {
      Alert.alert(
        'Erro na exclusão de coletas:',
        error
      );
    }
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <Text
          style={styles.titleWelcome}>Olá {global.nameLogin}, seja bem-vindo(a)!</Text>
        <Text>Vamos cadastrar coletas!?</Text>
      </View>

      <View style={styles.containerBody}>
        <TouchableOpacity
          style={styles.buttonSecundary}
          onPress={handleCollectsDelete}>
          <Text style={styles.buttonSecundaryText}>DELETAR TODAS AS COLETAS</Text>
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
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    position: 'relative',
  },
  titleWelcome: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 35,
    paddingTop: 10,
  },
  buttonSecundary: {
    marginTop: 5,
    backgroundColor: '#ffffff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonSecundaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});