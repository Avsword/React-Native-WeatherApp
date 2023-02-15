import { View, Text, StyleSheet, Image } from 'react-native';

const ForecastItem = ({ date, temp, wind, icon, weather }) => {
  const realicon = 'https:' + icon.toString();
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {date} - It will be {weather} with an average temperature of {temp}{' '}
        degrees celsius and {wind} kph wind speed.
      </Text>
      <Image
        style={styles.weatherIcon}
        source={{
          uri: realicon,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
  },
  weatherIcon: {
    width: 128,
    height: 128,
  },
});
export default ForecastItem;
