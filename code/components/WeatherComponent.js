import { Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import InputKeyComponent from './InputKey';

const WeatherComponent = (props) => {
  const response = props.response;
  const setResp = props.setResponse;
  const [weather, setWeather] = useState('../assets/GifLoader.gif');
  const [weatherIcon, setWeatherIcon] = useState('../assets/GifLoader.gif');
  const [weatherStatus, setWeatherStatus] = useState('sunny');
  const [locationInAPI, setLocationInAPI] = useState('');
  const weatherAPIKEY = props.apikey;
  const setweatherAPIKEY = props.setapikey;
  const styles = props.style;

  //Update
  useEffect(() => {
    //console.log('response changed', response.toString());
    if (response !== '') {
      setWeather(response.current);
      setLocationInAPI(response.location.name.toString());
      setWeatherIcon('https:' + response.current.condition.icon.toString());
      setWeatherStatus(response.current.condition.text);
    }
  }, [response]);

  return weatherAPIKEY ? (
    <View style={styles.weather}>
      <Text style={styles.weatherText}>
        Current weather in {locationInAPI}: {weatherStatus}
      </Text>
      {
        <Image
          style={styles.weatherIcon}
          source={{
            uri: weatherIcon,
          }}
        />
      }
      <Text style={styles.weatherText}>
        Temperature is: {weather.temp_c} °C and it feels like:{' '}
        {weather.feelslike_c} °C
      </Text>
      <Text style={styles.weatherText}>
        Humidity is: {weather.humidity} % and the wind is {weather.wind_kph}{' '}
        km/h
      </Text>
      <Text style={styles.weatherText}>Powered by: WeatherAPI.com</Text>
    </View>
  ) : (
    <InputKeyComponent
      style={styles.weather}
      setResponse={setResp}
      setKey={setweatherAPIKEY}
    />
  );
};
export default WeatherComponent;
