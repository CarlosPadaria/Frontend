import React, {useContext, useEffect} from 'react';
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
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles/styleLogin';
import {AuthContext} from './contexts/Auth';

const Login = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
 
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/novalogo.png')}
          style={{
            width: 260,
            height: 110,
          }}></Image>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCorrect={false}
          autoComplete={'email'}
          maxLength={100}
        />
        <Icon name="mail" style={styles.IconEmail} size={25}></Icon>
        <TextInput
          placeholder="Senha"
          style={styles.input}
          autoComplete={'password'}
          secureTextEntry={true}
          maxLength={32}
        />
        <Icon name="lock" style={styles.IconSenha} size={29}></Icon>
        <Text></Text>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => {
            navigation.navigate('Cadastro');
          }}>
          <Text style={styles.createAccountText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
