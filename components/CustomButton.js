import { Pressable, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function CustomButton({ onClick, primary, children }) {
	const { theme } = useContext(ThemeContext);

	return (
		<Pressable style={[styles.button, theme.border, primary ? theme.primary : theme.bgLight]} onPress={onClick}>
			<View style={[styles.content, primary ? {color: theme.bg.backgroundColor} : theme.text]}>{ children }</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 6,
		alignSelf: 'flex-start',
		flexGrow: 1
	},
	content: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default CustomButton;