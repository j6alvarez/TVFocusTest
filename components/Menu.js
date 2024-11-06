import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from "react-tv-space-navigation";
import { useMenuContext } from "./Menu/MenuContext";

const Menu = ({ navigation }) => {
  const { toggleMenu: setIsMenuOpen, isOpen: isMenuOpen } = useMenuContext();
  const onDirectionHandledWithoutMovement = React.useCallback(
    (movement) => {
      if (movement === "right") {
        setIsMenuOpen(false);
      }
    },
    [setIsMenuOpen]
  );
  return (
    <SpatialNavigationRoot
      isActive={isMenuOpen}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.menuContainer]}>
        <SpatialNavigationView direction="vertical">
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log("Sign In pressed")}
              focusable={true}
            >
              <Text style={styles.menuText}>Sign In</Text>
            </TouchableOpacity>
            <DefaultFocus>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate("Home");
                  setIsMenuOpen(false);
                }}
                focusable={true}
              >
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>
            </DefaultFocus>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("Library")}
              focusable={true}
            >
              <Text style={styles.menuText}>My Library</Text>
            </TouchableOpacity>
          </View>
        </SpatialNavigationView>
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
  },
  menuItem: {
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Menu;
