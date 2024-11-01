import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  // Destructure the itemId from the route params
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Details Screen</Text>

      {/* Displaying the passed item ID */}
      <Text style={styles.itemText}>Item ID: {itemId}</Text>

      {/* Back Button */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
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
});

export default DetailsScreen;
