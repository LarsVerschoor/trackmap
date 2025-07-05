import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import MediaScreen from '../screens/MediaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function SettingsStack() {
	const { theme } = useContext(ThemeContext);

	return (
		<Stack.Navigator
			id={null}
			initialRouteName="SettingsScreen"
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
				name="SettingsScreen"
				component={SettingsScreen}
				options={{
					title: "Instellingen"
				}}
			/>
		</Stack.Navigator>
	);
}

export default SettingsStack;