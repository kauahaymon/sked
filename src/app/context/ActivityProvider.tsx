import { createContext, useState } from "react";
import randomData from "../../data/dataList";

export const ActivityContext = createContext({})
const initialState: any = randomData

export default function ActivityProvider({ children }: any) {

    const [activity, setActivity] = useState(initialState)

    function createActivity({ theme, room, date }: { theme: string, room: number, date: Date }) {
        const act = [...initialState]
        act.push({
            id: Math.random(),
            theme: theme,
            room: room,
            date: date
        })
        setActivity([...activity, act])
    }

    return (
        <ActivityContext.Provider value={{ initialState, createActivity, activity}}>
            {children}
        </ActivityContext.Provider>
    )
}