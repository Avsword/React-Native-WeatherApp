import { Text, View, StyleSheet, Image, Button, TextInput } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const LocationComponent = (props) => {
  const [q, setQ] = useState(props.location || '');
  const [pressed, setPressed] = useState(true);
  const [key, setKey] = useState(props.apikey || '');
  const styles = props.style;

  useEffect(() => {
    setQ(props.location);
  }, [props.location]);

  useEffect(() => {
    setKey(props.apikey);
  }, [props.apikey]);

  useEffect(() => {
    /* //Get the location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setQ(
          position.coords.latitude.toString() +
            ',' +
            position.coords.longitude.toString(),
        );
      },
      (error) => {
        console.warn(`ERROR GETTING THE LOCATION DATA, ${error.code}`);
      },
    ); */
    doStuff();
  }, [pressed, doStuff]);

  const doStuff = useCallback(async () => {
    if (q !== '') {
      console.log(q);

      await axios
        .get('https://api.weatherapi.com/v1/current.json', {
          params: { key: key, q: q },
        })
        .then((response) => {
          console.log(response);
          console.log('updated');
          const setResponse = props.setResponse;
          setResponse(response.data);
        })
        .catch((error) => {
          setQ('');
          alert(
            'The API Key was bad. Please re-enter. If this error continues to come up, please contact me at: aaro.varjonen@tuni.fi',
          );
        });
    }
  }, [key, props.setResponse, q]);

  return (
    <View style={styles}>
      <TextInput onChangeText={setQ} placeholder={q} />
      <Button
        onPress={() => {
          setPressed(!pressed);
        }}
        title='Change Location'
      />
    </View>
  );
};

export default LocationComponent;
