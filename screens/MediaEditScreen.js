import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useState } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

function MediaEditScreen({ route }) {
	const { circuits, editPhoto } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);
	const photo = route.params?.photo;
	const [description, setDescription] = useState(photo.description ?? '');
	const [selectedCircuit, setSelectedCircuit] = useState((photo.circuitId || photo.circuitId === 0) ? photo.circuitId : null);

	async function savePhoto() {
		if (selectedCircuit === null) {
			alert('Selecteer een circuit en een foto voordat u opslaat.');
			return;
		}

		editPhoto(photo, selectedCircuit, description);

		alert('De wijzigingen zijn opgeslagen!');
	}

	return (
		<View style={[theme.bgDark, styles.container]}>
			{!photo ?
				<Text>Foto niet gevonden</Text> :
				<>
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
					<Text style={[theme.text, styles.heading]}>Circuit</Text>
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
								<Picker.Item
									label="Selecteer een circuit"
									value={null}
									key={null}
									color={theme.text.color}
									style={theme.bgLight}
								/>
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
							<Text style={{color: theme.bg.backgroundColor}}>Foto opslaan</Text>
						</CustomButton>
					</View>
				</>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: '100%',
		paddingVertical: 16,
		gap: 8
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
	input: {
		borderRadius: 6,
		padding: 16
	}
});

export default MediaEditScreen;