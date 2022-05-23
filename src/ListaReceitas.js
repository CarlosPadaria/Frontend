import React from "react"
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
    BackHandler
  } from 'react-native';

  const ListaReceitas = () => {
      return (
          <View>
              <Image 
                style={{width: '100%', height: '50%'}}
                source={{uri:'https://hilahcooking.com/wp-content/uploads/2016/03/pao-de-queijo-recipe-2-225x225.jpg'}}
              ></Image>
              <Text>
                  Nada por enquanto
              </Text>
          </View>
      )
  }

  export default ListaReceitas;