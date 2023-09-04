import React from "react";
import { View, Text, Image } from "react-native";

const Thumbnail = (props) => {
  const { data } = props;
  return (
    <View>
      <Text>{data?.title.rendered}</Text>
      <Text>{data?.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
      <Text>{data?.link}</Text>
      <Text>{data?.date}</Text>
      <Text>{data?.id}</Text>
      {data.featured_media != 0 && (
        <Image
          style={{ width: "100%", height: 150 }}
          source={{ uri: data?._embedded["wp:featuredmedia"]["0"].source_url }}
        />
      )}
    </View>
  );
};

export default Thumbnail;
