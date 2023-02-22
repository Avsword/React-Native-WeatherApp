import CurrentWeatherScreen from './Screens/CurrentWeatherScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ForecastScreen from './Screens/ForecastScreen';
import LevelerScreen from './Screens/LevelerScreen';

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: '#242a28' }}
        activeColor='#ffffff'
        inactiveColor='#e3ebef'
        tabBarLabelStyle={{ fontSize: 28 }}
      >
        <Tab.Screen name='Current' component={CurrentWeatherScreen} />
        <Tab.Screen name='Forecast' component={ForecastScreen} />
        <Tab.Screen name='Leveler' component={LevelerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

