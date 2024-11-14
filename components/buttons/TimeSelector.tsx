import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";


export default function App() {
    const [showPicker, setShowPicker] = useState(false)
    const [selectedTime, setSelectedTime] = useState(new Date())

    const handleDateChange = (_event: any, selectedTime?: Date) => {

        if (selectedTime) {
            setSelectedTime(selectedTime);
            console.log(selectedTime)
        }
    }

    return (
        <View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setShowPicker(!showPicker)}>
                <Text style={{ marginRight: 7 }}>
                    nada
                </Text>
                <Ionicons name="calendar-number" size={15} color={'purple'} />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker

                    value={selectedTime}
                    onChange={handleDateChange}
                    mode="date"
                    display="default"
                />
            )}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    selectedTime: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro para o modal
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
});
