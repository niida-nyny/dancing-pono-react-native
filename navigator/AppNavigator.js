import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPostScreen from "../screens/AllPostScreen";
import ArticleScreen from "../screens/ArticleScreen";
import InterviewScreen from "../screens/InterviewScreen";
import AmazingDanceScreen from "../screens/AmazingDanceScreen";
import RecruitScreen from "../screens/RecruitScreen";
import EventScreen from "../screens/EventScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClipScreen from "../screens/ClipScreen";
import { FontAwesome } from "@expo/vector-icons";
import { store, persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOption = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "HomeTab") {
      return <FontAwesome name="files-o" size={size} color={color} />;
      //   return <Image style={{ width: 30, height: 30 }} source={require("../assets/news.png")} />;
    } else if (route.name === "InterviewTab") {
      //   return (
      //     <View>
      //       <Text>Interview</Text>
      //     </View>
      //   );
      return <FontAwesome name="microphone" size={size} color={color} />;
    } else if (route.name === "AmazingTab") {
      return <FontAwesome name="film" size={size} color={color} />;
    } else if (route.name === "RecruitTab") {
      return <FontAwesome name="handshake-o" size={size} color={color} />;
      // } else if (route.name === "EventTab") {
      //   return <FontAwesome name="calendar" size={size} color={color} />;
    } else if (route.name === "ClipTab") {
      return <FontAwesome name="bookmark" size={size} color={color} />;
    }

    // You can return any component that you like here!
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AllPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const InterviewStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Interview" component={InterviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const AmazingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Amazing"
        component={AmazingDanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const RecruitStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recruit" component={RecruitScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clip" component={ClipScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={screenOption}>
            <Tab.Screen
              name="HomeTab"
              component={HomeStack}
              options={{ headerShown: false, title: "ニュース" }}
            />
            <Tab.Screen
              name="InterviewTab"
              component={InterviewStack}
              options={{ headerShown: false, title: "インタビュー" }}
            />
            <Tab.Screen
              name="AmazingTab"
              component={AmazingStack}
              options={{ headerShown: false, title: "感動ダンス" }}
            />
            <Tab.Screen
              name="RecruitTab"
              component={RecruitStack}
              options={{ headerShown: false, title: "募集&依頼" }}
            />
            {/* <Tab.Screen
              name="EventTab"
              component={EventScreen}
              options={{ headerShown: false, title: "イベント" }}
            /> */}

            <Tab.Screen
              name="ClipTab"
              component={ClipStack}
              options={{ headerShown: false, title: "お気に入り" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;
