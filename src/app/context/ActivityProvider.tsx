import { createContext, useState } from "react";
import randomData from "../../data/dataList";

export const ActivityContext = createContext({})
const initialState: any = randomData

export default function ActivityProvider({ children }: any) {

    const [activity, setActivity] = useState(initialState)

    function createActivity({ theme, room, date }: { theme: string, room: number, date: Date }) {
        const newActivity = {
            id: Math.random(),
            theme: theme,
            room: room,
            date: date
        }
        setActivity([...activity, newActivity])
    }
    
    return (
        <ActivityContext.Provider value={{ createActivity, activity}}>
            {children}
        </ActivityContext.Provider>
    )
}