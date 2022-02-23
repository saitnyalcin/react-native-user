import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  const refreshUser = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  };
  useEffect(refreshUser, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, color: "green", textAlign: "center" }}>
            Random User Generator
          </Text>
          <FlatList
            data={data.results}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: item.picture.thumbnail,
                  }}
                />
                <Text>{item.gender}</Text>
                <Text>
                  {item.name.title +
                    ". " +
                    item.name.first +
                    " " +
                    item.name.last}
                </Text>
                <Text>{item.location.city}</Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
                <Button title="refresh" onPress={() => refreshUser()} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    margin: 25,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
