import { TouchableOpacity, StyleSheet, View } from 'react-native';

function TabBarButton(props) {
	return (
		<TouchableOpacity { ...props }>
			<View style={[styles.background, props['aria-selected'] && styles.selected]}>
				{props.children}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	background: {
		borderWidth: 1,
		borderColor: '#060B13',
		borderRadius: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
		aspectRatio: 1,
		overflow: 'visible',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 50
	},
	selected: {
		backgroundColor: '#0D1526',
		borderColor: '#404859',
	}
});

export default TabBarButton;