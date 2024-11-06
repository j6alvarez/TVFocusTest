import "./components/configureRemoteControl";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  SpatialNavigationRoot,
  SpatialNavigationDeviceTypeProvider,
  SpatialNavigationNode,
  DefaultFocus,
  SpatialNavigationView,
  SpatialNavigationFocusableView,
} from "react-tv-space-navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Menu from "./components/Menu";
import { MenuProvider } from "./components/Menu/MenuContext";

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

  const Element = ({ onSelect }) => (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <View style={isFocused && { backgroundColor: "green" }}>
          <Text>Page element</Text>
        </View>
      )}
    </SpatialNavigationFocusableView>
  );

  return (
    <NavigationContainer theme={navTheme}>
      <SpatialNavigationDeviceTypeProvider>
        <SpatialNavigationRoot>
          {/* <View style={styles.container}>
          <MenuProvider>
          <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            }}
            >
            <>
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
                <Stack.Screen name="Details">
                {(props) => (
                  <SpatialNavigationRoot>
                  <DetailsScreen {...props} />
                  </SpatialNavigationRoot>
                  )}
                  </Stack.Screen>
                  </>
                  </Stack.Navigator>
                  </MenuProvider>
                  </View> */}
          <DefaultFocus>
            <SpatialNavigationView direction="horizontal">
              <Element />

              <Element />
            </SpatialNavigationView>
          </DefaultFocus>
        </SpatialNavigationRoot>
      </SpatialNavigationDeviceTypeProvider>
    </NavigationContainer>
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
