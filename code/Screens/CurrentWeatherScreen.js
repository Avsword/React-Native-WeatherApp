import WeatherComponent from '../components/WeatherComponent';
import HeaderComponent from '../components/HeaderComponent';
import LocationComponent from '../components/ChangeLocation';
import MapComponent from '../components/MapComponent';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { API_TOKEN } from '@env';

export default function CurrentWeatherScreen(props) {
  const [weatherAPIKEY, setweatherAPIKEY] = useState(API_TOKEN || '');
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
      <MapComponent></MapComponent>
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
    borderRadius: 10,
    margin: 8,
    justifyContent: 'center',
  },
  headerText: { textAlign: 'center', fontSize: 30, fontFamily: 'Helvetica' },
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
    width: 64,
    height: 64,
  },
  location: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    border: '2px solid black',
  },
});
