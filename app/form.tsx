import React, { useContext, useRef, useState, useEffect } from "react"
import { ToastAndroid, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView, Button, FlatList, TouchableHighlight, VirtualizedList } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { ActivityContext } from "./context/ActivityProvider"
import { Ionicons } from "@expo/vector-icons";
import { format } from 'date-fns';


type Props = {
    isVisible: boolean;
    onCancel: VoidFunction;
}


export default function FormScreen({isVisible, onCancel}: Props) {

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
    const [roomList, setRoomList] = useState([
        { id: 1, title: 'Cimena' },
        { id: 2, title: 'Smart Lab' },
        { id: 3, title: 'Cooking' },
    ])
    const [newRoom, setNewRoom] = useState('')

    const classInputRef = useRef<TextInput>(null);
    const roomInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                classInputRef.current?.focus();
                roomInputRef.current?.focus()
            }, 200);
        }
    }, [isVisible]);


    function RoomSelector() {
        return (
            <TouchableOpacity style={style.optionButton} onPress={() => setShowMenu(!showMenu)}>
                <Text>{room}</Text>
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
                    <TouchableOpacity style={style.optionButton} onPress={() => {
                        setShowDatePicker(!showDatePicker)
                        setShowMenu(false)
                    }}>
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
            themeVariant="light"
        />

        if (Platform.OS === 'android') {
            return timePicker = (
                <View>
                    <TouchableOpacity onPress={() => {
                        setShowTimePicker(!showTimePicker)
                        setShowMenu(false)
                    }}
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
        onCancel()
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
            onCancel()
            handleReset()
        } else {
            ToastAndroid.show("Fill the blanks", ToastAndroid.SHORT)
        }
    }

    const addNewRoom = () => {
        roomList.push(
            { id: Math.random(), title: newRoom }
        )
        setShowAddRoomModal(false)
        setRoom(newRoom)
        setNewRoom('')
    }

    return (
        <View>
            <Modal transparent={true} visible={isVisible} onRequestClose={handleReset} animationType="fade">
                <TouchableWithoutFeedback onPress={() => {
                    onCancel()
                    setShowMenu(false)
                    handleReset()
                }}>
                    <View style={style.overlay}>
                        <KeyboardAvoidingView
                            style={style.modalView}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            enabled
                        >
                            <Pressable style={style.modalContent} onPress={() => setShowMenu(false)}>
                                <View style={style.inputContainer}>
                                    <TextInput
                                        ref={classInputRef}
                                        style={style.input}
                                        placeholder="Enter a new class topic here"
                                        value={theme}
                                        onChangeText={setTheme}
                                        onPress={() => setShowMenu(false)}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={style.optionsContainer}>
                                        <RoomSelector />
                                        <DatePicker />
                                        <TimePiker />
                                    </View>

                                    <TouchableOpacity style={style.add} onPress={handleAddActivity}>
                                        <Ionicons name="arrow-up-sharp" size={25} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                            {showMenu && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 46,
                                        left: 10,
                                        width: 180,
                                        backgroundColor: 'white',
                                        elevation: 5,
                                        borderRadius: 8,
                                        padding: 5,
                                        height: 150,
                                    }}
                                >
                                    <FlatList
                                        style={{ backgroundColor: 'lightgray' }}
                                        keyboardShouldPersistTaps="handled"
                                        scrollEnabled={true}
                                        data={roomList}
                                        keyExtractor={(index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                style={{
                                                    padding: 10,
                                                    backgroundColor: 'white',
                                                }}
                                                onPress={() => {
                                                    setRoom(item.title)
                                                    setShowMenu(false)
                                                }}
                                            >
                                                <Text>{item.title}</Text>
                                            </TouchableOpacity>
                                        )}
                                        ListFooterComponent={() => (
                                            <TouchableOpacity
                                                style={{
                                                    padding: 10,
                                                    backgroundColor: 'white',
                                                    alignItems: 'flex-start',
                                                }}
                                                onPress={() => {
                                                    setShowAddRoomModal(!showAddRoomModal);
                                                    setShowMenu(!showMenu);
                                                }}
                                            >
                                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>+ Add New</Text>
                                            </TouchableOpacity>
                                        )}
                                    />

                                </View>
                            )}
                        </KeyboardAvoidingView>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Segundo Modal  */}
            <Modal transparent visible={showAddRoomModal} onRequestClose={() => setShowAddRoomModal(false)} animationType="fade">
                <TouchableWithoutFeedback onPress={() => {
                    setShowAddRoomModal(false)
                    setNewRoom('')
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Add New Room</Text>
                            <TextInput
                                ref={roomInputRef}
                                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
                                placeholder="Ex.: 102"
                                value={newRoom}
                                onChangeText={setNewRoom}
                                autoFocus={true}
                            />
                            <TouchableOpacity style={{ padding: 10, backgroundColor: '#007BFF' }} onPress={addNewRoom}>
                                <Text style={{ color: 'white' }}>Add Room</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowAddRoomModal(false)
                                setNewRoom('')
                            }}>
                                <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
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
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        minHeight: 120
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
