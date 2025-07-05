import TabBarButton from './TabBarButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import MediaStack from '../stack-navigators/MediaStack';
import ListStack from '../stack-navigators/ListStack';
import MapStack from '../stack-navigators/MapStack';
import SettingsStack from '../stack-navigators/SettingsStack';

const Tab = createBottomTabNavigator();

function TabBar() {
	const { theme } = useContext(ThemeContext);

	return (
		<Tab.Navigator
			id={null}
			screenOptions={{
				tabBarStyle: [{
					borderTopWidth: 1,
					borderColor: theme.border.borderColor
				},
				theme.bg],
				headerTintColor: theme.text.color,
				headerStyle: [{
					borderBottomWidth: 1,
					borderColor: theme.border.borderColor
				},
				theme.bg]
			}}
		>
			<Tab.Screen
				name="List"
				component={ListStack}
				options={{
					headerShown: false,
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="list-outline" size={25} color={props['aria-selected'] ? theme.bg.backgroundColor : theme.text.color}/>
						</TabBarButton>
					)
				}}
			/>
			<Tab.Screen
				name="Map"
				component={MapStack}
				options={{
					headerShown: false,
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="map-outline" size={25} color={props['aria-selected'] ? theme.bg.backgroundColor : theme.text.color}/>
						</TabBarButton>
					)
				}}
			/>
			<Tab.Screen
				name="Media"
				component={MediaStack}
				options={{
					headerShown: false,
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="images-outline" size={25} color={props['aria-selected'] ? theme.bg.backgroundColor : theme.text.color}/>
						</TabBarButton>
					)
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsStack}
				options={{
					headerShown: false,
					tabBarButton: (props) => (
						<TabBarButton {...props}>
							<Ionicons name="settings-outline" size={25} color={props['aria-selected'] ? theme.bg.backgroundColor : theme.text.color}/>
						</TabBarButton>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

export default TabBar;