import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MediaScreen from '../screens/MediaScreen';
import AddMediaScreen from '../screens/AddMediaScreen';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import MediaDetailScreen from '../screens/MediaDetailScreen';
import MediaEditScreen from '../screens/MediaEditScreen';

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
				options={({navigation}) => ({
					title: "Mijn Foto's",
					headerRight: () => (
						<CustomButton primary={true} onClick={() => navigation.navigate('AddMediaScreen')}>
							<Ionicons name="add" size={25} color={theme.bg.backgroundColor}/>
							<Text style={{ color: theme.bg.backgroundColor }}>Foto Toevoegen</Text>
						</CustomButton>
					)
				})}
			/>
			<Stack.Screen
				name="AddMediaScreen"
				component={AddMediaScreen}
				options={{ title: 'Foto Toevoegen' }}
			/>
			<Stack.Screen
				name="MediaDetailScreen"
				component={MediaDetailScreen}
				options={{ title: 'Foto Bekijken' }}
			/>
			<Stack.Screen
				name="MediaEditScreen"
				component={MediaEditScreen}
				options={{ title: 'Foto Bewerken' }}
			/>
		</Stack.Navigator>
	);
}

export default MediaStack;