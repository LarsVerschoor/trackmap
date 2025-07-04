import { Pressable, StyleSheet, Text } from 'react-native';

function CustomButton({ onClick, primary, children }) {
	console.log(onClick);
	return (
		<Pressable style={[styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary]} onPress={onClick}>
			<Text style={[primary ? styles.textPrimary : styles.textSecondary]}>{ children }</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderColor: '#404859',
		borderWidth: 1,
		borderRadius: 6,
		alignSelf: 'flex-start'
	},
	buttonPrimary: {
		backgroundColor: '#9CB9F1'
	},
	buttonSecondary: {
		backgroundColor: '#0D1526'
	},
	textPrimary: {
		color: '#060B13'
	},
	textSecondary: {
		color: '#E5EEFF'
	}
});

export default CustomButton;