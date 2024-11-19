import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";  // Import necessário
import ActivityProvider from "../context/ActivityProvider";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ActivityProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="form" options={{ presentation: 'modal', headerShown: true }} />
                </Stack>
            </ActivityProvider>
        </GestureHandlerRootView>
    );
}
