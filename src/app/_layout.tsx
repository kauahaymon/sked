import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="form" options={{ presentation: 'modal', headerShown: true }} />
        </Stack>
    )
}