import { FlatList,  View } from "react-native";
import React from "react";
import NoteItem from "./NoteItem";

interface Note {
    id: number;
    text: string;
}

interface NoteListProps {
    notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
    return (
        <View>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NoteItem note={item.text} />
                )}
            />
        </View>
    );
};

export default NoteList;

