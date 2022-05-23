import React, {useState, useContext, useEffect} from 'react';
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
  FlatList,
} from 'react-native';
import Api from './Api';
import {AuthContext} from './contexts/Auth';

const ListaReceitas = ({navigation}) => {
  const {logged, setLogged, user, setUser, loading, setLoading} = useContext(AuthContext);
  // INVERTER O ARRAY DE RECEITAS PARA QUE APAREÇA O ULTIMO CADASTRADO
  const [receitas, setReceitas] = useState([]);
  useEffect(() => {
    CarregarReceitas();
  }, [,loading]);

  useEffect(() => {
    console.log(receitas);
  }, [receitas]);

  const CarregarReceitas = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get('/receitas');

        setReceitas(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  return (
    <View style={{backgroundColor: '#EBEBEB', flex: 1, marginBottom: 10}}>
      <FlatList
        data={receitas.reverse()}
        //keyExtractor={(item, index) => index.toString()}
        style={{marginTop: 35}}
        contentContainerStyle={{
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item}) => (
          // do the css to get the full image
          <View style={styles.listItem}>
            <SafeAreaView key={item.ID_RECEITA}>
              <Image
                source={{uri: item.IMAGEM}}
                style={{
                  width: 350,
                  height: 250,
                }}></Image>
              <TouchableOpacity onPress={()=>{navigation.navigate('PaginaReceita')}}>
                <Text
                  style={{
                    marginTop: 18,
                    fontSize: 20,
                    textAlign: 'center',
                    fontFamily: 'Outfit-Regular',
                  }}>
                  {item.TITULO}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 30,
  },
  listItem: {
    padding: 30,
    marginTop: 10,
    // paddingLeft: 10,
    // marginRight: 10,
    shadowOpacity: 10,
    shadowRadius: 0,
    backgroundColor: '#ffffff',
  },
});

export default ListaReceitas;
