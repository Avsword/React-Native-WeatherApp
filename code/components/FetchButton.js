import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
const Fetch = (props) => {
  const [q, setQ] = useState(props.q || 'Helsinki');

  const [pressed, setPressed] = useState(true);

  const [input, setInput] = useState(props.input || '');

  useEffect(() => {
    setInput(props.input);
  }, [props.input]);

  useEffect(() => {
    console.log('yea');

    doStuff();
  }, [pressed]);

  const doStuff = async () => {
    if (input !== '') {
      console.log(input);

      await axios
        .get('https://api.weatherapi.com/v1/current.json', {
          params: { key: input, q: q },
        })
        .then(async (response) => {
          console.log(response);
          console.log('updated');
          const setResponse = props.setResponse;
          const setKey = props.setKey;
          await setKey(input);

          await setResponse(response.data);
        })
        .catch((error) => {
          setInput('');
          alert(
            'The API Key was bad. Please re-enter. If this error continues to come up, please contact me at: aaro.varjonen@tuni.fi',
          );
        });
    }
  };

  return (
    <View>
      <Button
        onPress={() => {
          setPressed(!pressed);
        }}
        title='Fetch'
      />
    </View>
  );
};

export default Fetch;
