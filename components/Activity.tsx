import React, { useContext, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { format } from 'date-fns';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityContext } from "../app/context/ActivityProvider";
import { Colors } from "react-native/Libraries/NewAppScreen";

type Props = {
    id: any
    theme: string
    room: number
    date: Date
    time: Date
}

export default function Activity(props: Props) {
    const [checked, setChecked] = useState(false)
    const { deleteActivity }: any = useContext(ActivityContext)
    const date = moment(props.date).format('DD MMM')
    const formattedTime = `${format(props.time, 'HH')}h`
    const openSwipeableRef = useRef<SwipeableMethods | null>(null)


    const doneStyle: any = checked ? {
        textDecorationLine: 'line-through',
        color: '#861586'
    } : {}

    const handleDeleteActivity = () => {
        Alert.alert('Delete class?', '', [
            {
                text: 'Cancel',
            },
            {
                text: 'Ok', onPress() { deleteActivity(props.id) }
            }
        ])
    }

    const getRightContent = () => (
        <TouchableOpacity style={styles.rightContent} onPress={handleDeleteActivity}>
            <Icon name="delete" color={'white'} size={22} />
        </TouchableOpacity>
    )

    const getLeftContent = () => (
        <TouchableOpacity style={styles.LeftContent}>
            <Icon name="done" color={'white'} size={22} />
        </TouchableOpacity>
    )

    const onSwipeableWillOpen = (direction: 'left' | 'right', current: SwipeableMethods | null) => {
        if (direction === 'left') {
            console.warn('Done')
        }
        if (openSwipeableRef.current && openSwipeableRef.current !== current) {
            openSwipeableRef.current.close()
        }
        openSwipeableRef.current = current
    }

    let currentSwiped: SwipeableMethods | null = null

    return (
        <Swipeable renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            ref={swipeable => { currentSwiped = swipeable }}
            friction={1}
            containerStyle={{ borderRadius: 10 }}
            dragOffsetFromRightEdge={15}
            overshootFriction={50}
            onSwipeableWillOpen={(direction) => onSwipeableWillOpen(direction, currentSwiped)}
        >
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

                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, doneStyle]}>{props.theme}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'space-between' }} >
                        <Text style={styles.subtitle}>{props.room} {formattedTime}</Text>
                        <Text style={[{ marginRight: 10 }, styles.subtitle]}>{date}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        marginBottom: 7,
        paddingVertical: 10,
        borderRadius: 10,
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
    },
    rightContent: {
        height: 60,
        width: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 14,
        borderTopRightRadius: 14
    },
    LeftContent: {
        flex: 1,
        height: 60,
        width: 50,
        backgroundColor: '#36df00',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        borderRadius: 14,
    }
})
