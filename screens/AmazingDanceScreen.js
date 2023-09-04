import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { ListItem } from "../components/ListItem";
import Thumbnail from "../components/Thumbnail";
import dummyArticles from "../dummies/articles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";

// const URL = "https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?_embed";

const AmazingDanceScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setisFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  // 最大ページ数をカウントするロジック
  const apiUrl = "https://dance.gdp22.com/wp-json/wp/v2/amazing_movies"; // WordPress REST APIのエンドポイント

  let maxPage = 0;
  let currentPage = 1;

  async function fetchAllPages() {
    try {
      while (true) {
        const response = await fetch(apiUrl + `?page=${currentPage}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          maxPage = currentPage; // 最大ページを更新
          currentPage++;
        } else {
          break; // データがない場合はループを終了
        }
      }
      // console.log("最大ページ数:", maxPage);
    } catch (error) {
      console.error("エラー:", error);
    }
  }

  fetchAllPages(); // 最大ページ数を計算
  // ここでmaxPage変数を使用できます
  // console.log("上の最大ページ数:", maxPage);

  useEffect(() => {
    fetchData(posts, setPosts);
  }, [page]);

  async function fetchData() {
    const res = await fetch(
      `https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?_embed&per_page=10&page=${page}`,
    );

    setLoading(true);

    try {
      const myResponse = await res.json();

      fetchAllPages();
      // ここでmaxPage変数を使用できます
      console.log("if上", maxPage);
      const lastPage = maxPage;
      if (page <= lastPage) {
        setPosts([...posts, ...myResponse]);
        setisFetching(false);
      } else if (page > maxPage) {
        setisFetching(false);
      }
    } catch (e) {
      setisFetching(false);
      console.error(e);
    }
    setLoading(false);
  }

  if (posts.length === 0) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#101010" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
            <ListItem
              data={item}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            setisFetching(true);
            setPage(page + 1);
          }}
          onEndReachedThreshold={0.3}
        />

        <StatusBar style="auto" />
        {isFetching === true && (
          <View style={[styles.loadingBottomContainer]}>
            <ActivityIndicator size="large" color="#101010" />
          </View>
        )}

        {loading && <Loading />}
      </SafeAreaView>
    );
  }
};

export default AmazingDanceScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === "ios" ? 0 : 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loadingBottomContainer: {
    marginBottom: 0,
  },
});
