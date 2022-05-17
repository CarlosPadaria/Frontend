import React,{createContext, useContext, useEffect} from 'react';
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
  import {AuthContext} from './contexts/Auth'
 
const Home = () => { 

    const {user, setUser, logged, setLogged} = useContext(AuthContext) 
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', () => true);
        };
      });
    // when back button is pressed don't back to cadastro screen

    

    return (
        <View>
            <Text>
                Olá {user.NOME}
                Seus dados sao: {user.EMAIL}
                {user.SENHA}
                {user.TIPO}
            </Text>
        </View>
    )
}

export default Home;