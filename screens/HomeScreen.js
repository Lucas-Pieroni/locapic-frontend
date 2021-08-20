import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";

import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");
  const [myPseudo, setMyPseudo] = useState("");

  const handlePressPseudo = () => {
    if (myPseudo === null) {
      props.onSubmitPseudo(pseudo);
      console.log("pseudo récupéré:", pseudo);
      AsyncStorage.setItem("pseudo", pseudo);
      console.log("init stockage pseudo:", pseudo);
    }
    props.navigation.navigate("BottomNavigator", { screen: "Map" });
  };

  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem("pseudo", function (error, data) {
      console.log("pseudo stocké:", data);
      setMyPseudo(data);
    });
  }, []);

  const input = (
    <Input
      containerStyle={{ marginBottom: 25, width: "70%" }}
      inputStyle={{ marginLeft: 10 }}
      placeholder="Enter your name"
      leftIcon={<Icon name="user" size={24} color="#eb4d4b" />}
      onChangeText={(val) => setPseudo(val)}
    />
  );

  const welcome = <Text>Welcome Back {myPseudo}</Text>;

  let inputWelcome = null;
  if (myPseudo === null) {
    inputWelcome = input;
  } else {
    inputWelcome = welcome;
  }

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      {inputWelcome}

      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="Go to Map"
        type="solid"
        onPress={() => {
          handlePressPseudo();
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
