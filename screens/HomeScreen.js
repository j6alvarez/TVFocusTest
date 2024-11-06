import React, { useMemo } from "react";
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
import { useMenuContext } from "../components/Menu/MenuContext";
import { Page } from "../components/Page";
import { Button } from "../components/Button";

const HomeScreen = ({ navigation }) => {
  const { toggleMenu: setIsMenuOpen, isOpen: isMenuOpen } = useMenuContext();
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

  const handleMenuTrigger = () => {
    setIsMenuOpen((prevState) => {
      if (!prevState) {
        navigation.navigate("Menu");
      }
      return !!prevState;
    });
  };

  const renderItem = ({ item, index }) => (
    <SpatialNavigationNode key={index}>
      <SpatialNavigationFocusableView
        style={styles.itemContainer}
        onSelect={() => navigation.navigate("Details", { itemId: item.id })}
      >
        {({ isFocused }) => (
          <Text style={styles.itemText}>
            {isFocused ? `${item.title} focused` : item.title}
          </Text>
        )}
      </SpatialNavigationFocusableView>
    </SpatialNavigationNode>
  );

  return (
    <Page>
      <DefaultFocus>
        <SpatialNavigationScrollView>
          {/* Invisible Menu Trigger */}
          {/* <SpatialNavigationFocusableView
          onFocus={handleMenuTrigger}
          focusable={true}
          style={styles.menuTrigger}
          >
          <View>
          <Text>Menu</Text>
          </View>
          </SpatialNavigationFocusableView> */}

          {/* Header */}

          <Button label="Play" onSelect={() => console.log("Playing!")} />

          <Button label="Details" onSelect={() => console.log("Playing!")} />

          <View style={styles.listContainer}>
            <SpatialNavigationVirtualizedList
              data={data}
              header={<Text style={styles.headerText}>Featured Content</Text>}
              renderItem={renderItem}
              itemSize={200}
              orientation="horizontal"
              style={styles.list}
              itemSpacing={20}
              scrollBehavior="stick-to-start"
            />
          </View>
        </SpatialNavigationScrollView>
      </DefaultFocus>
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
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
  },
  buttonContainer: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
