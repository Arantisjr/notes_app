import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { createNote, updateNote, getNote } from '../../services/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NoteEditorScreen() {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            loadNote();
        }
    }, [id]);

    useEffect(() => {
        // Check if there are changes to enable/disable save button
        setHasChanges(title.trim().length > 0 || content.trim().length > 0);
    }, [title, content]);

    const loadNote = async () => {
        try {
            const response = await getNote(Number(id));
            const note = response.data;
            setTitle(note.title);
            setContent(note.content || '');
        } catch (error: any) {
            Alert.alert('Error', 'Failed to load note');
            console.error('Load note error:', error);
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Title is required');
            return;
        }

        setIsSaving(true);
        try {
            if (id) {
                await updateNote(Number(id), title, content);
                Alert.alert('Success', 'Note updated successfully');
            } else {
                await createNote(title, content);
                Alert.alert('Success', 'Note created successfully');
            }

            // Wait a moment before going back to show the success message
            setTimeout(() => {
                router.back();
            }, 1000);

        } catch (error: any) {
            console.error('Save error details:', error);
            Alert.alert(
                'Error',
                error.response?.data?.error || 'Failed to save note. Please try again.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleBack = () => {
        if (hasChanges) {
            Alert.alert(
                'Unsaved Changes',
                'You have unsaved changes. Are you sure you want to go back?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Discard', style: 'destructive', onPress: () => router.back() }
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBack}
                    style={styles.backButton}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    {id ? 'Edit Note' : 'New Note'}
                </Text>

                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isSaving || !hasChanges}
                    style={[
                        styles.saveButton,
                        (isSaving || !hasChanges) && styles.saveButtonDisabled
                    ]}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    {isSaving ? (
                        <Ionicons name="refresh" size={20} color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save</Text>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Title Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Note title..."
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                        maxLength={255}
                        autoFocus={!id}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <Text style={styles.charCount}>
                        {title.length}/255
                    </Text>
                </View>

                {/* Content Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.contentInput}
                        placeholder="Start typing your thoughts here..."
                        placeholderTextColor="#999"
                        value={content}
                        onChangeText={setContent}
                        multiline
                        textAlignVertical="top"
                        scrollEnabled={false}
                        numberOfLines={10}
                        minHeight={200}
                    />
                    <Text style={styles.charCount}>
                        {content.length} characters
                    </Text>
                </View>

                {/* Save Button at bottom for easy access */}
                {hasChanges && (
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={isSaving}
                        style={[
                            styles.floatingSaveButton,
                            isSaving && styles.saveButtonDisabled
                        ]}
                    >
                        <Text style={styles.floatingSaveButtonText}>
                            {isSaving ? 'Saving...' : 'Save Note'}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    backText: {
        color: '#007AFF',
        fontSize: 16,
        marginLeft: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#ccc',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        marginBottom: 24,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 8,
    },
    contentInput: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        textAlignVertical: 'top',
        minHeight: 200,
    },
    charCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },
    floatingSaveButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    floatingSaveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});