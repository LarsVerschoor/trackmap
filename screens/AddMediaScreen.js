import { Text, Image, StyleSheet, View, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useContext, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { CircuitsContext } from '../contexts/CircuitsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

function AddMediaScreen() {
	const { circuits, addPhoto } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);

	const [image, setImage] = useState(null);
	const [selectedCircuit, setSelectedCircuit] = useState(null);
	const [description, setDescription] = useState('');

	async function pickMedia() {
		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: false,
			quality: 1
		});

		if (result.canceled) return;

		setImage(result.assets[0].uri);
	}

	async function savePhoto() {
		if (!image || !selectedCircuit) {
			alert('Selecteer een circuit en een foto voordat u opslaat.');
			return;
		}

		await addPhoto(selectedCircuit, image, description);

		setImage(null);
		setSelectedCircuit(null);
		setDescription('');
		alert('De foto is opgeslagen!');
	}

	return (
		<ScrollView>
			<View style={[styles.container, theme.bgDark]}>
				<Text style={[theme.text, styles.heading]}>Welke foto wilt u toevoegen?</Text>
				<View style={[theme.bg, theme.border, styles.section]}>
					<Text style={theme.textMuted}>Zoek een foto</Text>
					<CustomButton onClick={() => pickMedia()} primary>
						<Ionicons name="image-outline" size={25} color={theme.bg.backgroundColor}/>
						<Text style={{color: theme.bg.backgroundColor}}>Foto zoeken op dit apparaat</Text>
					</CustomButton>
					{image && <Image
						source={{ uri: image }}
						style={[styles.image]}
					/>}
				</View>

				<Text style={[theme.text, styles.heading]}>Beschrijving</Text>
				<View style={[theme.bg, theme.border, styles.section]}>
					<Text style={theme.textMuted}>Geef een beschrijving van de foto</Text>
					<TextInput
						multiline
						numberOfLines={10}
						value={description}
						onChangeText={setDescription}
						style={[
							theme.bgLight,
							theme.border,
							theme.text,
							styles.input
						]}
					/>
				</View>

				<Text style={[theme.text, styles.heading]}>Bij welk circuit hoort de foto?</Text>
				<View style={[theme.bg, theme.border, styles.section]}>
					<Text style={theme.textMuted}>Selecteer een circuit</Text>
					<View style={[theme.border, styles.dropdown]}>
						<Picker
							selectedValue={selectedCircuit}
							onValueChange={(value) => setSelectedCircuit(value)}
							style={[theme.text, theme.bgLight]}
							itemStyle={theme.bgLight}
							dropdownIconColor={theme.text.color}
						>
							{
								circuits.map((circuit) => (
									<Picker.Item
										label={circuit.name}
										value={circuit.id}
										key={circuit.id}
										color={theme.text.color}
										style={theme.bgLight}
									/>
								))
							}
						</Picker>
					</View>
				</View>

				<View style={[theme.bg, theme.border, styles.section]}>
					<CustomButton onClick={() => savePhoto()} primary>
						<Ionicons name="save-outline" size={25} color={theme.bg.backgroundColor}/>
						<Text style={{color: theme.bg.backgroundColor}}>Voeg de foto toe aan het circuit</Text>
					</CustomButton>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: '100%',
		paddingVertical: 16,
		gap: 16
	},
	section: {
		marginHorizontal: 16,
		padding: 16,
		borderRadius: 10,
		gap: 10,
		flexDirection: 'column'
	},
	heading: {
		fontSize: 18,
		marginLeft: 16,
		marginTop: 8
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
		aspectRatio: 1,
		backgroundColor: '#000000',
		borderRadius: 6
	},
	dropdown: {
		borderRadius: 6,
		overflow: 'hidden'
	},
	input: {
		borderRadius: 6,
		padding: 16
	}
});

export default AddMediaScreen;