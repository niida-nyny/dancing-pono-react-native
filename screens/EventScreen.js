import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const EventScreen = () => {
  return (
    <View style={styles.container}>
      <WebView originWhitelist={["*"]} source={{ uri: "https://dance.gdp22.com/area_large" }} />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "10%",
  },
});
