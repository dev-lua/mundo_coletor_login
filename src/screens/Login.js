import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Imagem e componente da logo
import logo_mundo_coletor from '../img/favicon.png';
import ImageLogo from '../components/CustomImageLogo';
// import RefreshPage from '/home/lua/MundoColetor/src/components/RefreshPage';

export default function Login({ navigation, route }) {
  const [registeredState, setRegisteredState] = React.useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [haveAccount, setHaveAccount] = React.useState(false);

  async function getUserData() {
    let userData = await SecureStore.getItemAsync('userData');
    if (userData) {
      setEmail(JSON.parse(userData).email);
      setRegisteredState({ ...JSON.parse(userData) });
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }

  React.useEffect(() => {
    getUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  // Validações gerais
  const assetEmpty = (value) => value.length === 0;
  const assertEquals = (value1, value2) => value1 === value2;

  const buttonInactive = assetEmpty(email) || assetEmpty(password);

  // Redireciona para 'home' ou invalida credenciais
  function handleLogin() {
    if ((!assetEmpty(email) && !assetEmpty(password))
      && assertEquals(email, registeredState.email)
      && assertEquals(password, registeredState.password)
    ) {
      setPassword('');
      global.nameLogin = registeredState.name;
      navigation.replace('BottomStack');
    } else {
      Alert.alert(
        'Não foi possível entrar:',
        'E-mail/senha incorretos!'
      );
    }
  }

  function handleRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  }

  function handleDeleteRegister() {
    SecureStore.deleteItemAsync('userData');
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <ImageLogo
          fromWeb={false}
          image={logo_mundo_coletor}
          text={'Bem vindo(a)!'}
        />
      </View>

      <View style={styles.containerBody}>
        <TextInput
          style={styles.input}
          defaultValue={email}
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder={'E-mail'}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
        />

        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder={'Senha'}
          secureTextEntry={true}
          style={styles.input}
        />

        {haveAccount ? (
          <TouchableOpacity
            style={styles.getPassword}
            onPress={() =>
              Alert.alert(
                'Recuperar Conta',
                `Uma nova senha foi enviada para o email informado '${registeredState.email}'. Sua nova senha é ${registeredState.password}.`
              )
            }>
            <Text style={styles.textUnderline}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        ) : null}
        
      </View>
      <TouchableOpacity
        onPress={handleDeleteRegister}>
        <Text style={styles.buttonSecundaryText}>DELETAR CHAVE</Text>
      </TouchableOpacity>

      <View style={styles.containerFooter}>
        <TouchableOpacity
          disabled={buttonInactive}
          style={[
            styles.buttonPrimary,
            buttonInactive ? styles.buttonInactive : styles.buttonActive,
          ]}
          onPress={handleLogin}>
          <Text style={styles.buttonPrimaryText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecundary}
          onPress={handleRegister}>
          <Text style={styles.buttonSecundaryText}>CADASTRE-SE</Text>
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
  titleWelcome: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 35,
    paddingTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    padding: 5,
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    marginBottom: 5,
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
  buttonPrimaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonSecundaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  buttonInactive: {
    backgroundColor: '#999999',
    borderColor: '#000000',
  },
  buttonActive: {
    backgroundColor: '#000000',
  },
  textUnderline: {
    paddingTop: 5,
    color: '#000000',
    textDecorationLine: 'underline',
  },
});
