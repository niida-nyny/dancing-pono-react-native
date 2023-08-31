import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 *
 * @param {
 * imageUrl: 画像URL(string)
 * title: タイトル(string)
 * author: ニュース提供元(string)
 * onPress: タップされたときのイベント
 * } props
 * @returns
 */
export const ListItem = (props) => {
  const { data, touched } = props;
  const navigation = useNavigation();

  const Contaier = touched ? TouchableOpacity : View;
  //   console.log(data);
  return (
    // <View key={index}>
    //   <Text>{data?.title.rendered}</Text>
    //   <Text>{data?.date}</Text>
    //   <Text>{data?.link}</Text>
    // </View>

    <TouchableOpacity
      style={styles.itemContainer}
      //   key={data?.id}
      //   onPress={() => {
      //     navigation.navigate("Article", { data });
      //   }}
      onPress={props.onPress}
    >
      <View style={styles.leftContainer}>
        {/* {data.featured_media != 0 && ( */}
        <Image
          style={{ width: 100, height: 100 }}
          // source={{ uri: data?._embedded["wp:featuredmedia"]["0"].source_url }}
          source={{ uri: props.imageUrl }}
        />
        {/* // )} */}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {/* {data?.title.rendered} */}
          {props.title}
        </Text>
        <Text style={styles.subText}>
          {/* {data?.date} */}
          {props.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
  subText: {
    fontSize: 12,
    color: "gray",
  },
});