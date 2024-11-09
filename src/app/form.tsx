import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

type Props = {
    isVisible: boolean
    onCancel: VoidFunction
}

export default function FormScreen(props: Props) {
    return (
        <View>
            <StatusBar style="dark" backgroundColor="rgba(0, 0, 0, 0.7)" />
            <Modal transparent={true}
                visible={props.isVisible}
                onRequestClose={props.onCancel}
                animationType="slide"

            >
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={style.overlay}></View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                </View>
            </Modal>
        </View>

    );
}

const style = StyleSheet.create({
    overlay: {
        flex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        flex: 4,
        backgroundColor: 'white',
        paddingBottom: 5
    }
})