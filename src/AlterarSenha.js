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

const AlterarSenha = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const patternNome =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u;

  let tempNome = user.NOME;
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [mensagemConfirmarSenha, setMensagemConfirmarSenha] = useState('');
  const [styleInput, setStyleInput] = useState(styles.input);
  const [response, setResponse] = useState({});
  //const [verificar, setVerificar] = useState(false);
  const [styleInputSenha, setStyleInputSenha] = useState(styles.inputSenha);
  const [styleInputConfirmarSenha, setStyleInputConfirmarSenha] = useState(
    styles.inputConfirmarSenha,
  );
  const btnCancel = () => {
    navigation.navigate('Options');
  };
 
  const handleValidarConfirmarSenha = () => {
    let Valido = true;
    if (confirmarSenha === '') {
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#000000',
      });
      setMensagemConfirmarSenha('');
    } else if (senha != confirmarSenha) {
      setStyleInputConfirmarSenha({
        ...styleInputSenha,
        borderColor: '#ff0000',
      });
      Valido = false;
      setMensagemConfirmarSenha('A senhas precisam ser identicas');
    } else {
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#00ff00',
      });
      setMensagemConfirmarSenha('');
    }
    return Valido;
  };

  const handleValidarSenha = () => {
    let Valido = true;
    if (senha === '') {
      setMensagemSenha('');
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#000000',
      });
    } else if (senha.length < 6) {
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#ff0000',
      });
      setMensagemSenha('Pelo menos 6 caractéres');
      Valido = false;
    } else {
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#00ff00',
      });
      setMensagemSenha('');
    }
    return Valido;
  };
  useEffect(() => {
    handleValidarSenha();
  }, [senha, confirmarSenha]);

  useEffect(() => {
    handleValidarConfirmarSenha();
  }, [confirmarSenha, senha]);

  const handleSubmit = () => {
    let Validar = true;

    if (senha == '') {
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#ff0000',
      });
      setMensagemSenha('Pelo menos 6 caractéres');
      Validar = false;
    }
    if (confirmarSenha == '') {
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#ff0000',
      });
      setMensagemConfirmarSenha('Não pode ser vazio');
      Validar = false;
    }
    if (handleValidarConfirmarSenha() == false) {
      Validar = false;
    }
    if (handleValidarSenha() == false) {
      Validar = false;
    }

    if (Validar === true) {
      const AlterarSenha = async () => {
        try {
          const realizarAlteracao = await Api.patch(
            '/senha/' + user.ID_USUARIO,
            {
              SENHA: senha,
            },
          );
          setResponse(realizarAlteracao);
          setUser({
            ...user,
            SENHA: senha,
          });
          setVerificar(false);
          navigation.navigate('Options');
        } catch {
          setStyleInputSenha({
            ...styles.inputSenha,
            borderColor: '#ff0000',
          });
          setMensagemEmail('Falha ao alterar senha');
          console.log('faiou');
        }
      };

      AlterarSenha();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Text style={styles.textoDoInput}>Nova Senha</Text>
      <TextInput
        style={styleInputSenha}
        value={senha}
        onChangeText={setSenha}
        autoCorrect={false}
        secureTextEntry={true}
        autoComplete={'password'}
        maxLength={32}></TextInput>
      <Text style={styles.passMsg}>{mensagemSenha}</Text>
      <Text style={styles.textoDoInput}>Confirmar Senha</Text>
      <TextInput
        style={styleInputConfirmarSenha}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        autoCorrect={false}
        secureTextEntry={true}
        autoComplete={'name'}
        maxLength={32}></TextInput>
      <Text style={styles.passMsg}>{mensagemConfirmarSenha}</Text>
      <View style={styles.containerFatherInput}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
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
    // marginBottom: 10,
  },
  containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },
  inputSenha: {
    backgroundColor: '#ffffff',
    width: '70%',
    color: '#000000',
    fontSize: 17,
    // padding: 10,
    borderWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
  },
  inputConfirmarSenha: {
    backgroundColor: '#ffffff',
    width: '70%',
    color: '#000000',
    fontSize: 17,
    // padding: 10,
    borderWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
  },
  passMsg: {
    color: '#ff0000',
  },
  textoDoInput: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 45,
    // marginBottom: 15,
    color: '#525252',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 0,
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
export default AlterarSenha;
