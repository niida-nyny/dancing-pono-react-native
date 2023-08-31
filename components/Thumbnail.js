import React from "react";
import { View, Text } from "react-native";

const Thumbnail = (props) => {
  const { data, key } = props;
  return (
    <View key={key}>
      <Text>{data?.title.rendered}</Text>
      <Text>{data?.excerpt.rendered}</Text>
      <Text>{data?.link}</Text>
      <Text>{data?.date}</Text>
      <Text>{data?.id}</Text>
    </View>
  );
};

export default Thumbnail;
