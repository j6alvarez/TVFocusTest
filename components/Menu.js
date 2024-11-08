import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationView,
  SpatialNavigationScrollView,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationVirtualizedList,
  SpatialNavigationVirtualizedGrid
} from "react-tv-space-navigation";
import { useMenuContext } from "./Menu/MenuContext";
import { useKey } from "../hooks/useKey";
import { SupportedKeys } from "./remote-control/SupportedKeys";
import { useLockOverlay } from "../hooks/useLockOverlay";

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
  useLockOverlay(isMenuOpen, setIsMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useKey(SupportedKeys.Back, closeMenu);

  if(!isMenuOpen){
    return <></>
  }

  console.log("Menu", { isMenuOpen });
  return (
    <SpatialNavigationRoot
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >

        <SpatialNavigationFocusableView >
        <View style={[StyleSheet.absoluteFillObject, styles.menuContainer]}>
      
          <View style={styles.menu}>
            <DefaultFocus>
              <SpatialNavigationNode
                isFocusable
                onSelect={() => console.log("Sign In pressed")}
                >
                {({ isFocused }) => {
                  
                  console.log('isFocusedSignIn', isFocused)
                  return(
                    <View
                    style={[
                      styles.menuItem,
                    isFocused && styles.menuItemFocused,
                  ]}
                  >
                    <Text style={[styles.menuText]}>Sign In</Text>
                  </View>
                )}}
              </SpatialNavigationNode>
              </DefaultFocus>
            

            <SpatialNavigationNode
            isFocusable
              onSelect={() => {
                navigation.navigate("Home");
                setIsMenuOpen(false);
              }}
              >
              {({ isFocused }) => {
                console.log('isFocusedHome')
                return(
                <View
                style={[styles.menuItem, isFocused && styles.menuItemFocused]}
                >
                  <Text style={[styles.menuText]}>Home</Text>
                </View>
              )}}
            </SpatialNavigationNode>

            
            <SpatialNavigationNode
              onSelect={() => console.log("Library")}
             isFocusable
              >
              {({ isFocused }) => {
                  console.log('isFocusedLibrary')
                return(
                <View
                style={[styles.menuItem, isFocused && styles.menuItemFocused]}
                >
                  <Text style={[styles.menuText]}>My Library</Text>
                </View>
              )}}
            </SpatialNavigationNode>
           
          </View>
          </View>
        </SpatialNavigationFocusableView>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
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
  buttonContainer: {
    display: "flex",
    marginLeft: 50,
    marginTop: "20%",
    flexDirection: "row",
    gap: 20,
  },
  list: {
    height: 300,
    width: "100%",
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
