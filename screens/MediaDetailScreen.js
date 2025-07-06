import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';

function MediaDetailScreen({ route }) {
	const photo = route.params?.photo;
	const { circuits, deletePhoto } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);

	const date = photo && new Date(photo.date);

	const navigation = useNavigation();

	async function handleDeletePhoto() {
		await deletePhoto(photo.circuitId, photo.uri);
		alert('Foto verwijderd');
		navigation.navigate('Media', {
			screen: 'MediaScreen'
		});
	}

	async function sharePhoto() {
		try {
			const isAvailable = await Sharing.isAvailableAsync();
			if (!isAvailable) {
				alert('Kan de foto niet delen');
				return;
			}

			await Sharing.shareAsync(photo.uri, {
				dialogTitle: 'Foto delen'
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function shareDescription() {
		try {
			await Share.share({
				message: photo.description,
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<ScrollView style={[theme.bgDark, styles.container]}>
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
					<View style={[theme.bg, theme.border, styles.info]}>
						<CustomButton onClick={handleDeletePhoto} primary>
							<Ionicons name="trash-outline" size={25} color={theme.bg.backgroundColor}/>
							<Text style={{color: theme.bg.backgroundColor}}>Foto Verwijderen</Text>
						</CustomButton>
						<CustomButton onClick={sharePhoto}>
							<Ionicons name="share-social-outline" size={25} color={theme.text.color}/>
							<Text style={theme.text}>Foto Delen</Text>
						</CustomButton>
						<CustomButton onClick={shareDescription}>
							<Ionicons name="share-social-outline" size={25} color={theme.text.color}/>
							<Text style={theme.text}>Beschrijving Delen</Text>
						</CustomButton>
					</View>
				</>
			}
		</ScrollView>
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
		backgroundColor: '#000000',
		marginBottom: 16
	},
	info: {
		marginInline: 16,
		marginBottom: 16,
		padding: 10,
		borderRadius: 10,
		gap: 8
	},
	heading: {
		fontSize: 18
	}
});

export default MediaDetailScreen;