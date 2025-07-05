import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import MediaScreen from '../screens/MediaScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

function MapStack() {
	const { theme } = useContext(ThemeContext);

	return (
		<Stack.Navigator
			id={null}
			initialRouteName="MapScreen"
			screenOptions={{
				tabBarStyle: [{
					borderTopWidth: 1,
					borderColor: theme.border.borderColor
				}, theme.bg],
				headerTintColor: theme.text.color,
				headerStyle: [{
					borderBottomWidth: 1,
					borderColor: theme.border.borderColor
				}, theme.bg]
			}}
		>
			<Stack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{
					title: "Kaart"
				}}
			/>
		</Stack.Navigator>
	);
}

export default MapStack;