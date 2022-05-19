import React, {createContext, useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {AuthContext} from './contexts/Auth';
import Icon from 'react-native-vector-icons/AntDesign';
import ListaReceitas from './ListaReceitas';
import GerenciarUsuario from './GerenciarUsuario';
import CadastrarReceitas from './CadastrarReceitas';
import Options from './Options';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const {user, setUser, logged, setLogged} = useContext(AuthContext);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  });
  // when back button is pressed don't back to cadastro screen

  // if user.TIPO_USUARIO == 'ADMIN' then show options screen

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#000000',
        tabBarItemStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarStyle: {
          fontFamily: 'Outfit-SemiBold',
          display: 'flex',
          backgroundColor: '#48BF84',
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Receitas"
        component={ListaReceitas}
        
        options={{
          tabBarLabelStyle:{
            fontFamily: 'Outfit-Bold',
            fontSize: 12,
          },
          tabBarLabel: 'Receitas',
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color}></Icon>
          ),
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
        }}></Tab.Screen>
      <Tab.Screen name="Opções" component={Options}
      options={{
        headerStyle:{
          backgroundColor: '#ffffff',
          
        },
        headerTintColor: '#000000',
        headerTitleAlign: 'center',
        title: 'Opções',
        tabBarLabelStyle:{
          fontFamily: 'Outfit-Bold',
          fontSize: 12,
        },
        tabBarLabel: 'Opções',
        tabBarIcon: ({size, color}) => (
          <Icon name="setting" size={size} color={color}></Icon>
        ),
      }} />
      {user.TIPO_USUARIO === 'ADMIN' ? (
        <>
          <Tab.Screen name="GerenciarUsuario" component={GerenciarUsuario} />
          <Tab.Screen name="CadastrarReceitas" component={CadastrarReceitas} />
        </>
      ) : (
        <></>
      )}
    </Tab.Navigator>
  );
};

export default Home;
