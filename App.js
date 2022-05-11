import React from 'react';
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
const App = () => {
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./images/teste2.png')}
          style={{
            width: 260,
            height: 100,  
          }}></Image>
      </View>

      <View style={styles.container}>
        <TextInput 
        placeholder="Email" 
        style={styles.input}
        autoCorrect={false} 
        autoComplete={'email'}
        />
        <Icon name='mail' style={styles.IconEmail} size={25}></Icon>
        <TextInput 
        placeholder="Senha" 
        style={styles.input} 
        autoComplete={'password'}
        secureTextEntry={true}
        />
        <Icon name='lock' style={styles.IconSenha} size={29}></Icon>
        <Text></Text>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  IconEmail:{
    position: 'absolute',
    top: 13,
    left: 25,
  },
  IconSenha:{
    position: 'absolute',
    top: 73,
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
    paddingBottom: 50,
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
    color: '#343434',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#000000',
    fontFamily: 'Outfit-Regular',
    paddingLeft:40
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
    fontFamily: 'Outfit-SemiBold'
  },
});

export default App;
