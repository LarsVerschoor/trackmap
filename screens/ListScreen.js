import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useContext, useEffect } from 'react';
import { CircuitsContext } from '../contexts/CircuitsContext';
import CircuitCard from '../components/CircuitCard';
import { ThemeContext } from '../contexts/ThemeContext';

function ListScreen() {
    const {circuits, loadCircuits} = useContext(CircuitsContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (circuits === null) loadCircuits();
    }, []);

    return (
        <View style={[theme.bgDark, styles.container]}>
            {
                circuits === null ?
                <Text style={[theme.text, styles.loading]}>Laden...</Text> :
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
        flex: 1
    },
    list: {
        padding: 16,
        gap: 16,
    },
    loading: {
        marginTop: 32,
        alignSelf: 'center',
        fontSize: 16
    }
});

export default ListScreen;