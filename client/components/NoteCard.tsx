import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Note } from '../types';

interface NoteCardProps {
    note: Note;
    onPress: () => void;
    onDelete: () => void;
}

const NoteCard = ({ note, onPress, onDelete }: NoteCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {note.title}
                </Text>
                {note.content ? (
                    <Text style={styles.preview} numberOfLines={2}>
                        {note.content}
                    </Text>
                ) : (
                    <Text style={styles.placeholder}>No content</Text>
                )}
                <Text style={styles.date}>
                    {formatDate(note.updated_at)}
                </Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    preview: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    placeholder: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    deleteButton: {
        padding: 10,
    },
    deleteText: {
        fontSize: 24,
        color: '#ff3b30',
        fontWeight: 'bold',
    },
});

export default NoteCard;