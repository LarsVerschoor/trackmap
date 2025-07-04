import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

function CircuitCard ({ circuit }) {
	const navigation = useNavigation();
	function handleMapClick() {
		console.log('test')
		navigation.navigate('Map', {
			region: {
				latitude: circuit.location.latitude,
				longitude: circuit.location.longitude,
				latitudeDelta: 0.05,
				longitudeDelta: 0.05
			}
		});
	}

	return (
		<View style={ styles.container }>
			<View style={styles.headerContainer}>
				<Text style={styles.name}>{circuit.name}</Text>
				<Ionicons name="bookmark-outline" size={24} color="#9CB9F2"/>
			</View>

			<View style={styles.locationDescriptionContainer}>
				<Ionicons name="location" size={24} color="#A4AEC2"/>
				<Text style={styles.locationDescription}>{circuit.location.description}</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<CustomButton primary={true} onClick={handleMapClick}>Naar Locatie</CustomButton>
				<CustomButton primary={false}>Mijn notities</CustomButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#060B13',
		borderColor: '#404859',
		borderWidth: 1,
		padding: 10,
		borderRadius: 10
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	name: {
		fontSize: 16,
		color: '#E5EEFF'

	},
	locationDescriptionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 18
	},
	locationDescription: {
		color: '#A4AEC2'
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	}
});

export default CircuitCard;