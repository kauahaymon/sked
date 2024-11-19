import { createContext, useEffect, useState } from "react";
import randomData from "../../data/dataList";
export const ActivityContext = createContext({})
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseJSON } from "date-fns";

export default function ActivityProvider({ children }: any) {

    const initialState: any = []
    const [activity, setActivity] = useState(initialState)

    function createActivity({ theme, room, date, time }: { theme: string, room: string, date: Date, time: Date }) {
        const newActivity = {
            id: Math.random(),
            theme: theme,
            room: room,
            date: date,
            time: time
        }
        const updatedState = [...activity, newActivity]
        setActivity(updatedState)
        storeDataList(updatedState)
    }

    function deleteActivity(id: number) {
        const updatedState = activity.filter((activity: any) => activity.id !== id)
        setActivity(updatedState)
        storeDataList(updatedState)
    }

    const storeDataList = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('dataList', jsonValue)
        } catch (error) {
            console.error('Failed saving data: ', error)
        }
    }

    const getDataList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('dataList')
            if (jsonValue !== null) {
                const parsedData = JSON.parse(jsonValue)
                setActivity(parsedData)
                return parsedData
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getDataList()
    }, [])

    return (
        <ActivityContext.Provider value={{ createActivity, activity, getDataList, deleteActivity }}>
            {children}
        </ActivityContext.Provider>
    )
}