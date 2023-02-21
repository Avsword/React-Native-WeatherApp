import CurrentWeatherScreen from './Screens/CurrentWeatherScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ForecastScreen from './Screens/ForecastScreen';
import LevelerScreen from './Screens/LevelerScreen';
import { API_TOKEN } from '@env';

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Leveler' component={LevelerScreen} />
        <Tab.Screen name='Forecast' component={ForecastScreen} />
        <Tab.Screen name='Current' component={CurrentWeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

