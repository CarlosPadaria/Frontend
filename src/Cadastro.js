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
// rename the variable names to better names
/*
setStyleInputNome({
          ...styleInputNome,
          borderColor: '#00ff00',
          borderWidth: 1,
        });
*/
const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confimarSenha, setConfirmarSenha] = useState('');
  const [mensagemNome, setMensagemNome] = useState('');
  const [mensagemEmail, setMensagemEmail] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [mensagemConfirmarSenha, setMensagemConfirmarSenha] = useState('');
  const [styleInputNome, setStyleInputNome] = useState(styles.inputNome);
  const [styleInputEmail, setStyleInputEmail] = useState(styles.inputEmail);
  const [styleInputSenha, setStyleInputSenha] = useState(styles.inputSenha);
  const [styleInputConfirmarSenha, setStyleInputConfirmarSenha] = useState(
    styles.inputConfirmarSenha,
  );
  
  const patternNome =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u;
  const patternEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternNome2 = /^[^ ][\w\W ]*[^ ]/;

  //change MensagemNome to 'Você precisa preencher este campo' if nome is empty

  const handleValidarNome = () =>{
    let Valido = true;
    if (nome === '') {
      setMensagemNome('');
      setStyleInputNome({
        ...styleInputNome,
        borderColor: '#000000',
      });
    } else if (nome.length < 3 || !patternNome.test(nome)) {
      setStyleInputNome({
        ...styleInputNome,
        borderColor: '#ff0000',
      });
      setMensagemNome('Pelo menos 3 caractéres, sem caractéres especiais');
      Valido = false;
    } else {
      setStyleInputNome({
        ...styleInputNome,
        borderColor: '#00ff00',
      });
      setMensagemNome('');
    }
  }

  const handleValidarEmail = () =>{
    setEmail(email.replace(/ /g, ''));
    let Valido = true;
    if (email === '') {
      setMensagemEmail('');
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#000000',
      });
    } else if (!patternEmail.test(email)) {
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ff0000',
      });
      setMensagemEmail('Você precisa usar um e-mail válido');
      Valido = false;
    } else {
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#00ff00',
      });
      setMensagemEmail('');
    }
    return Valido;
  }
  const handleValidarSenha = () =>{
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
  }

  const handleValidarConfirmarSenha = () =>{
    let Valido = true;
    if (confimarSenha === '') {
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#000000',
      });
      setMensagemConfirmarSenha('');
    } else if (senha != confimarSenha) {
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
  }
  useEffect(() => {
    handleValidarNome();
  }, [nome]);

  useEffect(() => {
    handleValidarEmail();
  }, [email]);

  useEffect(() => {
    handleValidarSenha();
  }, [senha]);

  useEffect(() => {
    handleValidarConfirmarSenha();
  }, [confimarSenha]);

  const handleSubmit = () => {

    let Valido = true;

    if (nome === ''){
      setStyleInputNome({
        ...styleInputNome,
        borderColor: '#ff0000',
      });
      setMensagemNome('Você precisa preencher este campo');
      Valido = false;
    }

    if (email === ''){
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ff0000'
      })
      setMensagemEmail('Você precisa preencher este campo')
      Valido = false;
    }

    if(senha === ''){
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#ff0000'
      })
      setMensagemSenha('Você precisa preencher este campo')
      Valido = false;
    }

    if(confimarSenha === ''){
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#ff0000'
      })
      Valido = false;
      setMensagemConfirmarSenha('Você precisa preencher este campo')
    }

    if(!handleValidarNome || !handleValidarEmail || !handleValidarSenha || !handleValidarConfirmarSenha){
      Valido = false;
    }

    
    

  }
  return (
    <KeyboardAvoidingView style={styles.background}>
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
          style={styleInputNome}
          autoCorrect={false}
          autoComplete={'name'}
          maxLength={145}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.mensagemNome}>{mensagemNome}</Text>

        <TextInput
          placeholder="Email"
          style={styleInputEmail}
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
          style={styleInputSenha}
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
          style={styleInputConfirmarSenha}
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
        <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Cadastrar-Se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    paddingBottom: 280,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mensagemSenha: {
   // right: 12,
   //flex:1,
   justifyContent: 'flex-start',
    color: '#ff0000',
  },
  mensagemConfirmarSenha: {
    justifyContent: 'flex-start',
    color: '#ff0000',
  },
  mensagemNome: {
    justifyContent: 'flex-start',
    color: '#ff0000',
  },
  mensagemEmail: {
    justifyContent: 'flex-start',
    color: '#ff0000',
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
  // fix the position of the icons when keyboard is up
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
