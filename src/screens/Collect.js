import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Separator from '../components/Separator';
import CollectModel from '../models/CollectModel';

export default function Collect({ navigation, route }) {
  const [state, setState] = React.useState({
    collectName: '',
    collectWeight: '',
    collectCount: '',
  });

  const handleChangeText = (key, value) => {
    setState({ ...state, [key]: value });
  }

  let id = route.params ? route.params.id : undefined;

  React.useEffect(() => {
    if (!route.params) return;
    setState({ collectName: route.params.name, collectWeight: route.params.price.toString(), collectCount: route.params.qty.toString() });
  }, [route]);

  async function handleSave() {
    if (!state.collectName || !state.collectWeight || !state.collectCount) {
      Alert.alert(
        'Erro ao tentar cadastrar coleta:',
        'Preencha todos os campos corretamente!'
      );
    } else {
      const listItem = {
        name: state.collectName, price: parseFloat(state.collectWeight),
        qty: parseInt(state.collectCount)
      };
      CollectModel.saveItem(listItem, id)
        .then(() => {
          setState({});
          Alert.alert(
            'Dados da Coleta:',
            'Coleta salva com sucesso!'
          );
        })
        .then(() => navigation.navigate("CollectList", listItem))
        .catch(
          () => Alert.alert(
            'Erro ao tentar cadastrar coleta:',
            'Erro no AsyncStorage!'
          )
        );
      route.params = null;
    }
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.titleText}>Dados da Coleta</Text>
      </View>
      <View style={styles.containerBody}>
        <TextInput
          style={styles.input}
          value={state.collectName}
          onChangeText={(value) => handleChangeText('collectName', value)}
          placeholder={'Nome da Coleta'}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          value={state.collectWeight}
          placeholder={'Taxa (R$)'}
          onChangeText={(value) => handleChangeText('collectWeight', value)}
          keyboardType="numeric"
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          value={state.collectCount}
          placeholder={'Peso (Kg)'}
          onChangeText={(value) => handleChangeText('collectCount', value)}
          keyboardType="numeric"
          clearButtonMode="always"
        />
        <Separator marginVertical={30} />
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
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
  containerFooter: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
 buttonPrimary: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    padding: 5,
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});