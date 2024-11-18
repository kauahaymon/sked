import React, { useContext, useRef, useState, useEffect } from "react"
import { ToastAndroid, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView, Button } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { ActivityContext } from "./context/ActivityProvider"
import { Ionicons } from "@expo/vector-icons";
import { format } from 'date-fns';

type Props = {
    isVisible: boolean;
    onCancel: VoidFunction;
}


export default function FormScreen(props: Props) {

    const { createActivity }: any = useContext(ActivityContext)
    const [room, setRoom] = useState('Room')
    const [theme, setTheme] = useState('')
    const [date, setDate] = useState(new Date())
    const [displayedDate, setDisplayedDate] = useState('Today')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [displayedTime, setDisplayedTime] = useState('Time')
    const [showAddRoomModal, setShowAddRoomModal] = useState(false)

    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (props.isVisible && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [props.isVisible])

    function RoomSelector() {
        return (
            <TouchableOpacity style={style.optionButton} onPress={() => setShowMenu(!showMenu)}>
                <Text>Room</Text>
            </TouchableOpacity>
        )

    }

    function DatePicker() {

        const handleDateChange = (_event: any, selectedDate?: Date) => {
            setShowDatePicker(false)
            if (selectedDate) {
                const today = new Date()
                const formattedDate = moment(selectedDate).format('DD MMM')
                setDate(selectedDate)
                if (selectedDate.toDateString() === today.toDateString()) {
                    setDisplayedDate('Today')
                } else {
                    setDisplayedDate(formattedDate)
                }
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
                    <TouchableOpacity style={style.optionButton} onPress={() => setShowDatePicker(!showDatePicker)}>
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
                console.log('hora: ' + selectedTime)
                const formattedTime = `${format(selectedTime, 'HH')}h`
                setDisplayedTime(formattedTime)
                setTime(selectedTime)
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
                        style={style.optionButton}
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
        setRoom('Room')
        setDisplayedDate('Today')
        setDisplayedTime('Time')
    }

    const handleAddActivity = () => {
        console.log(room)
        if (theme.trim() !== '' && room !== 'Room') {
            createActivity({ theme, room, date, time })
            console.log()
            console.log(date)
            props.onCancel()
            handleReset()
        } else {
            ToastAndroid.show("Fill the blanks", ToastAndroid.SHORT)
        }
    }

    return (
        <View>
            <Modal transparent={true} visible={props.isVisible} onRequestClose={handleReset} animationType="fade">
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={style.overlay}>
                        <KeyboardAvoidingView
                            style={[style.modalView, { height: showTimePicker ? 121 : 120 }]}
                            behavior={Platform.OS === 'ios' ? 'padding' : "height"}
                            enabled >
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
                                        <RoomSelector />
                                        <DatePicker />
                                        <TimePiker />
                                        {showMenu && <View style={{ position: 'absolute', bottom: 40, height: 150, width: 150, backgroundColor: 'plum', elevation: 5}}></View>}
                                    </View>
                                    <TouchableOpacity style={style.add} onPress={handleAddActivity}>
                                        <Ionicons name="arrow-up-sharp" size={25} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                            <Modal visible={showAddRoomModal}>
                                <View style={style.overlay}>

                                </View>
                            </Modal>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View >
    )
}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalView: {
        height: 120,
        backgroundColor: 'white',
        width: '100%', 
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
    },
    modalContent: {
        flex: 1
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        marginHorizontal: 1,
        borderColor: 'gray',
        backgroundColor: '#f5f5f5',
        height: 55,
        fontSize: 15,
        borderRadius: 6,
        paddingStart: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
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
        borderRadius: 25
    }
})
