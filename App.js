import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Menu from "./components/Menu";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <View style={styles.container}>
      <SpatialNavigationRoot>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Group>
              <Stack.Group key="menu">
                <Stack.Screen
                  name="Menu"
                  options={{ presentation: "transparentModal" }}
                >
                  {(props) => {
                    return (
                      <Menu
                        visible={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        {...props}
                      />
                    );
                  }}
                </Stack.Screen>
              </Stack.Group>
              <Stack.Screen name="Home">
                {(props) => {
                  return (
                    <HomeScreen
                      setIsMenuOpen={setIsMenuOpen}
                      isMenuOpen={isMenuOpen}
                      {...props}
                    />
                  );
                }}
              </Stack.Screen>
            </Stack.Group>
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SpatialNavigationRoot>
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
