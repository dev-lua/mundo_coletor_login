import * as React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomStack from './BottomStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Collect':
      return 'Coleta';
    case 'CollectList':
      return 'Coletas Cadastradas';
  }
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEF3B4' }}>
      <StatusBar style="auto" backgroundColor="#AD6200" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#000' }, // Header color
            headerTintColor: '#FFFFFF', // Header text color
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Entrar',
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Cadastre-se' }}
          />
          <Stack.Screen
            name="BottomStack"
            component={BottomStack}
            options={({ navigation, route }) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Atenção!',
                      'Deseja sair do aplicativo?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => navigation.replace('Login'),
                        },
                        {
                          text: 'Não',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={{ padding: 10 }}
                >
                  <MaterialCommunityIcons name="exit-run" color="#FFF" size={26} />
                </TouchableOpacity>
              ),
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
