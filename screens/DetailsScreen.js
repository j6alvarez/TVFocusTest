import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
  SpatialNavigationFocusableView,
  DefaultFocus,
} from "react-tv-space-navigation";
import { Page } from "../components/Page";

const DetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;

  return (
    <Page navigation={navigation}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerText}>Details Screen</Text>

        {/* Content */}
        <Text style={styles.itemText}>Item ID: {itemId}</Text>

        {/* Back Button */}
        <DefaultFocus>
          <SpatialNavigationFocusableView
            focusable={true}
            hasTVPreferredFocus={true}
            onSelect={() => navigation.goBack()}
          >
            {({ isFocused }) => (
              <View style={[styles.button, isFocused && styles.buttonFocused]}>
                <Text style={styles.buttonText}>Go Back</Text>
              </View>
            )}
          </SpatialNavigationFocusableView>
        </DefaultFocus>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 20,
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
  buttonFocused: {
    backgroundColor: "#222",
  },
});

export default DetailsScreen;
