import React, {useEffect, useState, useContext} from 'react';
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
import Api from './Api';
const PaginaReceita = () => {
  const {logged, setLogged, user, setUser, loading, setLoading, setPage, page} =
    useContext(AuthContext);
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([{NOME: ''}]);
  const [passos, setPassos] = useState([{DESCRICAO: ''}]);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    CarregarReceita();
    CarregarIngredientes();
    CarregarPassos();
    setLoadingData(true);
    console.log(page);
  }, []);

  useEffect(() => {
    if (loadingData === true) {
      console.log(ingredientes[0].NOME);
    }
  }, [loadingData]);

  const CarregarReceita = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/receitas/${page}`);

        setReceita(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };
  const CarregarIngredientes = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/ingredientesreceita/${page}`);

        setIngredientes(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };
  const CarregarPassos = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/passosreceita/${page}`);

        setPassos(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  return (
    <View>
      <TouchableOpacity onPress={CarregarIngredientes}>
        <Text>Carregar</Text>
      </TouchableOpacity>
      <Image
        source={{uri: receita.IMAGEM}}
        style={{
          width: 350,
          height: 250,
        }}></Image>
        <Text>Ingredientes</Text>
      {loadingData === true ? (
        ingredientes.map((item, index) => (
           
          <View key={index}>
            <Text>{item.NOME}</Text>
          </View>
        )   )
      ) : (
        <Text>Carregando</Text>
      )}
        <Text>Passos</Text>
        {loadingData === true ? (
            passos.map((item, index) => (
                <View key={index}>
                    <Text>{item.DESCRICAO}</Text>
                </View>
            )
        )
        ) : (
            <Text>Carregando</Text>
        )}
    </View>
  );
};
export default PaginaReceita;
