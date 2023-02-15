import { StyleSheet, Text, Button, TextInput, View, Image } from 'react-native';
import {useState, useEffect} from 'react';

const Header = (props) => {
  const styles = props.style;
  const [city, setCity] =useState(props.name||'') ;
  useEffect(() => {
    if(props.name !== ''){
    setCity(props.name.location.name.toString());
    }
  }, [props.name])
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{city}</Text>
    </View>
  );
};
export default Header;
