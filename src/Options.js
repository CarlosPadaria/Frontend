import React, {useContext} from 'react';
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

const Options = () => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.nameStyle}>Olá {user.NOME}</Text>
      </View>
      <View style={styles.containerFatherInput}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nome"
            editable={false}
            selectTextOnFocus={false}
            value={user.NOME}
            style={styles.InputNome}></TextInput>
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Alterar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            editable={false}
            selectTextOnFocus={false}
            value={user.SENHA}
            style={styles.InputNome}></TextInput>
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Alterar</Text>
          </TouchableOpacity>
        </View>
       <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            editable={false}
            selectTextOnFocus={false}
            value={user.EMAIL}
            style={styles.InputNome}></TextInput>
        </View>
        <TouchableOpacity onPress={
          () => {
            setLogged(false);
          }
        } style={styles.btnSair}>
          <Text style={styles.sairText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Options;

const styles = StyleSheet.create({
  btnSair:{
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sairText:{
    color: 'red',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
  nameStyle: {
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
  InputNome: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 45,
   // marginBottom: 15,
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  btnSubmit: {
    padding: 10,
    marginTop: 25,
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
