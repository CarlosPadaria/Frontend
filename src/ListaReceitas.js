import CheckBox from '@react-native-community/checkbox';
import React, {useState, useContext, useEffect, useRef} from 'react';
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
  Modal,
  Pressable,
} from 'react-native';
import Api from './Api';
import {AuthContext} from './contexts/Auth';
import Icon from 'react-native-vector-icons/AntDesign';
const ListaReceitas = ({navigation}) => {
  const {logged, setLogged, user, setUser, loading, setLoading, setPage, page} = useContext(AuthContext);
  // INVERTER O ARRAY DE RECEITAS PARA QUE APAREÇA O ULTIMO CADASTRADO
  const [receitas, setReceitas] = useState([]);
  const [navegarPaginaReceita, setNavegarPaginaReceita] = useState(false)
  const [modalActive, setModalActive] = useState(false);
  const [modalApagar, setModalApagar] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [filteredData, setFilteredData] = useState([{}])
  const [search, setSearch] = useState('');
  useEffect(() => {
    CarregarReceitas();
  }, [,loading]);

  useEffect(() => {
    console.log(receitas);
  }, [receitas]);

  /*const AbrirModal = () => {
    modalizeRef.current?.open();
  }*/
  const CarregarReceitas = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get('/receitas');

        setReceitas(carregar.data.reverse());
        setFilteredData(carregar.data.reverse())
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  const ApagarReceita = () =>{
    const funcApagar = async () => {
      try {
        const apagar = await Api.delete(`/receitas/${page}`);
        
      } catch {
        console.log('falha ao apagar');
      }
    };
    funcApagar();
  }
  
  const SearchFilter = (text) =>{
    if(text){
      const newData = receitas.filter((item) =>{
        const itemData = item.TITULO ? item.TITULO.toUpperCase() : ''.toUpperCase() 
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    setFilteredData(newData);
    setSearch(text);
    }
    else{
      setFilteredData(receitas)
      setSearch(text);
    }

  }

  return (
    <View style={{backgroundColor: '#48BF84', flex: 1, marginBottom: 10}}>

      <View style={{alignItems: 'center', marginTop: 15, marginBottom: 0}}>
        
        <TextInput style={styles.input}
          value={search}
          onChangeText={(text) => SearchFilter(text)}
          placeholder='Pesquisar receita, ex: "pizza"'
        >

        </TextInput>
      </View>
      <Icon size={25} style={styles.Icon} name='search1'></Icon>
      <Modal
        visible={modalActive}
        onRequestClose={() => {
          setModalActive(false)
        }}
        transparent={true}
      >
        <View style={styles.outerview}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}></Text>
            <Pressable onPress={()=>{
              setModalActive(false)
              navigation.navigate('EditarReceita');
            }}>
              <Text>Editar</Text>
            </Pressable>
            <Pressable onPress={()=>{
              setModalActive(false)
              setModalApagar(true)
            }}>
              <Text>Excluir</Text>
            </Pressable>
            <Pressable onPress={()=>{
              setModalActive(false)
            }}>
              <Text>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalApagar}
        onRequestClose={() => {
          setModalApagar(false)
        }}
        transparent={true}
      >
        <View style={styles.outerview}>
          <View style={styles.modalView}>
            
          
            <CheckBox
              onValueChange={newValue => setCheckBox(newValue)}
              value={checkBox}
            ></CheckBox>
            <Text style={{marginBottom: 10}}>Deseja excluir a receita?</Text>
            <Pressable onPress={()=>{
              console.log("apagar");
              if(checkBox === true){
                ApagarReceita();
                setModalApagar(false);
                setLoading(!loading);
              }
            }}>
              <Text>Excluir</Text>
            </Pressable>
            <Pressable onPress={()=>{
              setModalApagar(false)
            }}>
              <Text>Cancelar</Text>
            </Pressable>
           
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        //keyExtractor={(item, index) => index.toString()}
        style={{marginTop: 15, backgroundColor: '#ebebeb',}}
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
              <TouchableOpacity onPress={()=>{
                setPage(item.ID_RECEITA);
                setNavegarPaginaReceita(true)
                navigation.navigate('PaginaReceita')
              //setModalActive(true);
                // open a little window to show the ingredients and steps
              }}/*onPress={()=>{
                
                }}*/>
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
              {item.ID_USUARIO === user.ID_USUARIO ? (
                <TouchableOpacity onPress={() =>{
                  setModalActive(true);
                  setPage(item.ID_RECEITA);
                }} >
                  <Text>Editar</Text>
                </TouchableOpacity>
              ) : null}
            </SafeAreaView>
          </View>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  Icon:{
    position: 'absolute',
    top: 27,
    left: 290,
  },
  input:{
    paddingRight:44,
    backgroundColor: '#ffffff',
    width: '70%',
    //marginBottom: 15,
   // marginTop: 35,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 2,
   // borderLeftWidth: 2,
    borderRadius: 30,
    borderColor: '#D6D6D6',
  //borderBottomColor: '#ebebeb',
    fontFamily: 'Outfit-Regular',
  },
  modalText:{
    marginBottom: 15,
    textAlign: 'center'
  },
  outerview:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center'
  },
  modalView:{
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
    width: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
