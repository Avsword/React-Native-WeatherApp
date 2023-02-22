import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

const getLocationAndPermissions = async (setQ, fetch, setLoading) => {
  // Loader
  setLoading(true);

  // On mount we ask for the permission to use the location.
  // Since the normal Location in React Native is deprecated, we'll use Expo-location.

  // We get the status of the permission.
  // Pretty sure this works for ios and android.
  let { status } = await Location.requestForegroundPermissionsAsync();
  // If we don't have the permission, then we'll throw out an error and return the func.
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
    //throw new Error('Permission to access location was denied');
  }
  // If we get here, then we have the permission.
  // TODO: We'll need to implement a loading screen for when the await isn't completed.
  let location = await Location.getCurrentPositionAsync({});
  console.log(
    'LOCATION GOT FROM SYSTEM: ' +
      location.coords.latitude +
      ', ' +
      location.coords.longitude,
  );
  await setQ(
    String(location.coords.latitude + ',' + location.coords.longitude),
  );
  await fetch();
  setLoading(false);
};

const LocationComponent = (props) => {
  const [q, setQ] = useState(
    props.location == undefined ? 'Oslo' : props.location,
  );
  const [pressed, setPressed] = useState(true);
  const [key, setKey] = useState(props.apikey);
  const [loading, setLoading] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [opacity, setOpacity] = useState(1);

  // On mount we'd very much like for the component to get the current location.
  // We'll also start the animation
  useEffect(() => {
    getLocationAndPermissions(setQ, fetch, setLoading);
  }, []);

  useEffect(() => {
    setKey(props.apikey);
  }, [props.apikey]);

  useEffect(() => {
    fetch();
  }, [pressed, fetch, q]);

  const fetch = useCallback(async () => {
    if (locationInput !== '') {
      await setQ(locationInput);
    }
    if (q !== '') {
      await axios
        .get('https://api.weatherapi.com/v1/current.json', {
          params: { key: key, q: q },
        })
        .then((response) => {
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
  }, [key, props.setResponse, q, locationInput]);

  return !loading ? (
    <View style={styling.container}>
      <TextInput
        value={locationInput}
        onChangeText={setLocationInput}
        placeholder={'New location here!'}
        placeholderTextColor={'gray'}
        style={styling.TextInput}
      />
      <Pressable
        style={styling.Pressables}
        onPress={() => {
          setPressed(!pressed);
        }}
        title='Change Location'
      >
        <Text>Change Location</Text>
      </Pressable>
      <Pressable
        style={styling.Pressables}
        onPress={() => {
          getLocationAndPermissions(setQ, fetch, setLoading);
        }}
        title='Get current location'
      >
        <Text>Get current location</Text>
      </Pressable>
    </View>
  ) : (
    <View style={[styling.loadingContainer]}>
      {/* <SvgLoader color='Blue' size={64}></SvgLoader> */}
      <Text style={styling.loadingText}>
        Getting your current location, please hold on
      </Text>
      {/* <Image source={loaderGif} style={styling.loader}></Image> */}
    </View>
  );
};
const styling = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3ebef',
    textAlign: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    color: '#242a28',
  },
  Pressables: {
    width: '50%',
    backgroundColor: '#e3ebef',
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  PressableText: {
    color: '#e3ebef',
    marginBottom: 10,
  },
  TextInput: {
    marginBottom: 10,
    padding: 10,
    height: 40,
    color: '#e3ebef',
  },
});
export { LocationComponent, getLocationAndPermissions };
