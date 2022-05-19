import React, {useContext, useEffect, useState} from 'react';
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
import Api from './Api';

const Login = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [response, setResponse] = useState({});
  const [inputEmail, setInputEmail] = useState(styles.inputEmail);
  const [inputSenha, setInputSenha] = useState(styles.inputSenha);
  const [carregando, setCarregando] = useState(false);
  const [mensagemEmail, setMensagemEmail] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [loginAceito, setLoginAceito] = useState(false);
  // ADICIONAR USE EFFECT PARA VERIFICAR SE OS CAMPOS ESTÃO VÁZIOS!
  useEffect(() => {
    setEmail(email.replace(/ /g, ''));
    setInputEmail({...styles.inputEmail, borderColor: '#000000'});
    setMensagemEmail('');
  }, [email]);

  useEffect(() => {
    setInputSenha({...styles.inputSenha, borderColor: '#000000'});
    setMensagemSenha('');
  }, [senha]);
  //console.log(carregando);
  // console.log(response);
  //remove unhandled promise rejection message
  // LogBox.ignoreAllLogs(disable);
  // console.log(response.status);


  const btnSubmit = () => {
    let deveCarregar = true;

    if (email === '') {
      setInputEmail({...styles.inputEmail, borderColor: 'red'});
      setMensagemEmail('Email não pode ser vazio');
      deveCarregar = false;
    }
    if (senha === '') {
      setInputSenha({...styles.inputSenha, borderColor: 'red'});
      setMensagemSenha('Senha não pode ser vazia');
      deveCarregar = false;
    }
    if (deveCarregar === true) {
      const Logar = async () => {
        setResponse(
          await Api.post('/login', {EMAIL: email, SENHA: senha})
            .then(() => {
              console.log('Login realizado com sucesso!');
              setUser(response.data);
              setLogged(true);
            })
            .catch(() => {
              console.log('Dados incompatíveis');
            }),
        );
      };

      setCarregando(true);
      Logar();
      setCarregando('carregado');
      //setLogged(true);
    }
  };
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
          style={inputEmail}
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoComplete={'email'}
          maxLength={100}
        />
        <Icon name="mail" style={styles.IconEmail} size={25}></Icon>
        <Text style={styles.mensagemEmail}>{mensagemEmail}</Text>
        <TextInput
          placeholder="Senha"
          style={inputSenha}
          value={senha}
          onChangeText={setSenha}
          autoComplete={'password'}
          secureTextEntry={true}
          maxLength={32}
        />
        <Icon name="lock" style={styles.IconSenha} size={29}></Icon>
        <Text style={styles.mensagemEmail}>{mensagemSenha}</Text>
        <TouchableOpacity style={styles.btnSubmit} onPress={btnSubmit}>
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
