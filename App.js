import { StyleSheet, Text, View } from "react-native";
import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      {/* <SpatialNavigationRoot> */}
      <Text> TV Focus test with React TV Space Navigation</Text>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Group>
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* </SpatialNavigationRoot> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
