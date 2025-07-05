import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import ListScreen from '../screens/ListScreen';

const Stack = createNativeStackNavigator();

function ListStack() {
	const { theme } = useContext(ThemeContext);

	return (
		<Stack.Navigator
			id={null}
			initialRouteName="ListScreen"
			screenOptions={{
				headerTintColor: theme.text.color,
				headerStyle: [{
					borderBottomWidth: 10,
					borderColor: theme.border.borderColor
				}, theme.bg]
			}}
		>
			<Stack.Screen
				name="ListScreen"
				component={ListScreen}
				options={{
					title: "Alle Circuits"
				}}
			/>
		</Stack.Navigator>
	);
}

export default ListStack;