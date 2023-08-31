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

const RecruitScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchData() {
    const res = await fetch(
      `https://dance.gdp22.com/wp-json/wp/v2/recruit?_embed&per_page=10&page=${page}`,
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <ListItem
              data={item}
              onPress={() => navigation.navigate("Article", { article: item })}
              // imageUrl={item._embedded["wp:featuredmedia"]["0"].source_url}
              title={item.title.rendered}
              date={item.date}
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

export default RecruitScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === "ios" ? 0 : 30,
    flex: 1,
    backgroundColor: "#fff",
  },
});
