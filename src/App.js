//import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
} from 'react-native';
import Login from './Login';
import Cadastro from './Cadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {

  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{headerTransparent: true, headerShadowVisible: false, title: ''}}
          /*title: "",
          headerStyle:{
            backgroundColor: 'translucent'
          },
        
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}*/
      />
      </Stack.Navigator>
      </NavigationContainer>
  )

}

export default App;