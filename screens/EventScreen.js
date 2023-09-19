import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import Loading from "../components/Loading";

const EventScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://dance.gdp22.com/area_large" }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
});
