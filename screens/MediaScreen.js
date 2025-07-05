import { Text, View, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import PhotoCard from '../components/PhotoCard';

function MediaScreen({ route }) {
	const { circuits } = useContext(CircuitsContext);
	const navigation = useNavigation();

	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		if (!circuits) return;

		setPhotos(circuits.flatMap((circuit) => {
			return circuit.photos.map((photo) => ({
				circuitId: circuit.id,
				uri: photo.uri,
				description: photo.description
			}));
		}));
		console.log(photos);
	}, [circuits]);


	return (
		<View>
			<Text>Test</Text>
			<CustomButton primary={true} onClick={() => navigation.navigate('AddMediaScreen')}>
				<Ionicons name="add" size={25}/>
				<Text>Foto Toevoegen</Text>
			</CustomButton>
			<FlatList
				data={photos}
				renderItem={({item}) => <PhotoCard photo={item}/>}
			/>
		</View>
	);
}

export default MediaScreen;