import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
  SpatialNavigationScrollView,
  SpatialNavigationFocusableView,
} from "react-tv-space-navigation";
import { useMenuContext } from "./Menu/MenuContext";
import { useKey } from "../hooks/useKey";
import { SupportedKeys } from "./remote-control/SupportedKeys";

const Menu = ({ navigation }) => {
  const { toggleMenu: setIsMenuOpen, isOpen: isMenuOpen } = useMenuContext();
  const onDirectionHandledWithoutMovement = React.useCallback(
    (movement) => {
      if (movement === "right") {
        setIsMenuOpen(false);
        navigation.navigate("Home");
      }
    },
    [setIsMenuOpen]
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useKey(SupportedKeys.Back, closeMenu);

  console.log("Menu", { isMenuOpen });
  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.menuContainer]}>
        <SpatialNavigationScrollView>
          <View style={styles.menu}>
            <DefaultFocus>
              <SpatialNavigationFocusableView
                onSelect={() => console.log("Sign In pressed")}
                focusable={true}
              >
                {({ isFocused }) => (
                  <View
                    style={[
                      styles.menuItem,
                      isFocused && styles.menuItemFocused,
                    ]}
                  >
                    <Text style={[styles.menuText]}>Sign In</Text>
                  </View>
                )}
              </SpatialNavigationFocusableView>
            </DefaultFocus>

            <SpatialNavigationFocusableView
              onSelect={() => {
                navigation.navigate("Home");
                setIsMenuOpen(false);
              }}
              focusable={true}
            >
              {({ isFocused }) => (
                <View
                  style={[styles.menuItem, isFocused && styles.menuItemFocused]}
                >
                  <Text style={[styles.menuText]}>Home</Text>
                </View>
              )}
            </SpatialNavigationFocusableView>

            <SpatialNavigationFocusableView
              onSelect={() => console.log("Library")}
              focusable={true}
            >
              {({ isFocused }) => (
                <View
                  style={[styles.menuItem, isFocused && styles.menuItemFocused]}
                >
                  <Text style={[styles.menuText]}>My Library</Text>
                </View>
              )}
            </SpatialNavigationFocusableView>
          </View>
        </SpatialNavigationScrollView>
      </View>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menu: {
    position: "absolute",
    left: 20,
    top: 40,
    width: 200,
    height: 400,
    backgroundColor: "grey",
    zIndex: 10,
    borderRadius: 5,
  },
  menuItem: {
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: 150,
    left: 25,
    top: 50,
    backgroundColor: "#333",
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  menuItemFocused: {
    backgroundColor: "#222", // Darker background instead of text color
  },
});

export default Menu;
