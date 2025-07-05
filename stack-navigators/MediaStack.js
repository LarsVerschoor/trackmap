import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MediaScreen from '../screens/MediaScreen';
import AddMediaScreen from '../screens/AddMediaScreen';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

function MediaStack() {
	const { theme } = useContext(ThemeContext);

	return (
		<Stack.Navigator
			id={null}
			initialRouteName="MediaScreen"
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
				name="MediaScreen"
				component={MediaScreen}
				options={{
					title: "Mijn Foto's"
				}}
			/>
			<Stack.Screen
				name="AddMediaScreen"
				component={AddMediaScreen}
				options={{ title: 'Foto Toevoegen' }}
			/>
		</Stack.Navigator>
	);
}

export default MediaStack;