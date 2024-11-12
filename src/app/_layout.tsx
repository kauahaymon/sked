import { Stack } from "expo-router";
import React from "react";
import ActivityProvider from "./context/ActivityProvider";

export default function RootLayout() {
    return (
        <ActivityProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="form" options={{ presentation: 'modal', headerShown: true }} />
            </Stack>
        </ActivityProvider>
    )
}