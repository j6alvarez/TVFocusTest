import React, { useMemo, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DefaultFocus,
  SpatialNavigationNode,
  SpatialNavigationView,
  SpatialNavigationFocusableView,
  SpatialNavigationVirtualizedList,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
} from "react-tv-space-navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useMenuContext } from "../components/Menu/MenuContext";
import { Page } from "../components/Page";
import { SupportedKeys } from "../components/remote-control/SupportedKeys";
import { useKey } from "../hooks/useKey";

const HomeScreen = ({ navigation }) => {
  const { toggleMenu: setIsMenuOpen, isOpen: isMenuOpen } = useMenuContext();
  const listRef = useRef(null);
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
    { id: "6", title: "Item 6" },
    { id: "7", title: "Item 7" },
    { id: "8", title: "Item 8" },
    { id: "9", title: "Item 9" },
    { id: "10", title: "Item 10" },
    { id: "11", title: "Item 11" },
    { id: "12", title: "Item 12" },
  ];

  const isScreenFocused = useIsFocused();
  const isActive = !isMenuOpen;

  const goToFirstItem = useCallback(
    (pressedKey) => {
      const isBackKey = pressedKey === SupportedKeys.Back;
      const isRowActive = isActive && isScreenFocused;
      const isFirstElementFocused =
        listRef.current?.currentlyFocusedItemIndex === 0;

      if (!isBackKey || !isRowActive || isFirstElementFocused) {
        return false;
      }

      listRef.current?.focus(0);
      return true;
    },
    [isActive, isScreenFocused, listRef]
  );

  useKey(SupportedKeys.Back, goToFirstItem);

  const renderItem = ({ item, index }) => (
    <SpatialNavigationNode key={index}>
      <SpatialNavigationFocusableView
        onSelect={() => navigation.navigate("Details", { itemId: item.id })}
      >
        {({ isFocused }) => (
          <View
            style={[
              styles.itemContainer,
              isFocused && styles.itemContainerFocused,
            ]}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      </SpatialNavigationFocusableView>
    </SpatialNavigationNode>
  );

  const buttons = [
    {
      title: "Play",
      onSelect: () => console.log("playing"),
    },
    {
      title: "Details",
      onSelect: () => console.log("playing"),
    },
  ];

  const renderButton = ({ item, index }) => (
    <SpatialNavigationNode key={index}>
      <SpatialNavigationFocusableView
        onSelect={() => navigation.navigate("Details", { itemId: item.id })}
      >
        {({ isFocused }) => (
          <View style={[styles.button, isFocused && styles.buttonFocused]}>
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        )}
      </SpatialNavigationFocusableView>
    </SpatialNavigationNode>
  );

  return (
    <Page navigation={navigation}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
        </View>
        <SpatialNavigationScrollView>
          {/* Buttons */}
          <DefaultFocus>
            <View style={styles.buttonContainer}>
              <SpatialNavigationVirtualizedList
                data={buttons}
                header={<></>}
                renderItem={renderButton}
                itemSize={200}
                orientation="horizontal"
                style={styles.list}
                itemSpacing={5}
              />
            </View>
          </DefaultFocus>

          {/* List */}
          <View style={styles.listContainer}>
            <SpatialNavigationVirtualizedList
              data={data}
              header={<Text style={styles.headerText}>Featured Content</Text>}
              renderItem={renderItem}
              itemSize={200}
              orientation="horizontal"
              style={styles.list}
              itemSpacing={15}
              scrollBehavior="stick-to-start"
              ref={listRef}
            />
          </View>
        </SpatialNavigationScrollView>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1c1c1c",
  },
  header: {
    padding: 16,
    backgroundColor: "#333",
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    marginLeft: 50,
    marginTop: "20%",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#444",
    padding: 16,
    borderRadius: 4,
    width: 120,
  },
  buttonFocused: {
    backgroundColor: "#222",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  focusedText: {
    color: "#00ff00",
  },
  listContainer: {
    position: "absolute",
    bottom: -400,
    left: 20,
    right: 0,
    paddingVertical: 20,
  },
  list: {
    height: 300,
    width: "100%",
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#444",
    marginRight: 8,
    borderRadius: 4,
    width: 150,
  },
  itemContainerFocused: {
    backgroundColor: "#222",
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  menuTrigger: {
    position: "absolute",
    left: 3,
    top: 300,
    width: 40,
    height: 60,
    borderRadius: 4,
    color: "#ffff",
    alignContent: "center",
    backgroundColor: "#333",
  },
});

export default HomeScreen;
