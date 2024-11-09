import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false, tabBarLabel: 'Atividades'}}/>
            <Tabs.Screen name="progress" options={{ headerShown: false, tabBarLabel: 'Progresso'}}/>
        </Tabs>

    )
}