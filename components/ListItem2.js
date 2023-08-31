import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

/**
 *
 * @param {
 * imageURL: 画像URL(string)
 * title: タイトル(string)
 * author: ニュース提供元(string)
 * } props
 * @returns
 */
export const ListItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: props.imageUrl }} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {props.title}
        </Text>
        <Text style={styles.subText}>{props.author}</Text>
      </View>
    </View>
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
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: "gray",
  },
});
