import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { format } from 'date-fns';

type Props = {
    theme: string
    room: number
    date: Date
    time: Date
}

export default function Activity(props: Props) {
    const [checked, setChecked] = useState(false)

    const date = moment(props.date).format('DD MMM')

    const formattedTime = `${format(props.time, 'HH')}h`

    const doneStyle: any = checked ? {
        textDecorationLine: 'line-through',
        color: '#861586'
    } : {}

    return (
        <View style={styles.container}>
            <View style={styles.checkBoxContainer}>
                <View style={styles.checkboxBase}>
                    <Pressable
                        role="checkbox"
                        aria-checked={checked}
                        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
                        onPress={() => setChecked(!checked)}>
                        {checked && <FontAwesome name="check" size={16} color="white" />}
                    </Pressable>
                </View>
            </View>

            <View style={{ flex: 1}}>
                <Text style={[styles.title, doneStyle]}>{props.theme}</Text>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'space-between'}} >
                    <Text style={ styles.subtitle}>{props.room} {formattedTime}</Text>
                    <Text style={[{marginRight: 10}, styles.subtitle]}>{date}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        marginBottom: 7,
        paddingVertical: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 16,
        color: '#2b2b2b'
    },
    subtitle: {
        
        fontSize: 12,
        color: '#7c808f'
    },
    checkBoxContainer: {
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    checkboxChecked: {
        backgroundColor: '#861586',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkboxBase: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 21,
        height: 21,
        borderRadius: 10.5,
        borderWidth: 1,
        borderColor: '#7c808f'
    }
})
