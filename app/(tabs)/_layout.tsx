import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                // show tab bar
                height: 0
            }
        }}>
            <Tabs.Screen name="index" options={{
                headerShown: false, 
                tabBarLabel: 'Atividades',
                tabBarIcon: ({focused, color}) => (
                    <FontAwesome name={focused ? 'tasks' : 'tasks'} 
                    color={color} 
                    size={24}/>
                )
            }} />
            <Tabs.Screen name="progress" options={{ 
                headerShown: false, 
                tabBarLabel: 'Progresso', 
                tabBarIcon: ({focused, color}) => (
                    <Ionicons name={focused ? 'stats-chart' : 'stats-chart-sharp'} 
                    color={color} 
                    size={24}/>
                )
                }} />
        </Tabs>
    )
}