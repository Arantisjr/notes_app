import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { getNotes, deleteNote } from '../../services/api';
import NoteCard from '../../components/NoteCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Note } from '../../types';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotesListScreen() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { user, signOut } = useAuth();
    const router = useRouter();

    const loadNotes = async () => {
        try {
            const response = await getNotes();
            // Sort notes by updated_at date (newest first)
            const sortedNotes = response.data.sort((a: Note, b: Note) =>
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );
            setNotes(sortedNotes);
        } catch (error: any) {
            console.error('Load notes error details:', error);
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Failed to load notes. Please pull down to refresh.'
            );
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    // Reload notes when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            loadNotes();
        }, [])
    );

    const handleDeleteNote = async (id: number) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log('Delete cancelled')
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteNote(id);
                            // Remove the note from local state immediately
                            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
                            Alert.alert('Success', 'Note deleted successfully');
                        } catch (error: any) {
                            console.error('Delete note error details:', error);
                            Alert.alert(
                                'Error',
                                error.response?.data?.error || 'Failed to delete note. Please try again.'
                            );
                        }
                    },
                },
            ]
        );
    };

    const handleRefresh = () => {
        setRefreshing(true);
        loadNotes();
    };

    const formatNoteCount = (count: number) => {
        if (count === 0) return 'No notes';
        if (count === 1) return '1 note';
        return `${count} notes`;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Ionicons name="document-text" size={24} color="#007AFF" />
                    <Text style={styles.title}>My Notes</Text>
                    <Text style={styles.noteCount}>{formatNoteCount(notes.length)}</Text>
                </View>

                <TouchableOpacity
                    onPress={signOut}
                    style={styles.logoutButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                </TouchableOpacity>
            </View>

            {/* Notes List */}
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NoteCard
                        note={item}
                        onPress={() => router.push(`/(tabs)/editor?id=${item.id}`)}
                        onDelete={() => handleDeleteNote(item.id)}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#007AFF']}
                        tintColor={'#007AFF'}
                    />
                }
                contentContainerStyle={notes.length === 0 ? styles.emptyListContainer : styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No notes yet</Text>
                        <Text style={styles.emptySubtext}>
                            Tap the + button below to create your first note
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(tabs)/editor')}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    noteCount: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    logoutButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#fff0f0',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 80, // Space for FAB
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    separator: {
        height: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});