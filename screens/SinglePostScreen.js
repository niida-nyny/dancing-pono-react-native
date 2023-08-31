import React from "react";
import { View } from "react-native";
import { ListItem } from "../components/ListItem";

const SinglePostScreen = (props) => {
  const { route } = props;
  const data = route.params.data;
  return (
    <View>
      <ListItem data={data} touched={false} />
    </View>
  );
};

export default SinglePostScreen;
