import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './components/TabBar';
import { CircuitsProvider } from './contexts/CircuitsContext';

export default function App() {
	return (
		<CircuitsProvider>
			<NavigationContainer>
				<TabBar/>
				<StatusBar style="light"></StatusBar>
			</NavigationContainer>
		</CircuitsProvider>
	);
}