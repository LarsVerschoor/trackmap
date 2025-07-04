import { createContext, useState } from 'react';

const CircuitsContext = createContext(null);

function CircuitsProvider({children}) {
	const [circuits, setCircuits] = useState(null);

	async function loadCircuits () {
		try {
			const response = await fetch('http://192.168.1.152');
			if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
			setCircuits(await response.json());
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<CircuitsContext.Provider value={{ circuits, loadCircuits }}>
			{children}
		</CircuitsContext.Provider>
	)
}

export { CircuitsContext, CircuitsProvider }