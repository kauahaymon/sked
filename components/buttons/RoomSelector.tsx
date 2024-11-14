import { TouchableOpacity, View, Text, StyleProp, ViewStyle } from "react-native";

type Props = {
    style: any
    onRoomSelect: (room: string) => void
}

export default function RoomSelector({ style, onRoomSelect }: Props) {
    return (
        <View>
            <TouchableOpacity style={style} onPress={() => onRoomSelect('Cinema')} >
                <Text>room</Text>
            </TouchableOpacity>
        </View>
    )
}