import React, { useContext, useRef, useState, useEffect } from "react"
import { ToastAndroid, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, KeyboardAvoidingView } from "react-native"
import DateTimePicker, { TimePickerOptions } from '@react-native-community/datetimepicker'
import moment from 'moment'
import { ActivityContext } from "./context/ActivityProvider"
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Room from "../components/buttons/RoomSelector"
import RoomSelector from "../components/buttons/RoomSelector"


type Props = {
    isVisible: boolean;
    onCancel: VoidFunction;
}


export default function FormScreen(props: Props) {

    const { createActivity }: any = useContext(ActivityContext)
    const [room, setRoom] = useState('')
    const [theme, setTheme] = useState('')
    const [date, setDate] = useState(new Date())
    const [displayedDate, setDisplayedDate] = useState('Today')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [displayedTime, setDisplayedTime] = useState('Time')


    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (props.isVisible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [props.isVisible])

    function DatePicker() {
        const formattedDate = moment(date).format('DD/MM');

        const handleDateChange = (_event: any, selectedDate?: Date) => {
            setShowDatePicker(false)
            if (selectedDate) {
                setDate(selectedDate);
                setDisplayedDate(moment(selectedDate).format('DD/MM'));
            }
        }

        let datePicker = <DateTimePicker
            value={date}
            onChange={handleDateChange}
            mode="date"
            display="calendar"
        />

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text style={{ marginRight: 7 }}>
                            {displayedDate}
                        </Text>
                        <Ionicons name="calendar-number" size={15} color={'purple'} />
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker;
    }

    function TimePiker() {
        const handleTimeChange = (_event: any, selectedTime?: Date) => {
            setShowTimePicker(false)
            if (selectedTime) {
                selectedTime.setMinutes(0)
                selectedTime.setSeconds(0)
                selectedTime.setMilliseconds(0)
                const formattedTime = format(selectedTime, 'HH:mm')
                setTime(selectedTime)
                setDisplayedTime(formattedTime)
                console.log(formattedTime)
            }
        }

        let timePicker = <DateTimePicker
            value={time}
            onChange={handleTimeChange}
            mode="time"
            display="spinner"
        />

        if (Platform.OS === 'android') {
            return timePicker = (
                <View>
                    <TouchableOpacity onPress={() => setShowTimePicker(!showTimePicker)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={{ marginRight: 7 }}>
                            {displayedTime}
                        </Text>
                        <Ionicons name="time" size={17} color={'purple'} />
                    </TouchableOpacity>
                    {showTimePicker && timePicker}
                </View>
            )
        }
    }

    function handleReset() {
        props.onCancel()
        setTheme('')
        setDate(new Date())
        setDisplayedDate('Date')
        setDisplayedTime('Time')
    }

    const handleAddActivity = () => {
        if (theme.trim()) {
            createActivity({ theme, room, date })
            props.onCancel()
            handleReset()
        } else {
            ToastAndroid.show("Fill the blanks", ToastAndroid.SHORT)
        }
    }

    return (
        <View>
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
                                        <RoomSelector style={style.optionButton} onRoomSelect={(room: string) => setRoom(room)}/>
                                        <TouchableOpacity style={style.optionButton} onPress={undefined}>
                                            {DatePicker()}
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.optionButton} onPress={undefined}>
                                            {TimePiker()}
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
