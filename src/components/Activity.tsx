import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";

type Props = {
    theme: string
    description: string
}

export default function Activity(props: Props) {
    const [checked, setChecked] = useState(false)

    const doneStyle: any = checked ? {
        textDecorationLine: 'line-through',
        color: 'gray'
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
                        {checked && <FontAwesome name="check" size={16} color="white"/>}
                    </Pressable>
                </View>
            </View>

            <View>
                <Text style={[styles.text, doneStyle]}>{props.theme}</Text>
                <Text style={[styles.text, doneStyle]}>{props.description}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    text: {
        fontSize: 16
    },
    checkBoxContainer: {
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    checkboxChecked: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkboxBase: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1
    }
})
