import { createContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext(null);

function ThemeProvider ({children}) {
	const [mode, setMode] = useState('dark');

	useEffect(() => {
		(async () => {
			const savedMode = await AsyncStorage.getItem('mode');
			if (!savedMode) return;
			setMode(JSON.parse(savedMode));
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await AsyncStorage.setItem('mode', JSON.stringify(mode));
		})();
	}, [mode]);

	return (
		<ThemeContext.Provider value={{theme: mode === 'dark' ? darkStyles : lightStyles, mode, setMode}}>
			{children}
		</ThemeContext.Provider>
	);
}

const darkStyles = StyleSheet.create({
	bgDark: {
		backgroundColor: '#000000'
	},
	bg: {
		backgroundColor: '#060B13'
	},
	bgLight: {
		backgroundColor: '#0D1526'
	},
	text: {
		color: '#E5EEFF'
	},
	textMuted: {
		color: '#A4AEC2'
	},
	border: {
		borderColor: '#404859',
		borderWidth: 1
	},
	primary: {
		backgroundColor: '#9CB9F2'
	}
});

const lightStyles = StyleSheet.create({
	bgDark: {
		backgroundColor: '#D9E1F2'
	},
	bg: {
		backgroundColor: '#ECF0F9'
	},
	bgLight: {
		backgroundColor: '#FFFFFF'
	},
	text: {
		color: '#00091A'
	},
	textMuted: {
		color: '#3D475C'
	},
	border: {
		borderColor: '#A6AEBF',
		borderWidth: 1
	},
	primary: {
		backgroundColor: '#0D2A63'
	}
});

export { ThemeContext, ThemeProvider }