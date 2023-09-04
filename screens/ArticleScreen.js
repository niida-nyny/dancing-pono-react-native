import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { WebView } from "react-native-webview";
import { ClipButton } from "../components/ClipButton";
import { useDispatch, useSelector } from "react-redux";
import { addClip, deleteClip } from "../store/userSlice";
import Loading from "../components/Loading";

const ArticleScreen = ({ route }) => {
  //   console.log(route.params);
  const { article } = route.params;
  const dispatch = useDispatch();
  const clips = useSelector((state) => state.user.clips);
  const isClipped = clips.some((clip) => clip.link === article.link);

  const onPressClip = () => {
    if (isClipped) {
      dispatch(deleteClip(article));
    } else {
      dispatch(addClip(article));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={onPressClip} enabled={isClipped} />
      {/* <Text>{article.link}</Text> */}
      {/* <WebView source={{ uri: "https://dance.gdp22.com/archives/50471" }} /> */}
      <WebView
        originWhitelist={["*"]}
        source={{ uri: article.link }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
      {/* <WebView source={{ uri: "https://expo.dev" }} /> */}
      {/* <WebView source={{ uri: "https://dance.gdp22.com/archives/dance_changes_life/ryoko" }} /> */}
    </SafeAreaView>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
