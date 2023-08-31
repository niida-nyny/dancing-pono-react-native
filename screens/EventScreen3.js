import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const EventScreen3 = () => {
  const newLocal = (
    <View>
      <Text>あああ</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barstyle="dark-content" /> */}
      {/* <Text>{article.link}</Text> */}
      {/* <WebView source={{ uri: "https://dance.gdp22.com/" }} /> */}
      {/* <WebView originWhitelist={["*"]} source={{ uri: "https://dance.gdp22.com/" }} /> */}
      <WebView source={{ uri: "https://expo.dev" }} />
      {/* {newLocal} */}
      {/* <WebView originWhitelist={["*"]} source={{ uri: article.link }} /> */}
      {/* <WebView source={{ uri: "https://expo.dev" }} /> */}
      {/* <WebView source={{ uri: "https://dance.gdp22.com/archives/dance_changes_life/ryoko" }} /> */}
    </SafeAreaView>
  );
};

export default EventScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
