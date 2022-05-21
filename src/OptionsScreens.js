import React from "react"
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
    BackHandler
  } from 'react-native';
import Options from "./Options";
import AlterarNome from "./AlterarNome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const OptionsScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Options"
        component={Options}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AlterarNome"
    
        component={AlterarNome}
        options={{
          headerShown: true,
          title: 'Atualizar Nome',
        }}
      />
      </Stack.Navigator>
    );
  }

export default OptionsScreen;