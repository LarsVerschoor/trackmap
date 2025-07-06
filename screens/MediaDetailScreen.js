import { Text, View, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import { ThemeContext } from '../contexts/ThemeContext';

function MediaDetailScreen({ route }) {
	const photo = route.params?.photo;
	const { circuits } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);

	const date = photo && new Date(photo.date);

	return (
		<View style={[theme.bgDark, styles.container]}>
			{!photo ?
				<Text>Foto niet gevonden</Text> :
				<>
					<Image style={styles.image} source={{ uri: photo.uri }}/>
					<View style={[theme.bg, theme.border, styles.info]}>
						<Text style={[theme.text, styles.heading]}>{`Circuit: ${circuits.find((circuit) => circuit.id === photo.circuitId).name}`}</Text>

						<View>
							<Text style={theme.text}>{`Beschrijving: ${photo.description}`}</Text>
						</View>

					</View>
					<View style={[theme.bg, theme.border, styles.info]}>
						<Text style={theme.textMuted}>{`Datum toegevoegd: ${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`}</Text>
					</View>
				</>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		resizeMode: 'contain',
		backgroundColor: '#000000'
	},
	info: {
		marginInline: 16,
		marginTop: 16,
		padding: 10,
		borderRadius: 10,
		gap: 8
	},
	heading: {
		fontSize: 18
	}
});

export default MediaDetailScreen;