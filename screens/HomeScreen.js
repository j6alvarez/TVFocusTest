import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  // Sample data for the FlatList
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
  ];

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Details", { itemId: item.id })}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
          horizontal={true} // Set this prop to render items horizontally
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 50,
    left: 0,
    right: 0,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#444",
    marginRight: 8, // Adjust margin for horizontal spacing
    borderRadius: 4,
    width: 150,
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
