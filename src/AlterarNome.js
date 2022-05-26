import React, {useContext, useState, useEffect, useCallback} from 'react';
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
import Api from './Api';

import {AuthContext} from './contexts/Auth';

const AlterarNome = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const patternNome =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u;

  let tempNome = user.NOME;
  const [nome, setNome] = useState(tempNome);
  const [mensagemNome, setMensagemNome] = useState('');
  const [styleInput, setStyleInput] = useState(styles.input);
  const [response, setResponse] = useState({});
  const [verificar, setVerificar] = useState(false);
  const btnCancel = () => {
    setNome(user.NOME);
  };
  const removerEspacos = str => {
    str = str.replace(/^\s+/g, '');
    str = str.replace(/\s+$/g, '');
    str = str.replace(/\s+/g, ' ');
    return str;
  };
  const handleSubmit = () => {
    if (handleValidarNome() === true) {
      const AtualizarNome = async () => {
        try {
          const realizarAlteracao = await Api.patch(
            '/nome/' + user.ID_USUARIO,
            {
              NOME: removerEspacos(nome),
            },
          );

          setResponse(realizarAlteracao);
          setVerificar(true);
        } catch {
          console.log('Erro ao atualizar nome');
        }
      };
      AtualizarNome();
      
    }
  };

  const handleValidarNome = () => {
    if (nome.length < 3 || !patternNome.test(nome)) {
      setStyleInput({
        ...styleInput,
        borderColor: '#ff0000',
      });
      setMensagemNome(
        'Precisa ter no mínimo 3 caractéres e só pode conter letras',
      );
      return false;
    } else {
      setStyleInput({
        ...styleInput,
        borderColor: '#D6D6D6',
      });
      setMensagemNome('');
      return true;
    }
  };
  useEffect(() => {
    handleValidarNome();
  }, [nome]);

  useEffect(() => {
    if (verificar === true) {
      setUser({...user, NOME: removerEspacos(nome)});
      navigation.navigate('Options');
    }
  }, [verificar]);
  return (
    <KeyboardAvoidingView style={styles.background}>
      <TextInput
        style={styleInput}
        value={nome}
        onChangeText={setNome}
        autoCorrect={false}
        autoComplete={'name'}
        maxLength={50}></TextInput>
      <Text style={styles.mensagemNome}>{mensagemNome}</Text>
      <View style={styles.containerFatherInput}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
            <Text style={styles.submitText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={btnCancel} style={styles.btnCancel}>
            <Text style={styles.submitText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mensagemNome: {
    color: '#ff0000',
    marginBottom: 10,
  },
  containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    backgroundColor: '#ffffff',
    width: '70%',
    //marginBottom: 15,
    marginTop: 35,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
   // borderLeftWidth: 2,
    marginBottom: 15,
   // borderRadius: 30,
    borderColor: '#D6D6D6',
  //borderBottomColor: '#ebebeb',
    fontFamily: 'Outfit-Regular',
  },
  btnSubmit: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    backgroundColor: '#48BF84',
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    // paddingTop: 50,
  },
  btnCancel: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    backgroundColor: '#cc0000',
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    // paddingTop: 50,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '90%',
    // paddingBottom: 50,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
});
export default AlterarNome;
