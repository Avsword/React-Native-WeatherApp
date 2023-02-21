import WeatherComponent from '../components/WeatherComponent';
import HeaderComponent from '../components/HeaderComponent';
import LocationComponent from '../components/ChangeLocation';
import MapComponent from '../components/MapComponent';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { API_TOKEN } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export default function CurrentWeatherScreen(props) {
  // Here we just pass the API key to the WeatherComponent and the LocationComponent.
  // Also We'll use the response here, since we'll use the response in both of these components.
  const [weatherAPIKEY, setweatherAPIKEY] = useState(API_TOKEN || '');
  const [response, setResponse] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <HeaderComponent style={styles} name={response} /> */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242a28',
    paddingTop: 20,
  },
  header: {
    flex: 1,
    backgroundColor: '#242a28',
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
  },
  headerText: { textAlign: 'center', fontSize: 30, fontFamily: 'Helvetica' },
  weather: {
    flex: 3,
    backgroundColor: '#242a28',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  weatherText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: '#e3ebef',
  },

  weatherIcon: {
    width: 64,
    height: 64,
  },
  location: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    border: '2px solid black',
  },
});
