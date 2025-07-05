import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function DynamicStatusBar() {
	const { mode } = useContext(ThemeContext);

	return <StatusBar style={mode === 'dark' ? 'light' : 'dark'}/>
}

export default DynamicStatusBar;