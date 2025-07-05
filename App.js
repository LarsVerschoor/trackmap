import { NavigationContainer } from '@react-navigation/native';
import TabBar from './components/TabBar';
import { CircuitsProvider } from './contexts/CircuitsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DynamicStatusBar from './components/DynamicStatusBar';

export default function App() {
	return (
		<ThemeProvider>
			<CircuitsProvider>
				<NavigationContainer>
					<TabBar/>
					<DynamicStatusBar/>
				</NavigationContainer>
			</CircuitsProvider>
		</ThemeProvider>
	);
}