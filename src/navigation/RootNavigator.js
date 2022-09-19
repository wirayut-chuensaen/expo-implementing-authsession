import React from 'react';
import { SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPage } from '../pages'

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "android" ? undefined : "padding"}>
            <SafeAreaView style={{ flex: 1 }} >
                <NavigationContainer>
                    <StatusBar />
                    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"main"} >
                        <Stack.Screen name="main" component={MainPage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView >
        </KeyboardAvoidingView>
    )
}

export default RootNavigator