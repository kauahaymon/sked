import React, { useContext, useRef, useState, useEffect } from "react"
import { ToastAndroid, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { ActivityContext } from "./context/ActivityProvider"
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type Props = {
    isVisible: boolean;
    onCancel: VoidFunction;
}

export default function FormScreen(props: Props) {

    const { createActivity }: any = useContext(ActivityContext)
    const [theme, setTheme] = useState('')
    const [date, setDate] = useState(new Date())
    const [displayedDate, setDisplayedDate] = useState('Date')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (props.isVisible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [props.isVisible])

    function TimePicker() {
        const formattedDate = moment(date).format('DD/MM');

        const handleDateChange = (_event: any, selectedDate?: Date) => {
            setShowDatePicker(false)
            if (selectedDate) {
                setDate(selectedDate);
                setDisplayedDate(formattedDate)
            }
        }

        let datePicker = <DateTimePicker
            value={date}
            onChange={handleDateChange}
            mode="date"
            display="default"
        />;

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text>{displayedDate}</Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            );
        }

        return datePicker;
    }

    function handleReset() {
        props.onCancel()
        setTheme('')
        setDate(new Date())
        setDisplayedDate('Date')
    }

    const handleAddActivity = () => {
        if (theme.trim()) {
            createActivity({ theme, room: 103, date })
            props.onCancel()
            handleReset()
        } else {
            ToastAndroid.show("Fill the blanks", ToastAndroid.SHORT)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                transparent={true}
                visible={props.isVisible}
                onRequestClose={handleReset}
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
                                <View style={style.inputContainer}>
                                    <TextInput
                                        ref={inputRef}
                                        style={style.input}
                                        placeholder="Enter a new class topic here"
                                        value={theme}
                                        onChangeText={setTheme}
                                        onFocus={() => { }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={style.optionsContainer}>
                                        <TouchableOpacity style={style.optionButton} onPress={undefined}>
                                            <Text>Room</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.optionButton} onPress={undefined}>
                                            <TimePicker />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.optionButton} onPress={undefined}>
                                            <Text>Time</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={style.add} onPress={handleAddActivity}>
                                        <Ionicons name="arrow-up-sharp" size={25} color={'white'} />
                                    </TouchableOpacity>
                                </View>
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
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        height: 122,
    },
    modalContent: {
        flex: 1,
        marginTop: 15
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 200,
        marginLeft: 15,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 1,
    },
    input: {
        borderWidth: 1,
        marginHorizontal: 15,
        borderColor: 'gray',
        backgroundColor: '#f5f5f5',
        height: 55,
        fontSize: 15,
        borderRadius: 6,
        paddingStart: 12,
    },
    optionButton: {
        backgroundColor: '#d9d9d9',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 10
    },
    add: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7cad82',
        marginRight: 10,
        borderRadius: 25
    }
})
