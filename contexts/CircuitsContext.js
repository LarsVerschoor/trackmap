import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { copyAsync, documentDirectory } from 'expo-file-system';

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
		const fileName = `${circuitId}_${Date.now()}.${extension}`;
		const destination = documentDirectory + fileName;

		await copyAsync({
			from: uri,
			to: destination
		});

		setCircuits((prev) => prev.map((circuit) => {
			if (circuit.id === circuitId) {
				circuit.photos.push({
					uri: destination,
					description
				});
			}
			return circuit;
		}));
	}

	return (
		<CircuitsContext.Provider value={{ circuits, loadCircuits, toggleVisited, addPhoto }}>
			{children}
		</CircuitsContext.Provider>
	);
}

export { CircuitsContext, CircuitsProvider }