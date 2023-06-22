import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './src/types/navigator';
import { DetailsScreen } from './src/screens/DetailsScreen/DetailsScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

export default function App() {
  const Stack = createSharedElementStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            presentation: 'transparentModal',
          }}
          sharedElements={({ params }) => {
            return [params.id];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
