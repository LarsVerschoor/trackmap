import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { copyAsync, documentDirectory, deleteAsync } from 'expo-file-system';

const CircuitsContext = createContext(null);

function CircuitsProvider({children}) {
	const [circuits, setCircuits] = useState(null);

	useEffect(() => {
		(async () => {
			if (!circuits) return;
			await AsyncStorage.setItem('circuits', JSON.stringify(circuits));
		})();
	}, [circuits]);

	async function loadCircuits () {
		const onlineCircuits = await loadOnlineCircuits();
		const localCircuits = await loadLocalCircuits();
		const mergedCircuits = mergeOnlineAndLocalCircuits(onlineCircuits, localCircuits);
		setCircuits(mergedCircuits);
	}

	async function loadOnlineCircuits() {
		try {
			const response = await fetch('http://192.168.1.152');
			if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	async function loadLocalCircuits() {
		const rawCircuits = await AsyncStorage.getItem('circuits');
		return !rawCircuits ? [] : JSON.parse(rawCircuits);
	}

	function mergeOnlineAndLocalCircuits(onlineCircuits, localCircuits) {
		return onlineCircuits.map((onlineCircuit) => {
			const localMatch = localCircuits.find((storedCircuit) => storedCircuit.id === onlineCircuit.id);
			return {
				...onlineCircuit,
				visited: localMatch?.visited || false,
				photos: localMatch?.photos || []
			}
		});
	}

	async function toggleVisited(id) {
		setCircuits((prev) => prev.map((circuit) => {
			if (circuit.id === id) circuit.visited = !circuit.visited;
			return circuit;
		}));
	}

	async function addPhoto(circuitId, uri, description) {
		const extension = uri.split('.').pop();
		const date = Date.now();
		const fileName = `${circuitId}_${date}.${extension}`;
		const destination = documentDirectory + fileName;

		await copyAsync({
			from: uri,
			to: destination
		});

		setCircuits((prev) => prev.map((circuit) => {
			if (circuit.id === circuitId) {
				circuit.photos.push({
					uri: destination,
					description,
					date: date
				});
			}
			return circuit;
		}));
	}

	function editPhoto(photo, newCircuitId, newDescription) {
		setCircuits((prevCircuits) => {
			return prevCircuits.map((circuit) => {
				let updatedPhotos = [...circuit.photos];

				if (photo.circuitId !== newCircuitId && circuit.id === photo.circuitId) {
					updatedPhotos = updatedPhotos.filter((p) => p.date !== photo.date);
				}

				if (circuit.id === photo.circuitId) {
					const index = updatedPhotos.findIndex((p) => p.date === photo.date);
					if (index !== -1) {
						updatedPhotos[index] = {
							...updatedPhotos[index],
							description: newDescription,
						};

						if (circuit.id !== newCircuitId) {
							updatedPhotos.splice(index, 1);
						}
					}
				}

				if (circuit.id === newCircuitId) {
					const exists = updatedPhotos.some((p) => p.date === photo.date);
					if (!exists) {
						updatedPhotos.push({ ...photo, description: newDescription, circuitId: newCircuitId });
					}
				}

				return {
					...circuit,
					photos: updatedPhotos,
				};
			});
		});
	}

	async function deletePhoto(circuitId, photoUri) {
		await deleteAsync(photoUri, { idempotent: true });

		setCircuits((prev) => prev.map((circuit) => {
			if (circuit.id !== circuitId) return circuit;
			return {
				...circuit,
				photos: circuit.photos.filter((photo) => photo.uri !== photoUri)
			}
		}));
	}

	return (
		<CircuitsContext.Provider value={{ circuits, loadCircuits, toggleVisited, addPhoto, editPhoto, deletePhoto }}>
			{children}
		</CircuitsContext.Provider>
	);
}

export { CircuitsContext, CircuitsProvider }