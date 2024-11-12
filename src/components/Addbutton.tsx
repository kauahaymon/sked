import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
    show: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddButton(props: Props) {
    return (
        <TouchableOpacity
            style={style.button}
            onPress={() => props.show(rev => !rev)}
            activeOpacity={0.83}
        >
            <FontAwesome name="plus" size={20} color={'white'} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 30,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#8226b6',
        alignItems: 'center',
        justifyContent: 'center'
    }
})