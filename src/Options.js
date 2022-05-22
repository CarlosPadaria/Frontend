import React, {useContext, useState} from 'react';
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
  Alert,
} from 'react-native';
import {AuthContext} from './contexts/Auth';
import Icon from 'react-native-vector-icons/AntDesign';
//import AlterarNome from './AlterarNome';
//import Dialog from 'react-native-dialog'
const Options = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const [show, setShow] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.nameStyle}>Olá {user.NOME}</Text>
      </View>
      <View style={styles.containerFatherInput}>
        <Text style={styles.textoDoInput}>Nome de Usuário</Text>
        
        <View style={styles.inputContainer}>
          
          <TextInput
            placeholder="Nome"
            editable={false}
            selectTextOnFocus={false}
            value={user.NOME}
            style={styles.Input}></TextInput>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              navigation.navigate('AlterarNome');
            }}>
            <Text style={styles.submitText}>Alterar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textoDoInput}>Senha</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            editable={false}
            selectTextOnFocus={false}
            value={user.SENHA}
            secureTextEntry={!show}
            style={styles.Input}></TextInput>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              navigation.navigate('AlterarSenha');
            }}>
            <Text style={styles.submitText}>Alterar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textoDoInput}>Email</Text>
        <Icon name={show === false ? 'eye' : 'eyeo'} style={styles.IconOlhoSenha} onPress={() => {
          setShow(!show);
        }} size={25}></Icon>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            editable={false}
            selectTextOnFocus={false}
            value={user.EMAIL}
            style={styles.Input}></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => {
            setUser({});
            setLogged(false);
          }}
          style={styles.btnSair}>
          <Text style={styles.sairText}>Sair</Text>
        
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSair} onPress={() =>{
            navigation.navigate('DesativarConta');
          }}>
          <Text style={styles.sairText}>Desativar Conta</Text>
        
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  );
};

export default Options;

const styles = StyleSheet.create({
  IconOlhoSenha:{
    left: 200,
    top: 210,
    position: 'absolute'
  },
  btnSair: {
    marginTop: 80,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sairText: {
    color: 'red',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
  nameStyle: {
    paddingTop: 40,
    paddingBottom: 30,
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#48BF84',
  },
  containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    alignItems: 'center',
    width: '90%',
    paddingBottom: 0,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '90%',
    // paddingBottom: 50,
  },
  Input: {
    //marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 40,
    // marginBottom: 15,
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  /* Input: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 40,
   // marginBottom: 15,
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },*/
  textoDoInput: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 45,
    // marginBottom: 15,
    color: '#525252',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  btnSubmit: {
    padding: 10,
    //  marginTop: 25,
    marginBottom: 15,
    backgroundColor: '#48BF84',
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    // paddingTop: 50,
  },
});
