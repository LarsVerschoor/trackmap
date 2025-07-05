import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function TabBarButton(props) {
	const { theme } = useContext(ThemeContext);
	return (
		<TouchableOpacity { ...props }>
			<View style={[styles.background, props['aria-selected'] && theme.primary]}>
				{props.children}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	background: {
		borderWidth: 0,
		borderRadius: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 50
	}
});

export default TabBarButton;