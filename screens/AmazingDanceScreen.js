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
  // const maxPage = 1; // 最大ページ数を設定

  // const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // const [articles, setArticles] = useState([]);

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
      console.log("最大ページ数:", maxPage);
    } catch (error) {
      console.error("エラー:", error);
    }
  }

  fetchAllPages(); // 最大ページ数を計算
  // ここでmaxPage変数を使用できます
  console.log("本当の最大ページ数:", maxPage);

  useEffect(() => {
    fetchData(posts, setPosts);
  }, [page]);

  async function fetchData() {
    // // 現在のページと前のページのURLを取得
    // const currentPageUrl = "https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?page=2"; // 現在のページのURL
    // const linkHeader = '<https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?page=1>; rel="prev"'; // Linkヘッダーの例

    // // Linkヘッダーから前のページURLを抽出
    // const prevPageUrlMatch = /<([^>]+)>;\s*rel="prev"/.exec(linkHeader);
    // if (prevPageUrlMatch) {
    //   const prevPageUrl = prevPageUrlMatch[1];

    //   // 前のページURLから前のページ番号を抽出
    //   const prevPageNumberMatch = /page=(\d+)/.exec(prevPageUrl);
    //   if (prevPageNumberMatch) {
    //     const prevPageNumber = parseInt(prevPageNumberMatch[1], 10);

    //     // 前のページに移動する処理を実行
    //     console.log("前のページ番号:", prevPageNumber);
    //     // ここで前のページに移動するためのAPIリクエストを送信または他の処理を実行します
    //   }
    // }

    // if (page > maxPage) {
    //   // 最大ページ数を超えないように制御
    //   return;
    // }

    // const response = await fetch("https://dance.gdp22.com/wp-json/wp/v2/amazing_movies&page=1");
    // const headers = response.headers.get("Link");
    // const lastPageMatch = /<[^>]+=\s*"prev"[^>]+>;\s*page=(\d+)/.exec(headers);
    // if (lastPageMatch) {
    //   const lastPageNumber = parseInt(lastPageMatch[1], 10);
    //   console.log(`最大ページ数: ${lastPageNumber}`);
    // } else {
    //   console.log("Linkヘッダーに最大ページ情報がありません。");
    // }

    const res = await fetch(
      `https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?_embed&per_page=10&page=${page}`,
      // `https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?_embed`,
    );
    setLoading(true);
    try {
      const myResponse = await res.json();

      // console.log(res);
      // console.log(myResponse);

      // setPosts([...Object.values(posts), ...Object.values(myResponse)]);

      fetchAllPages(console.log("中", maxPage));
      // ここでmaxPage変数を使用できます
      console.log("うその最大ページ数:", maxPage);
      console.log("if上", maxPage);
      const lastPage = maxPage;
      if (page <= maxPage) {
        setPosts([...posts, ...myResponse]);

        setisFetching(false);
      }
    } catch (e) {
      setisFetching(false);
      console.error(e);
    }
    setLoading(false);
  }

  // async function fetchData() {
  //   if (hasReachedEnd) {
  //     return; // 最後のページに達した場合、データ読み込みを停止
  //   }

  //   setisFetching(true); // データ読み込み開始時にtrueに設定
  //   try {
  //     const res = await fetch(
  //       `https://dance.gdp22.com/wp-json/wp/v2/amazing_movies?_embed&per_page=10&page=${page}`,
  //     );
  //     const myResponse = await res.json();

  //     if (myResponse.length === 0) {
  //       // 最後のページに達した場合の処理
  //       setHasReachedEnd(true);
  //     } else {
  //       // myResponse が null の場合に読み込まないようにする
  //       if (myResponse !== null) {
  //         setPosts([...posts, ...myResponse]);
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setisFetching(false); // データ読み込み完了時にfalseに設定
  //   }
  // }

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response);
      setArticles(response.data.article);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [page]);

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  if (posts.length === 0) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#101010" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {/* <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View>
            <ListItem
              data={item}
              onPress={() => navigation.navigate("Article", { article: item })}
              // imageUrl={item._embedded["wp:featuredmedia"]["0"].source_url}
              imageUrl={item.source_url}
              // title={item.title.rendered}
              title={item.title}
              date={item.date}
              />
              </View>
              )}
              keyExtractor={(item, index) => {
                // console.log(item.id);
                return index.toString();
              }}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.9}
      /> */}

        {/* <Text>{posts[0]?.title.rendered}</Text> */}
        <FlatList
          data={posts}
          // renderItem={({ item }) => <Thumbnail data={item} />}
          renderItem={({ item, index }) => (
            <ListItem
              data={item}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            // console.log("reached");
            setisFetching(true);
            setPage(page + 1);
          }}
          onEndReachedThreshold={0.1}
        />

        {/* <ScrollView>
        {posts.map((item) => {
          return <Thumbnail data={item} key={item.id} />;
        })}
      </ScrollView> */}
        <StatusBar style="auto" />
        {/* {isFetching === true && (
          <View style={[styles.loadingBottomContainer]}>
            <ActivityIndicator size="large" color="#101010" />
          </View>
          )} */}

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
