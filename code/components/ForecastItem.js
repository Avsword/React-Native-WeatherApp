import { View, Text, StyleSheet, Image } from 'react-native';

const ForecastItem = ({ date, temp, wind, icon, weather }) => {
  const realicon = 'https:' + icon.toString();
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {date} - It will be {weather} with an average temperature of {temp} °C
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
    backgroundColor: '#e3ebef',
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
  },
  weatherIcon: {
    width: 64,
    height: 64,
  },
});
export default ForecastItem;
