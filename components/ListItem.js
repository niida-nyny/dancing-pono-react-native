import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

/**
 *
 * @param {
 * data: すべてのデータ(obj)
 * imageUrl: 画像URL(string)
 * title: タイトル(string)
 * date: 日時(string)
 * onPress: タップされたときのイベント
 * } props
 * @returns
 */
export const ListItem = (props) => {
  const { data, touched } = props;
  const navigation = useNavigation();
  const apiDate = data?.date; // WordPress REST APIから取得した日付
  const dateObj = new Date(apiDate);
  // 2023/09/04 (月) 12:34 のフォーマットに変換
  const formattedDate = format(dateObj, "yyyy/MM/dd (eee) HH:mm");
  // console.log(formattedDate); // 出力: "2023/09/04 (月) 12:34"

  const Container = touched ? TouchableOpacity : View;
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
        {data?.featured_media != 0 && (
          <Image
            style={{ width: 100, height: 100 }}
            // source={{ uri: props.imageUrl }}
            source={{ uri: data?._embedded["wp:featuredmedia"]["0"].source_url }}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {data?.title.rendered}
          {/* {props.title} */}
        </Text>
        <Text style={styles.subText}>
          {formattedDate}
          {/* {props.date} */}
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
