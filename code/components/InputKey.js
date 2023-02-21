import { StyleSheet, Text, Button, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import FetchButton from './FetchButton';
import { API_TOKEN } from '@env';

// Basically we don't need this now that we have dotenv configured and working, but.
// I'm keeping it here for reference and to show that I know how to get
// user input in case the dotenv doesn't work.
const InputKeyComponent = (props) => {
  const [userInput, setuserInput] = useState(API_TOKEN || '');

  return (
    <View>
      <Text>To see the current weather, check if you have an API key!</Text>
      <Text>{userInput}</Text>
      <TextInput
        onChangeText={setuserInput}
        //value={userInput}
        placeholder='Your API key here!'
      />
      <FetchButton
        input={userInput}
        setKey={props.setKey}
        setResponse={props.setResponse}
      />
    </View>
  );
};
export default InputKeyComponent;
