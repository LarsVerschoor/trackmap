import { View, Image, StyleSheet } from 'react-native';

function PhotoCard({ photo }) {
	console.log(photo);
	return (
		<View>
			<Image source={{ uri: photo.uri }} style={styles.image}/>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		aspectRatio: 1,
		resizeMode: 'contain'
	}
});

export default PhotoCard;