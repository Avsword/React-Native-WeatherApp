import WeatherComponent from '../components/WeatherComponent';
import HeaderComponent from '../components/HeaderComponent';
import LocationComponent from '../components/ChangeLocation';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CurrentWeatherScreen(props) {
  const [weatherAPIKEY, setweatherAPIKEY] = useState('');
  const [response, setResponse] = useState('');

  return (
    <View style={styles.container}>
      <HeaderComponent style={styles} name={response} />
      <WeatherComponent
        style={styles}
        response={response}
        setResponse={setResponse}
        apikey={weatherAPIKEY}
        setapikey={setweatherAPIKEY}
      />
      <LocationComponent
        style={styles.location}
        setResponse={setResponse}
        apikey={weatherAPIKEY}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8ef0d3',
  },
  header: {
    flex: 1,
    backgroundColor: '#5ac7ed',
    borderRadius: 20,
    margin: 8,
    justifyContent: 'center',
  },
  headerText: { textAlign: 'center', fontSize: 50, fontFamily: 'Helvetica' },
  weather: {
    flex: 3,
    backgroundColor: '#5ac7ed',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  weatherText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: '#fdfefe',
  },

  weatherIcon: {
    width: 128,
    height: 128,
  },
  location: {
    flex: 1,
    backgroundColor: '#5ac7ed',
    justifyContent: 'center',
    border: '2px solid black',
  },
});
