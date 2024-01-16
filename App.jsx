/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { LayoutAnimation } from 'react-native';



const IP = 'http://192.168.90.164:80/';
const Separator = () => <View style={styles2.separator} />;
const flowerImage = require('./images/flower.png');
const coldImage = require('./images/12.png');
const warmImage = require('./images/2.png');
const hotImage = require('./images/3.png');
const humidtyImg = require('./images/humidite.png');
const Stack = createStackNavigator();
const settingsIcon = require('./images/settings.png');


const App = () => {
  const [savedPlants, setSavedPlants] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert('This is a settings button!')}>
              <Image source={settingsIcon} style={styles.settingsIcon} />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} />
        <Stack.Screen name="CreationCompte" component={CreationCompteScreen} />
        <Stack.Screen name="MesPlantes">
          {(props) => <MesPlantesScreen {...props} savedPlants={savedPlants} />}
        </Stack.Screen>
        <Stack.Screen name="AjouterPlante" component={AjouterPlanteScreen} />
        <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
        <Stack.Screen name="InformationScreen" setSavedPlants={setSavedPlants} component={InformationScreen} />
        <Stack.Screen name="Plantes">
          {(props) => <PlantesScreen {...props} savedPlants={savedPlants}  />}
        </Stack.Screen>
        <Stack.Screen name="SavedInformationScreen" component={SavedInformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
          color = "#006400"
        />
      </View>
      <Separator />
      <View style={styles.buttonContainer}>
        <Button
          title="CRÉER UN COMPTE"
          onPress={() => navigation.navigate('InscriptionScreen')}
          titleStyle={styles.buttonText}
          color = "#006400"
        />
      </View>
    </View>
  </SafeAreaView>
);

const AuthScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert('Required Field is Missing');
      navigation.navigate('MesPlantes');
    } else {
      let InsertAPIURL = IP + 'connexion.php';

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let data = {
        username: username,
        password: password,
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
      .then((response) => response.json(),)
      .then((response) => {
        if (response[0].Message === '1') {
          // Successful login, navigate to 'MesPlantes'
          navigation.navigate('MesPlantes');
        } else {
          // Unsuccessful login, show a message or perform another action
          Alert.alert('Incorrect username or password. Please try again.');
        }
      })
      .catch((error) => {
        Alert.alert('Error' + error);
      });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigtitle}>Connexion</Text>
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
        <Button 
          title="Login" 
          onPress={() => {
            handleLogin();
          }}
          color = "#006400" />
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
        onPress={() => navigation.navigate('Plantes')}
        titleStyle={styles.buttonText}
        color = "#006400"
      />
      <Separator />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Ajouter une Plante"
        onPress={() => navigation.navigate('AjouterPlante')}
        titleStyle={styles.buttonText}
        color = "#006400"
      />
    </View>
  </SafeAreaView>
);

const PlantesScreen = ({ navigation }) => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      {/* Your PlantesScreen component code here */}
    </SafeAreaView>
  );
};

const SavedInformationScreen = ({ navigation }) => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      {/* Your PlantesScreen component code here */}
    </SafeAreaView>
  );
};



