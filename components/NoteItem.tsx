import { Text, View, StyleSheet } from "react-native";
import React from "react";

const NoteItem = (props: { note: string }) => {
    return (
        <View style={styles.noteItem}>
            <Text style={styles.noteText}>
                {props.note}  {/* Fixed: using props.note instead of note.text */}
            </Text>
        </View>
    );
};
export default NoteItem



const styles = StyleSheet.create({
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
    },
    noteText: {
        fontSize: 16,
    },
})