import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import ContactList from '../screens/ContactList';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'source.uri should not be an empty string',
  'ReactImageView: Image source "" doesn\'t exist',
]);

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={ContactList} />
    </Stack.Navigator>
  );
}
