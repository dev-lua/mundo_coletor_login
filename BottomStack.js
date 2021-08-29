import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; //Nova Coleta
import { MaterialIcons } from '@expo/vector-icons'; //Listar Coletas
import Home from './src/screens/Home';
import Collect from './src/screens/Collect';
import CollectList from './src/screens/CollectList';

const Tab = createMaterialBottomTabNavigator();

export default function BottomStack({ navigation, route }) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FFFFFF"
            inactiveColor="#FFC300"
            barStyle={{ backgroundColor: '#E37D00' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Collect"
                component={Collect}
                options={{
                    tabBarLabel: 'Novo',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box-outline" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="CollectList"
                component={CollectList}
                options={{
                    tabBarLabel: 'Listar',
                    tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" color={color} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
}
