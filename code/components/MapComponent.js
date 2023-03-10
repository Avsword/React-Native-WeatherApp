import { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';

const MapComponent = (props) => {
  const [location, setLocation] = useState(props.location || 'Tampere');

  const scheme = Platform.select({
    ios: 'maps:',
    android: 'geo:',
  });

  const getUrl = () => {
    const query = encodeURIComponent(location);
    return `${scheme}${query}`;
  };

  const openMap = () => {
    Linking.openURL(getUrl());
  };

  useEffect(() => {
    setLocation(props.location || 'Tampere');
  }, [props.location]);

  return (
    <View style={styles.container}>
      <Text style={{ color: '#e3ebef' }}>Open in Maps!</Text>
      <Button onPress={openMap} title='Open in Maps' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    textAlign: 'center',
  },
});

export default MapComponent;
