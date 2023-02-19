import { Accelerometer } from 'expo-sensors';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Button,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

export default function LevelerScreen() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    // Add a listener to the accelerometer at the start of the component
    Accelerometer.addListener(setData);
    // Set the update interval for the accelerometer to 200ms
    Accelerometer.setUpdateInterval(200);

    // Remove the listener when the component unmounts
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);
  const showCool = () => {
    ToastAndroid.show('I have no idea if this works', ToastAndroid.SHORT);
  };
  const openGithub = async () => {
    await Linking.openURL(
      'https://github.com/Avsword/React-Native-WeatherApp',
    ).then(Alert.alert('Github opened!'));
  };
  return (
    <SafeAreaView
      // Change the background color based on the value of x
      // We set it here, since we will be using the value of x
      style={{
        backgroundColor:
          Math.abs(round(x)) > 0.9 && Math.abs(round(x)) < 1.1
            ? 'green'
            : 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={styles.coordinates}>
        x: {round(x)}, y: {round(y)}, z:{round(z)}
      </Text>
      <View>
        <Button title='Click me' onPress={showCool}></Button>
      </View>
      <View>
        <Button title='Open Github' onPress={openGithub}></Button>
      </View>
    </SafeAreaView>
  );
}
function round(number) {
  return Math.round(number * 100) / 100;
}

// Create a stylesheet for the text
const styles = StyleSheet.create({
  coordinates: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    family: 'monospace',
  },
});
