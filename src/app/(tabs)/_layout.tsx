import { Tabs } from "expo-router";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                // show tab bar
                height: 50
            }
        }}>
            <Tabs.Screen name="index" options={{
                headerShown: false, 
                tabBarLabel: 'Classes',
                tabBarIcon: ({focused, color}) => (
                    <Icon name={focused ? 'list' : 'list'} 
                    color={color} 
                    size={24}/>
                )
            }} />
            <Tabs.Screen name="progress" options={{ 
                headerShown: false, 
                tabBarLabel: 'Scheduling', 
                tabBarIcon: ({ focused, color}) => (
                    <Icon name={focused ? 'calendar-today' : 'calendar-today'} 
                    color={color} 
                    size={24}/>
                )
                }} />
        </Tabs>
    )
}