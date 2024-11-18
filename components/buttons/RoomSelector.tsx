import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';

type Props = {
    room: (name: string) => void;
};

export default function RoomSelector({ room }: Props) {
    const [roomList, setRoomList] = useState([
        { id: '1', label: 'Cinema' },
        { id: '2', label: 'Smart Lab' },
        { id: '3', label: 'Cooking' },
    ]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');

    const [displayedRoom, setDisplayedRoom] = useState('Room');

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (modalVisible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [!modalVisible])

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const openAddNewModal = () => {
        setMenuVisible(false);
        setModalVisible(true);
    };

    const addNewRoom = () => {
        if (newRoomName.trim()) {
            setRoomList([...roomList, { id: Date.now().toString(), label: newRoomName }]);
            setNewRoomName('')
            room(newRoomName)
            setModalVisible(!modalVisible)
            setDisplayedRoom(newRoomName)
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleMenu}>
                <Text style={styles.buttonText}>{displayedRoom}</Text>
            </TouchableOpacity>

            {menuVisible && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.menu} >
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={[...roomList, { id: 'add', label: '+ Add New' }]}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (item.id === 'add') {
                                            openAddNewModal()
                                        }
                                        else {
                                            setDisplayedRoom(item.label);
                                            setMenuVisible(false);
                                            room(item.label);
                                        }
                                    }}
                                >
                                    <Text style={item.id === 'add' ? styles.addNewText : styles.itemText}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </KeyboardAvoidingView>
            )}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalOverlay}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Add New Room</Text>
                                <TextInput
                                    ref={inputRef}
                                    style={styles.input}
                                    placeholder="Ex.: 102"
                                    value={newRoomName}
                                    onChangeText={setNewRoomName}
                                    onFocus={() => { }}
                                />
                                <TouchableOpacity style={styles.addButton} onPress={addNewRoom}>
                                    <Text style={styles.addButtonText}>Add Room</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: '#d9d9d9',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
    },
    menu: {
        position: 'absolute',
        bottom: 40,
        width: 150,
        paddingBottom: 5,
        paddingStart: 6,
        maxHeight: 150,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignSelf: 'flex-start',
    },
    addNewText: {
        color: '#3b82f6',
        fontWeight: 'bold',
        paddingTop: 3,
    },
    itemText: {
        color: '#2b2b2b',
        margin: 4,

    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelText: {
        color: '#3b82f6',
        fontSize: 16,
        marginTop: 10,
    },
});
