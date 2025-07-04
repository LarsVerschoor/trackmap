import ListScreen from '../screens/ListScreen';
import TabBarButton from './TabBarButton';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabBar() {
	return (
		<Tab.Navigator
			id={null}
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#060B13",
					borderColor: "#404859",
					borderTopWidth: 1
				},
				headerTintColor: "#fff",
				headerStyle: {
					backgroundColor: "#060B13",
					borderColor: "#404859",
					borderBottomWidth: 1
				}
			}}
		>
			<Tab.Screen
				name="List"
				component={ListScreen}
				options={{
					title: "Alle Circuits",
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="list-outline" size={24} color="#E5EEFF"/>
						</TabBarButton>
					)
				}}
			/>
			<Tab.Screen
				name="Map"
				component={MapScreen}
				options={{
					title: "Kaart",
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="map-outline" size={24} color="#E5EEFF"/>
						</TabBarButton>
					)
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: 'Instellingen',
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="settings-outline" size={24} color="#E5EEFF"/>
						</TabBarButton>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

export default TabBar;