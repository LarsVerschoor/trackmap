import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useContext, useEffect, useState } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import * as Location from 'expo-location';

function MapScreen({ route }) {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const { circuits, loadCircuits } = useContext(CircuitsContext);

    useEffect(() => {
        if (circuits === null) loadCircuits();
        let locationSubscription;

        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Foreground location permission denied by user');
                return;
            }

            const lastKnownLocation = await Location.getLastKnownPositionAsync();
            if (lastKnownLocation) setLocation(lastKnownLocation);

            const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setLocation(currentLocation);

            locationSubscription = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 5, distanceInterval: 0 }, (location) => {
                setLocation(location);
            });
        })();

        return () => {
            if (locationSubscription) locationSubscription.remove();
        }
    }, []);

    useEffect(() => {
        (() => {
            if (!route.params?.region && location === null) return;
            if (route.params?.region) {
                setRegion(route.params?.region);
                return;
            }
            if (region) return;
            const { latitude, longitude } = location.coords;
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            });
        })();
    }, [route.params?.region, location]);

    return (
        <View>
            <MapView style={ styles.map } showsUserLocation={true} showsMyLocationButton={true} region={region}>
                {
                    circuits !== null &&
                    circuits.map((circuit) => (
                        <Marker
                            key={circuit.id}
                            coordinate={{ latitude: circuit.location.latitude, longitude: circuit.location.longitude }}
                            title={circuit.name}
                        />
                    ))
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
});

export default MapScreen;