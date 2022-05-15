import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
// refactor all the code using clean code

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confimarSenha, setConfirmarSenha] = useState('');
  const [mensagemNome, setMensagemNome] = useState('');
  const [mensagemEmail, setMensagemEmail] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [mensagemConfirmarSenha, setMensagemConfirmarSenha] = useState('');
  const patternNome =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u;
  const patternEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternNome2 = /^[^ ][\w\W ]*[^ ]/;

  // when screen loads it will not run the useEffect

  useEffect(() => {
    //setNome(nome.replace(/\s+$/, ''));
    // || !(nome.replace(/\s+/g, ' ').trim() == nome "USAR DEPOIS NO BACKEND"
    //console.log(nome)
    //console.log(patternNome2.test(nome))
    if (nome === '') {
      setMensagemNome('');
    } else if (nome.length < 3 || !patternNome.test(nome)) {
      styles.inputNome = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ff0000',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemNome('Deve possuir pelo menos 3 caractéres');
      console.log('nome invalido');
    } else {
      styles.inputNome = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#00ff00',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemNome('');
    }
  }, [nome]);

  useEffect(() => {
    //console.log('debugando o email');
    setEmail(email.replace(/ /g, ''));
    if (email === '') {
      setMensagemEmail('');
    } else if (!patternEmail.test(email)) {
      styles.inputEmail = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ff0000',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemEmail('Você precisa usar um e-mail válido');
    } else {
      styles.inputEmail = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#00ff00',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemEmail('');
    }
  }, [email]);

  useEffect(() => {
    if (senha === '') {
      setMensagemSenha('');
    } else if (senha.length < 6) {
      styles.inputSenha = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ff0000',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemSenha('A Senha deve conter pelo menos 6 caractéres');
    } else {
      styles.inputSenha = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#00ff00',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemSenha('');
    }
  }, [senha]);

  useEffect(() => {
    if (confimarSenha === '') {
      setMensagemConfirmarSenha('');
    } else if (senha != confimarSenha) {
      styles.inputConfirmarSenha = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ff0000',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemConfirmarSenha('A senhas precisam ser identicas');
    } else {
      styles.inputConfirmarSenha = {
        backgroundColor: '#ffffff',
        width: '90%',
        marginBottom: 15,
        color: '#000000',
        fontSize: 17,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#00ff00',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 40,
      };
      setMensagemConfirmarSenha('');
    }
  }, [confimarSenha]);

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo.png')}
          style={{
            width: 260,
            height: 110,
          }}></Image>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Nome"
          style={styles.inputNome}
          autoCorrect={false}
          autoComplete={'name'}
          maxLength={145}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.mensagemNome}>{mensagemNome}</Text>

        <TextInput
          placeholder="Email"
          style={styles.inputEmail}
          autoCorrect={false}
          autoComplete={'email'}
          //autoFocus={true}
          value={email}
          onChangeText={setEmail}
          maxLength={145}
        />

        <Text style={styles.mensagemEmail}>{mensagemEmail}</Text>

        <Icon name="user" style={styles.IconUser} size={25}></Icon>
        <TextInput
          placeholder="Senha"
          style={styles.inputSenha}
          autoComplete={'password'}
          secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
          maxLength={32}
        />
        <Text style={styles.mensagemSenha}>{mensagemSenha}</Text>

        <Icon name="mail" style={styles.IconEmail} size={25}></Icon>
        <Icon name="lock" style={styles.IconSenha} size={29}></Icon>

        <TextInput
          placeholder="Confirmar Senha"
          style={styles.inputConfirmarSenha}
          autoComplete={'password'}
          value={confimarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
          // autoFocus={true}
          maxLength={32}
        />

        <Text style={styles.mensagemConfirmarSenha}>
          {mensagemConfirmarSenha}
        </Text>

        <Icon name="lock" style={styles.IconConfirmarSenha} size={29}></Icon>
        <Text></Text>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Cadastrar-Se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mensagemSenha: {
    right: 12,
    color: '#ff0000',
  },
  mensagemConfirmarSenha: {
    right: 55,
    color: '#ff0000',
  },
  mensagemNome: {
    right: 39,
    color: '#ff0000',
  },
  mensagemEmail: {
    right: 46,
    color: '#ff0000',
  },
  btnRegister: {
    marginTop: 10,
  },
  createAccountText: {
    color: '#000000',
  },
  inputEmail: {
    backgroundColor: '#ffffff',
    width: '90%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  inputSenha: {
    backgroundColor: '#ffffff',
    width: '90%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  inputConfirmarSenha: {
    backgroundColor: '#ffffff',
    width: '90%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  IconUser: {
    position: 'absolute',
    top: 8,
    left: 25,
  },
  IconSenha: {
    position: 'absolute',
    top: 174,
    left: 25,
  },
  IconEmail: {
    position: 'absolute',
    top: 95,
    left: 25,
  },
  IconConfirmarSenha: {
    position: 'absolute',
    top: 257,
    left: 25,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    width: '90%',
    paddingBottom: 250,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    width: '90%',
    marginBottom: 15,
    color: '#EBEBEB',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  inputNome: {
    backgroundColor: '#ffffff',
    width: '90%',
    marginBottom: 15,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },
  btnSubmit: {
    backgroundColor: '#48BF84',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    // paddingTop: 50,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
});

export default Cadastro;

/*
<TextInput
          placeholder="Confirmar Senha"
          style={styles.inputConfirmarSenha}
          autoCorrect={false}
          autoComplete={'password'}
          value={confimarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
          autoFocus={true}
          maxLength={32}
        />

*/
