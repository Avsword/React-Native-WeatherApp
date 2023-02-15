import { StyleSheet, Text,  Button, TextInput, View, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FetchButton from './FetchButton';

const InputKeyComponent = (props)=>{
  const [userInput, setuserInput]=useState('');

  return(<View >
      <Text>To see the current weather, check if you have an API key!</Text>
      <Text >{userInput}</Text>
      <TextInput
        onChangeText={setuserInput}
        value={userInput}
        placeholder='Your API key here!'
      />
      <FetchButton input={userInput} setKey={props.setKey} setResponse={props.setResponse}/>
    </View>)
}
export default InputKeyComponent;