const AjouterPlanteScreen = ({ navigation }) => {
  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null)

  const handleSearch = async () => {
    try {
      let InsertAPIURL = IP + 'send_data.php';

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let data = {
        m_name: searchQuery,
      };

      const response = await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();
      //Alert.alert(result[0].KO);
      setSearchResults(result);
    // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError('Error: ' + error);
    }
  };

  useEffect(() => {
    // Handle the state update here if needed after the component has rendered
    if (error) {
      Alert.alert(error);
    }
  }, [error]);

  return (
    <View style={styles2.container}>
      <Text>Ajouter une Plante</Text>
      <TextInput
      style ={styles2.input}
        placeholder="Rechercher une plante"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Rechercher" onPress={handleSearch} color = "#006400"/>

      {/* Display search results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('InformationScreen', { item })}>
            <View style={[styles2.rectangle, selectedImage === item && styles2.selectedImage]}>
              <Image source={{ uri: IP + item.imageDirection }} style={[styles2.image]} />
              <Text style={styles2.nameText}>Name: {item.name}</Text>
              <Text style={styles2.descriptionText}>Description: {item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const InformationScreen = ({setSavedPlants}) =>{
  const route = useRoute();
  const { item } = route.params || {};
  const [additionalInfo, setAdditionalInfo] = useState(null);

  useEffect(() => {
    // Send a POST request to retrieve additional information
    const fetchAdditionalInfo = async () => {
      try {
        let infoAPIURL = IP + 'send_all_data.php'; // Replace with your actual API endpoint
        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };

        let data = {
          itemId: item.id, // Pass a data
        };

        const response = await fetch(infoAPIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        const result = await response.json();
        setAdditionalInfo(result); // Update state with retrieved information
      } catch (error) {
        console.error('Error fetching additional information:', error);
      }
    };

    // Call the fetchAdditionalInfo function when the component mounts
    fetchAdditionalInfo();
  }, [item.id]); // Include item.id in the dependency array to re-run the effect when it changes


  return (
    <View style={styles2.container}>
      <Button
        title="Save Plant"
        onPress={() => {
          setSavedPlants((prevPlants) => [...prevPlants, item]);
          Alert.alert('Plant saved successfully!');
        }}
        color="#006400"
      />
      <Text style={styles2.titlePlant}>{item.name}</Text>
      <Image source={{ uri: IP + item.imageDirection }} style={styles2.mainImage} />
      <View style={{ marginVertical: 10 }} />
      <Text style={styles2.descriptionText2}>Description: {item.description}</Text>
      {/* Additional details as needed */}
      <FlatList
        data={additionalInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: dyInfo }) => {
          let tempImg;
          let lumImg;
          let phImg;
          let humImg = <Image source={humidtyImg} style={styles2.imageHum} />;
          // Compare temperatures inside an if statement
          if (dyInfo.temperature < item.temperatureMin) {
            tempImg = <Image source={coldImage} style={styles2.imageTemp} />;
          } else if (dyInfo.temperature > item.temperature){
            tempImg = <Image source={hotImage} style={styles2.imageTemp} />;
          } else {
            tempImg = <Image source={warmImage} style={styles2.imageTemp} />;
          }

          if (dyInfo.humidity < item.humidityMin) {
            lumImg = <Image source={coldImage} style={styles2.imageTemp} />;
          } else if (dyInfo.humidity > item.humidityMax){
            lumImg = <Image source={hotImage} style={styles2.imageTemp} />;
          } else {
            lumImg = <Image source={warmImage} style={styles2.imageTemp} />;
          }

          return (
            <View style={styles2.infoDisplayer}>
              {/* Display other details as needed */}
              <View style={styles2.temperatureContainer}>
                <Text style={styles2.temperatureText}>{dyInfo.temperature} °C  </Text>
                {tempImg}
                <Text></Text>
                {humImg}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};


const ConnexionScreen = ({ navigation }) => <AuthScreen route={{ name: 'Connexion' }} navigation={navigation} />;
const CreationCompteScreen = ({ navigation }) => <AuthScreen route={{ name: 'CreationCompte' }} navigation={navigation} />;


const InscriptionScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert('Required Field is Missing');
    } else {
      let InsertAPIURL = IP + 'inscription.php';

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let data = {
        username: username,
        email: email,
        password: password,
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
      .then((response) => response.json(),)
      .then((response) => {
        if (response[0].Message === 'succeed'){
          Alert.alert('Inscription reussie');
        }
        if (response[0].Message === 'failed'){
          Alert.alert('erreur inscription');
        }
        if (response[0].Message === 'errorId'){
          Alert.alert('Username or email already taken');
        }
      })
      .catch((error) => {
        Alert.alert('Error' + error);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigtitle}>Inscription</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          secureTextEntry
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button 
          title="Login" 
          onPress={handleRegister}
          color = "#006400" />
      </View>
    </SafeAreaView>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#AFBC8F',
    alignItems: 'center', // Center horizontally
  },
  infoDisplayer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center vertically
    marginVertical: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  temperatureContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center vertically
    marginVertical: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  temperatureText: {
    color: 'white',
    fontSize: 18,
  },
  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  rectangle: {
    borderWidth: 3,
    borderColor: '#006400',
    borderRadius: 9,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'column',  // Align items horizontally
  },
  image: {
    borderColor : '#006400',
    borderWidth : 2,
    width: 130,
    height: 130,
    marginRight: 10, // Spacing between image and text
  },
  imageTemp: {
    width: 30, // Set width to a specific pixel value
    height: 60, // Set height to a specific pixel value
    borderColor: '#006400',
  },
  imageHum: {
    width: 45, // Set width to a specific pixel value
    height: 45, // Set height to a specific pixel value
    borderColor: '#006400',
    marginLeft: 20,
  },
  textContainer: {
    flex: 1, // Allow text to fill remaining space
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    maxWidth: '80%',
    overflow: 'hidden',
  },
  descriptionText2: {
    fontSize: 20,
    color: 'black',
  },
  titlePlant: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainImage: {
    height: 300,
    width: 300,
    borderColor : '#006400',
    borderWidth : 3,
  },
});


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
    fontSize: 360,
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
  settingsIcon: {
    width: 35, // Set width to a specific pixel value
    height: 35, // Set height to a specific pixel value
    borderColor: '#006400',
    borderWidth: 0.5,
    marginRight: 10,
  },
});

export default App;
