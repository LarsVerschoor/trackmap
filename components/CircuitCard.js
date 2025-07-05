import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { CircuitsContext } from '../contexts/CircuitsContext';

function CircuitCard ({ circuit }) {
	const { toggleVisited } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);
	const navigation = useNavigation();
	function handleMapClick() {
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
		<View style={[theme.bg, theme.border, styles.container]}>
			<View style={styles.headerContainer}>
				<Text style={[theme.text, styles.name]}>{circuit.name}</Text>
				<Pressable onPress={() => toggleVisited(circuit.id)}>
					<Ionicons name={`checkmark-circle${circuit.visited ? '' : '-outline'}`} size={25} color={theme.primary.backgroundColor}/>
				</Pressable>
			</View>

			<View style={styles.locationDescriptionContainer}>
				<Ionicons name="location-outline" size={25} color={theme.textMuted.color}/>
				<Text style={theme.textMuted}>{circuit.location.description}</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<CustomButton primary onClick={handleMapClick}>
					<Ionicons name="map-outline" size={25} color={theme.bg.backgroundColor}/>
					<Text style={{color: theme.bg.backgroundColor}}>Naar Locatie</Text>
				</CustomButton>
				<CustomButton>
					<Ionicons name="images-outline" size={25} color={theme.text.color}/>
					<Text style={theme.text}>Mijn Foto's</Text>
				</CustomButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
		fontWeight: 'bold'
	},
	locationDescriptionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 18
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10
	}
});

export default CircuitCard;