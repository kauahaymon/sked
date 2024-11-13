import React, { useContext, useRef, useState, useEffect } from "react"
import { ToastAndroid, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { ActivityContext } from "./context/ActivityProvider"

type Props = {
    isVisible: boolean;
    onCancel: VoidFunction;
}

export default function FormScreen(props: Props) {

    const { createActivity }: any = useContext(ActivityContext);
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (props.isVisible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100);
        }
    }, [props.isVisible])

    function TimePicker() {
        const formattedDate = moment(date).format('DD/MM/YYYY');

        const handleDateChange = (_event: any, selectedDate?: Date) => {
            setShowDatePicker(false)
            if (selectedDate) setDate(selectedDate)
        }

        let datePicker = <DateTimePicker
            value={date}
            onChange={handleDateChange}
            mode="date"
            display="default"
        />;

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={style.button}>
                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text>{formattedDate}</Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            );
        }

        return datePicker;
    }

    const handleAddActivity = () => {
        if (theme.trim()) {
            createActivity({ theme, room: 103, date })
            props.onCancel()
        } else {
            ToastAndroid.show("Fill the blanks", ToastAndroid.SHORT)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                transparent={true}
                visible={props.isVisible}
                onRequestClose={props.onCancel}
                animationType="fade"
            >
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={style.overlay}>
                        <KeyboardAvoidingView
                            style={style.modalView}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            enabled
                        >
                            <Pressable style={style.modalContent} onPress={() => { }}>

                                <TextInput
                                    ref={inputRef}
                                    style={style.input}
                                    placeholder="Enter a new class"
                                    value={theme}
                                    onChangeText={setTheme}
                                    onFocus={() => { }}
                                />
                                <TimePicker />
                                <TouchableOpacity onPress={handleAddActivity} style={style.button}>
                                    <Text>Adicionar Atividade</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        height: 200,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginTop: 19,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        height: 55,
        borderRadius: 6,
        paddingStart: 12,
        width: '100%',
    },
    button: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
})
