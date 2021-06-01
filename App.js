import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "BACKGROUND_TASK";

TaskManager.defineTask(TASK_NAME, () => {
    try {
        // fetch data here...
        const receivedNewData = "Simulated fetch " + Math.random();
        console.log("My task ", receivedNewData);
        return receivedNewData
            ? BackgroundFetch.Result.NewData
            : BackgroundFetch.Result.NoData;
    } catch (err) {
        return BackgroundFetch.Result.Failed;
    }
});

export default function App() {

    RegisterBackgroundTask = async () => {
        try {
            await BackgroundFetch.registerTaskAsync(TASK_NAME, {
                minimumInterval: 5, // seconds,
            });
            console.log("Task registered");
        } catch (err) {
            console.log("Task Register failed:", err);
        }
    };

    useEffect(() => {
        RegisterBackgroundTask();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
