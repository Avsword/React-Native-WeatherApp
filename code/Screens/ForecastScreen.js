import { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, ToastAndroid } from 'react-native';
import axios from 'axios';
import ForecastItem from '../components/ForecastItem';
import DatePickerOptions from '@react-native-community/datetimepicker';
import { API_TOKEN } from '@env';

export default function Forecast() {
  let input = API_TOKEN;
  const q = 'tampere';
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetch() {
      if (input !== '') {
        //console.log('input', input);
        await axios
          .get('https://api.weatherapi.com/v1/forecast.json', {
            params: { key: input, q: q, days: '4' },
          })
          .then((response) => {
            //console.log('hello?', response.data.forecast.forecastday);
            setData(response.data.forecast.forecastday);
            //console.log('updated', data);
          })
          .catch((error) => {
            input = '';
            alert(
              'The API Key was bad. Please re-enter. If this error continues to come up, please contact me at: aaro.varjonen@tuni.fi',
            );
          });
      }
    }

    fetch();
  }, []);

  //Update
  useEffect(() => {
    if (data !== ' ') {
      //console.log('updated', data);
    }
  }, [data]);

  return (
    <SafeAreaView>
      <DatePickerOptions
        value={date}
        onChange={(date) => setDate(date)}
        mode='date'
      ></DatePickerOptions>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ForecastItem
            date={item.date}
            temp={item.day.avgtemp_c}
            wind={item.day.maxwind_mph}
            icon={item.day.condition.icon}
            weather={item.day.condition.text}
          />
        )}
      />
    </SafeAreaView>
  );
}
