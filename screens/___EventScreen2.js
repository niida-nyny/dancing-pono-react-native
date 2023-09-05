import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { View, Text } from "react-native";
import { ListItem } from "../components/ListItem";
import Thumbnail from "../components/Thumbnail";
import dummyArticles from "../dummies/articles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const EventScreen2 = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchData() {
    const res = await fetch(
      `https://dance.gdp22.com/wp-json/tribe/events/v1/events?_embed&per_page=10&page=${page}`,
    );
    try {
      const myResponse = await res.json();
      setPosts([...posts, ...myResponse]);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    // <SafeAreaView style={styles.contaier}>
    // {/* <Text>{article.link}</Text> */}
    // {/* <WebView source={{ uri: "https://dance.gdp22.com/" }} /> */}
    // {/* <WebView originWhitelist={["*"]} source={{ uri: "https://dance.gdp22.com/" }} /> */}
    // {/* <WebView source={{ uri: "https://expo.dev" }} /> */}
    // {/* <Text>あああ</Text> */}

    // {/* <WebView originWhitelist={["*"]} source={{ uri: article.link }} /> */}
    // {/* <WebView source={{ uri: "https://expo.dev" }} /> */}
    // {/* <WebView source={{ uri: "https://dance.gdp22.com/archives/dance_changes_life/ryoko" }} /> */}
    // {/* </SafeAreaView> */}
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <ListItem
              data={item}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          </View>
        )}
        keyExtractor={(item) => {
          // console.log(item.id);
          return item.id.toString();
        }}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.9}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default EventScreen2;

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === "ios" ? 0 : 30,
    flex: 1,
    backgroundColor: "#fff",
  },
});
