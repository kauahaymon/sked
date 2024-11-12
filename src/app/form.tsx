import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import RoomSelection from "../components/RoomSelection";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ActivityContext } from "./context/ActivityProvider";

type Props = {
    isVisible: boolean
    onCancel: VoidFunction
}

export default function FormScreen(props: Props) {

    const { createActivity }: any = useContext(ActivityContext)
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const addActivity = () => {
        createActivity(theme, 123, date)
    }

    function TimePicker() {
        const formattedDate = moment(date).format('DD');

        const handleDateChange = (_event: any, selectedDate?: Date) => {
            setShowDatePicker(false)
            if (selectedDate) setDate(selectedDate)
        }

        let datePicker = <DateTimePicker
            value={date}
            onChange={handleDateChange}
            mode="date"
            display="default"
        />

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={style.button}>
                    <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
                        <Text>{formattedDate}</Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker;
    };

    return (
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Modal
                transparent={true}
                visible={props.isVisible}
                onRequestClose={props.onCancel}
                animationType="fade"
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={props.onCancel}>
                    <View style={style.overlay}>
                        <Pressable style={style.modalView}>
                            <View >
                                <TextInput
                                    style={style.input}
                                    placeholder="Insira o tema da aula"
                                    value={theme}
                                    onChangeText={setTheme}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                </View>
                            </View>
                        </Pressable>

                    </View>
                </TouchableOpacity>

            </Modal>
        </View>
    );
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
        paddingBottom: 5,
        width: '100%',
        height: '30%'

    },
    input: {
        marginTop: 19,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        height: 55,
        borderRadius: 6,
        paddingStart: 12
    },
    button: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10
    },
});
