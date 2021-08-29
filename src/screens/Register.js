import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import logo_mundo_coletor from '../img/favicon.png';
import CustomImageLogo from '../components/CustomImageLogo';


export default function Register({ navigation }) {
    const [state, setState] = React.useState({
        userName: '',
        userPhone: '',
        userEmail: '',
        userPassword: '',
    });

    const [userPasswordConfirm, setUserPasswordConfirm] = React.useState('');

    const saveUserData = (userData) => {
        return SecureStore.setItemAsync('userData', JSON.stringify(userData));
    };

    const emptyField = (value) => value === '';

    const validatePassword = (password, passwordConfirm) => {
        if (
            password === passwordConfirm ||
            emptyField(password) ||
            emptyField(passwordConfirm)
        ) {
            return true;
        }
        return false;
    };

    function handleRegister() {
        if (
            emptyField(state.userName) ||
            emptyField(state.userPhone) ||
            emptyField(state.userEmail) ||
            emptyField(state.userPassword) ||
            emptyField(state.userPasswordConfirm) ||
            !validatePassword(state.userPassword, state.userPasswordConfirm)
        ) {
            Alert.alert(
                'Erro ao tentar cadastrar usuário:',
                'Preencha todos os campos corretamente!'
            );
        } else {
            saveUserData({
                name: state.userName,
                phone: state.userPhone,
                email: state.userEmail,
                password: state.userPassword,
            });
            navigation.navigate('Login', { email: state.userEmail });
        }
    }

    const handleChangeText = (key, value) => {
        setState({ ...state, [key]: value });
    };

    return (
        <>
            <View style={styles.containerHeader}>
                <CustomImageLogo
                    fromWeb={false}
                    image={logo_mundo_coletor}
                    text={'Dados do Usuário'}
                />
            </View>

            <View style={styles.containerBody}>
                <TextInput
                    style={styles.input}
                    value={state.userName}
                    onChangeText={(value) => handleChangeText('userName', value)}
                    placeholder={'Nome'}
                />
                <TextInput
                    style={styles.input}
                    value={state.userPhone}
                    onChangeText={(value) => handleChangeText('userPhone', value)}
                    placeholder={'Telefone'}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={state.userEmail}
                    onChangeText={(value) => handleChangeText('userEmail', value)}
                    placeholder={'E-mail'}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                />
                <TextInput
                    value={state.userPassword}
                    onChangeText={(value) => handleChangeText('userPassword', value)}
                    placeholder={'Senha'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    value={state.userPasswordConfirm}
                    onChangeText={(value) =>
                        handleChangeText('userPasswordConfirm', value)
                    }
                    placeholder={'Confirmar Senha'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Text style={styles.inputError}>
                    {[validatePassword(state.userPassword, state.userPasswordConfirm) == false ? 'Senhas não conferem' : '']}
                </Text>


            </View>

            <View style={styles.containerFooter}>
                <Text style={styles.textSimple}>
                    Atenção! Infome um e-mail válido, pois em caso de recuperação de senha, ela
                    será enviada para o e-mail cadastrado.
                </Text>

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
                    <Text style={styles.buttonPrimaryText}>CADASTRAR-SE</Text>
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
        padding: 15,
    },
    containerBody: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        position: 'relative',
    },
    containerFooter: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,

    },
    buttonPrimary: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#000000',
    },
    buttonPrimaryText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
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
    inputError: {
        color: '#AF3B3B',
        fontSize: 12,
    },
    textSimple: {
        color: '#999999',
        textAlign: 'justify',
        fontSize: 12,
    }
});
