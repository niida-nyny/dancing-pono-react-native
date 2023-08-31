import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ListItem } from "../components/ListItem";
import { useNavigation } from "@react-navigation/native";

const ClipScreen = () => {
  const clips = useSelector((state) => state.user.clips);
  //   const { data, touched } = props;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <FlatList
        data={clips}
        renderItem={({ item }) => (
          <View>
            <ListItem
              //   data={item}
              imageUrl={item?._embedded["wp:featuredmedia"]["0"].source_url}
              title={item.title.rendered}
              date={item.date}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          </View>
        )}
        keyExtractor={(item) => {
          // console.log(item.id);
          return item.id.toString();
        }}
      />
    </SafeAreaView>
  );
};

export default ClipScreen;
