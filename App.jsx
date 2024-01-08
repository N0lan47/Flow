/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Separator = () => <View style={styles.separator} />;
const flowerImage = require('./images/flower.png');

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.bigtitle}>FLOWSENS</Text>
    <Image source={flowerImage} style={styles.image} />
    <View style={styles.content}>
      <View style={styles.buttonContainer}>
        <Button
          title="CONNEXION"
          onPress={() => navigation.navigate('Connexion')}
          titleStyle={styles.buttonText}
        />
      </View>
      <Separator />
      <View style={styles.buttonContainer}>
        <Button
          title="CRÉER UN COMPTE"
          onPress={() => navigation.navigate('InscriptionScreen')}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  </SafeAreaView>
);

const AuthScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('MesPlantes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigtitle}>{route.name}</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const MesPlantesScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.bigtitle}>Mes Plantes</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Mes Plantes"
        onPress={() => Alert.alert('Navigate to Mes Plantes')}
        titleStyle={styles.buttonText}
      />
      <Separator />
      <Button
        title="Ajouter une Plante"
        onPress={() => navigation.navigate('AjouterPlante')}
        titleStyle={styles.buttonText}
      />
    </View>
  </SafeAreaView>
);

const AjouterPlanteScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // futur search query
    Alert.alert(`Search for: ${searchQuery}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigtitle}>Ajouter une Plante</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher une plante"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>
    </SafeAreaView>
  );
};

const ConnexionScreen = ({ navigation }) => <AuthScreen route={{ name: 'Connexion' }} navigation={navigation} />;
const CreationCompteScreen = ({ navigation }) => <AuthScreen route={{ name: 'CreationCompte' }} navigation={navigation} />;

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="CreationCompte" component={CreationCompteScreen} />
      <Stack.Screen name="MesPlantes" component={MesPlantesScreen} />
      <Stack.Screen name="AjouterPlante" component={AjouterPlanteScreen} />
      <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const InscriptionScreen = ({ navigation }) => {
  const [m_no, setMNo] = useState('');
  const [m_name, setMName] = useState('');
  const [m_course, setMCourse] = useState('');

  const handleRegister = () => {
    if (m_no.length === 0 || m_name.length === 0 || m_course.length === 0) {
      Alert.alert('Required Field is Missing');
    } else {
      let InsertAPIURL = 'http://192.168.59.164/insert.php';

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let data = {
        m_no: m_no,
        m_name: m_name,
        m_course: m_course,
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((response) => {
        Alert.alert(response[0].Message);
      })
      .catch((error) => {
        Alert.alert('Error' + error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bigtitle}>Inscription</Text>
      <TextInput
        placeholder="Member No"
        placeholderTextColor="tomato"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setMNo}
      />
      <TextInput
        placeholder="Member Name"
        placeholderTextColor="tomato"
        style={styles.input}
        onChangeText={setMName}
      />
      <TextInput
        placeholder="Member Course"
        placeholderTextColor="tomato"
        style={styles.input}
        onChangeText={setMCourse}
      />
      <Button title="Regg" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E6C70',
  },
  bigtitle: {
    fontSize: 60,
    color: 'red',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  content: {
    width: '80%',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default App;
