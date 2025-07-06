import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../contexts/ThemeContext';
import PhotoCard from '../components/PhotoCard';

function MediaScreen({ route }) {
	const { circuits } = useContext(CircuitsContext);
	const { theme } = useContext(ThemeContext);
	const [ filter, setFilter ] = useState(null);

	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		if (!circuits) return;

		function extractPhotos(circuit) {
			return circuit.photos.map((photo) => ({
				circuitId: circuit.id,
				uri: photo.uri,
				description: photo.description,
				date: photo.date
			}));
		}

		setPhotos(circuits.flatMap(extractPhotos).sort((a, b) => b.date - a.date));
	}, [circuits]);

	useEffect(() => {
		const filter = route.params?.filter;
		if (!filter && filter !== 0) return;
		setFilter(filter);
	}, [route.params?.filter]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
				<View style={[theme.border]}>
					<Picker
						selectedValue={filter}
						onValueChange={(value) => setFilter(value)}
						style={[theme.text, theme.bgLight, theme.border]}
						itemStyle={theme.bgLight}
						dropdownIconColor={theme.text.color}
					>
						<Picker.Item
							label="Geen filter"
							value={null}
							key={null}
							color={theme.text.color}
							style={theme.bgLight}
						/>
						{(circuits ?? []).map((circuit) => (
							<Picker.Item
								label={`Filter: ${circuit.name}`}
								value={circuit.id}
								key={circuit.id}
								color={theme.text.color}
								style={theme.bgLight}
							/>
						))}
					</Picker>
				</View>
				<View style={[theme.bgDark, styles.container]}>
					<FlatList
						numColumns={2}
						data={photos.filter((photo) => photo.circuitId === filter || filter === null)}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<View style={styles.photoCardWrapper}>
								<PhotoCard photo={item}/>
							</View>
						)}
					/>
				</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		flex: 1
	},
	photoCardWrapper: {
		flex: 1 / 2,
		margin: 8
	}
});

export default MediaScreen;
