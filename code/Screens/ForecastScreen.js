import { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import ForecastItem from '../components/ForecastItem';
import DatePickerOptions from '@react-native-community/datetimepicker';
import { API_TOKEN } from '@env';

export default function Forecast() {
  let input = API_TOKEN;
  // TODO: Get the location of the user.
  // Location. We actually do kind of want to get the... location of the user. But for now, we'll just use Tampere.
  const q = 'tampere';
  const [loading, setLoading] = useState(false);
  // Forecast data
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date(Date.now()));

  // Display method can be of two types: 'forecast' or 'date'
  //  'forecast' will display the forecast for the next 3 days.
  const [displayMethod, setDisplayMethod] = useState('forecast');
  // As previously mentioned, it is by default set to 3. Should the date change, then
  //      we'll calculate the difference between the current date and the new date.
  const [days, setDays] = useState(3);

  // We'll use this in order to avoid undefined errors
  let changeAfterFetch = false;

  // Should the date be updated, then we must calculate
  //  the difference between the current date and the new date.
  //  then fetch that many days from the API and output the last item.
  useEffect(() => {
    console.log(date.getDate() + ' ' + new Date(Date.now()).getDate());
    if (parseInt(date.getDate()) != parseInt(new Date(Date.now()).getDate())) {
      console.log('Date changed and changeafter was set to true');
      changeAfterFetch = true;
      // Calculate the difference between the current date and the new date.
      // If the difference between days is larger than 2 (Since I am on the free version)
      if (
        parseInt(date.getDate()) - parseInt(new Date(Date.now()).getDate()) >
        2
      ) {
        alert(
          'You can only choose a date that is 2 days from now or today. Sorry for the inconvenience.',
        );
        // Return, so that the function doesn't continue.
        return;
      } else {
        // Set the days to fetch to what the difference is. We'll use this also as the index
        //      that we want to show.
        // I know that I can only get 3 days, but this is also futureproofing it.
        setDays(
          parseInt(date.getDate()) - parseInt(new Date(Date.now()).getDate()),
        );
      }
    }
    // Await the fetch and then update it.
    fetch();

    console.log('The item I want to update is... ' + JSON.stringify(data));
  }, [date]);

  //Update
  useEffect(() => {
    if (data !== ' ') {
      // console.log('updated', data);
    }
  }, [data]);

  // According to the npm documentation, this is how you use the datepicker.
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  async function fetch() {
    console.log('Fetching...');
    setLoading(true);
    if (input !== '') {
      //console.log('input', input);
      console.log('days' + days);
      await axios
        .get('https://api.weatherapi.com/v1/forecast.json', {
          params: { key: input, q: q, days: days, hour: 0 },
        })
        .then((response) => {
          // TODO:
          /**
           * Currently this gives me the output of: "2023-02-23"
           * I want to... somehow set the data to be only that.
           */
          if (changeAfterFetch) {
            console.log(
              'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                'date: ' +
                date +
                JSON.stringify(response.data.forecast.forecastday[2].date),
            );
            //setData(response.data.forecast.forecastday[date - 1]);
          } else {
            setData(response.data.forecast.forecastday);
          }
        })
        .then(() => {
          // After everything is done, then check if we actually change the displa
          if (changeAfterFetch) {
            setDisplayMethod('date');
          }
        })
        .catch((error) => {
          alert('Something went wrong with the forecast.');
        });
    }

    setLoading(false);
  }

  // By default the FlatList only renders items, which can fit on the screen. This is why we must do a bit of math
  //  to get the correct index of the item we want to render.
  return displayMethod == 'forecast' ? (
    <SafeAreaView style={styling.background}>
      <Text style={styling.lightText}>
        Note that you can only choose a forecast of the next 3 days (Including
        today).
      </Text>

      <View style={styling.datePicker}>
        <DatePickerOptions
          value={new Date(date)}
          onChange={changeDate}
          mode='date'
        ></DatePickerOptions>
      </View>

      <FlatList
        key={'ForecastList'}
        data={data}
        initialNumToRender={days}
        windowSize={days}
        maxToRenderPerBatch={days}
        keyExtractor={(item, index) => 'ForecastItem' + index}
        renderItem={({ item }) => (
          <ForecastItem
            key={item.id}
            date={item.date}
            temp={item.day.avgtemp_c}
            wind={item.day.maxwind_mph}
            icon={item.day.condition.icon}
            weather={item.day.condition.text}
          />
        )}
      />
    </SafeAreaView>
  ) : data != undefined ? (
    <SafeAreaView style={styling.background}>
      <Text style={styling.lightText}>AAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
      <View style={styling.datePicker}>
        <DatePickerOptions
          value={new Date(date)}
          onChange={changeDate}
          mode='date'
        ></DatePickerOptions>
      </View>

      <ForecastItem
        date={data.date}
        temp={data.day.avgtemp_c}
        wind={data.day.maxwind_mph}
        icon={data.day.condition.icon}
        weather={data.day.condition.text}
      />
    </SafeAreaView>
  ) : (
    <View>
      <Text>Something went wrong...</Text>
    </View>
  );
}

const styling = StyleSheet.create({
  background: {
    backgroundColor: '#242a28',
    alignSelf: 'flex-start',
  },
  lightText: {
    color: '#e3ebef',
    marginVertical: 10,
  },
  datePicker: {
    backgroundColor: '#e3ebef',
    alignSelf: 'center',
    borderRadius: 20,
    width: 100,
  },
});
