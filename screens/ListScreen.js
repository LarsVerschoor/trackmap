import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useContext, useEffect } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import CircuitCard from '../components/CircuitCard';

function ListScreen() {
    const {circuits, loadCircuits} = useContext(CircuitsContext);

    useEffect(() => {
        if (circuits === null) loadCircuits();
    }, []);

    return (
        <View style={styles.container}>
            {
                circuits === null ?
                <Text style={{color: '#ffffff'}}>Loading...</Text> :
                <FlatList
                    contentContainerStyle={styles.list}
                    data={circuits}
                    renderItem={({ item }) => <CircuitCard circuit={item}/>}
                />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    list: {
        padding: 16,
        gap: 16
    }
});

export default ListScreen;