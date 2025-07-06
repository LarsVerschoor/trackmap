import { View, Image, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomButton from './CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function PhotoCard({ photo }) {
	const navigation = useNavigation();
	const { theme } = useContext(ThemeContext);
	const date = new Date(photo.date);

	function handleDetailClick() {
		navigation.navigate('Media', {
			screen: 'MediaDetailScreen',
			params: { photo }
		});
	}

	function handleEditClick() {
		navigation.navigate('Media', {
			screen: 'MediaEditScreen',
			params: { photo }
		})
	}

	return (
		<View style={[theme.bgLight, theme.border, styles.container]}>
			<Image source={{ uri: photo.uri }} style={styles.image}/>
			<Text style={[theme.textMuted, styles.text]}>
				{`${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`}
			</Text>
			<View style={styles.buttonsContainer}>
				<CustomButton primary onClick={handleDetailClick}>
					<Ionicons name="image-outline" size={24} color={theme.bg.backgroundColor}/>
					<Text style={{ color: theme.bg.backgroundColor }}>Bekijken</Text>
				</CustomButton>
				<CustomButton onClick={handleEditClick}>
					<Ionicons name="pencil-outline" size={24} color={theme.text.color}/>
					<Text style={theme.text}>Bewerken</Text>
				</CustomButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 10
	},
	text: {
		marginTop: 8,
		marginBottom: 16
	},
	image: {
		aspectRatio: 1,
		resizeMode: 'contain',
		backgroundColor: '#000000',
		borderRadius: 6
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10
	}
});

export default PhotoCard;