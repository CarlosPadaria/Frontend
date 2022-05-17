import React, {useState, useEffect, useContext} from 'react';
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
import Home  from './Home';
import Api from './Api';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from './contexts/Auth';
import {styles} from './styles/styleCadastro';

const Cadastro = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const [carregando, setCarregando] = useState(false);
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

  const removerEspacos = str => {
    str = str.replace(/^\s+/g, '');
    str = str.replace(/\s+$/g, '');
    str = str.replace(/\s+/g, ' ');
    return str;
  };
  const handleValidarNome = () => {
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
    return Valido;
  };

  const handleValidarEmail = () => {
    setEmail(email.replace(/ /g, ''));

    //const validarEmailJaCadastrado = await Api.get('/usuarios', {EMAIL:email})
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

  const handleValidarConfirmarSenha = () => {
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
  };
  const VerificarEmailJaCadastrado = async () => {
    let vel = true;

    setResponse(await Api.post('/buscarEmail', {EMAIL: email}));

    if (response.data != null) {
      setMensagemEmail('E-mail já cadastrado');
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ff0000',
      });
      vel = false;
    }
    return vel;
  };

  useEffect(() => {
    handleValidarNome();
  }, [nome]);

  useEffect(() => {
    if(carregando === `carregado`){
      navigation.navigate('Home');
    }
  }, [
    carregando
  ]);

 

  useEffect(() => {
    handleValidarEmail();
  }, [email]);

  useEffect(() => {
    handleValidarSenha();
  }, [senha]);

  useEffect(() => {
    handleValidarConfirmarSenha();
  }, [confimarSenha]);

  const handleSubmit = ({navigation}) => {
    let Valido = true;

    if (nome === '') {
      setStyleInputNome({
        ...styleInputNome,
        borderColor: '#ff0000',
      });
      setMensagemNome('Você precisa preencher este campo');
      Valido = false;
    }

    if (email === '') {
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ff0000',
      });
      setMensagemEmail('Você precisa preencher este campo');
      Valido = false;
    }

    if (senha === '') {
      setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#ff0000',
      });
      setMensagemSenha('Você precisa preencher este campo');
      Valido = false;
    }

    if (confimarSenha === '') {
      setStyleInputConfirmarSenha({
        ...styleInputConfirmarSenha,
        borderColor: '#ff0000',
      });
      Valido = false;
      setMensagemConfirmarSenha('Você precisa preencher este campo');
    }


    if (
      !handleValidarNome ||
      !handleValidarEmail ||
      !handleValidarSenha ||
      !handleValidarConfirmarSenha ||
      !VerificarEmailJaCadastrado()
    ) {
      Valido = false;
    }

    //setResponse(await Api.get('/usuarios', EMAIL));

    //VerificarEmailJaCadastrado();

    if (Valido === true) {
      console.log('Valido');
      setUser({
        NOME: removerEspacos(nome),
        EMAIL: email,
        SENHA: senha,
        TIPO: 'USUARIO',
      });
      data = {NOME: removerEspacos(nome), EMAIL: email, SENHA: senha};
      const RealizarCadastro = async () => {
        setResponse(await Api.post('/usuarios', data));
      };
      setCarregando(true);
      RealizarCadastro();
      setCarregando(`carregado`);
      setLogged(true);
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
          placeholder="Nome"
          style={styleInputNome}
          autoCorrect={false}
          autoComplete={'name'}
          maxLength={100}
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
          maxLength={100}
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

export default Cadastro;