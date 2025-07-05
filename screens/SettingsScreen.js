import { View, Text, StyleSheet, Switch } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function SettingsScreen() {
	const { theme, mode, setMode } = useContext(ThemeContext);

	return (
		<View style={[theme.bgDark, styles.container]}>
			<Text style={[theme.text, styles.heading]}>Thema</Text>
			<View style={[theme.bg, theme.border, styles.section]}>
				<View style={styles.setting}>
					<Text style={theme.text}>Donker thema</Text>
					<Switch
						onValueChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
						value={mode === 'dark'}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	section: {
		marginHorizontal: 16,
		marginVertical: 8,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10
	},
	heading: {
		fontSize: 18,
		marginLeft: 16,
		marginTop: 16
	},
	setting: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

export default SettingsScreen;