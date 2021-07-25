import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      Confirm_password: '',
      list_array: [],
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    };
  }

  onSubmit = () => {
    if (
      this.state.Name.length !== 0 &&
      this.state.Email.length !== 0 &&
      this.state.Password.length !== 0 &&
      this.state.Confirm_password.length !== 0
    ) {
      if (this.state.Password === this.state.Confirm_password) {
        alert('Thank You for Submitting');
        this.state.list_array.push({
          Name: this.state.Name,
          Email: this.state.Email,
          Password: this.state.Password,
          Confirm_password: this.state.Confirm_password,
          Latitude: this.state.where.lat,
          Longtitude: this.state.where.lng,
        });
        //console.log("============>",this.state.list_array);
        AsyncStorage.setItem('Details', JSON.stringify(this.state.list_array));
      } else {
        alert('Confirm Password does not match with the current password');
      }
    } else {
      alert('Please Fill the Required Fields');
    }
  };

  // To view Location//

  onSubmitLocation = () => {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000, //20 second
      //  maximumAge: 1000 //1 second
    };
    this.setState({ready: false, error: null});
    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
  };
  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
  };
  geoFailure = (err) => {
    this.setState({error: err.message});
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>---- REGISTRATION FORM -----</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}> NAME </Text>
            <TextInput
              autoFocus={true}
              onChangeText={(Name) => this.setState({Name})}
              value={this.state.Name}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>EMAIL - ID</Text>
            <TextInput
              autoFocus={true}
              onChangeText={(Email) => this.setState({Email})}
              value={this.state.Email}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>PASSWORD :</Text>
            <TextInput
              autoFocus={true}
              onChangeText={(Password) => this.setState({Password})}
              value={this.state.Password}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>CONFIRM PASSWORD</Text>
            <TextInput
              autoFocus={true}
              onChangeText={(Confirm_password) =>
                this.setState({Confirm_password})
              }
              value={this.state.Confirm_password}
              style={styles.TextInput}
            />
          </View>
          {!this.state.ready && (
            <Text style={styles.title_location}>USER LOCATION</Text>
          )}
          {this.state.error && (
            <Text style={styles.title_location}>Error: {this.state.error}</Text>
          )}
          {this.state.ready && (
            <View>
              <Text style={styles.title_location}>USER LOCATION</Text>
              <Text style={styles.title_location}>
                Latitude: {this.state.where.lat}
              </Text>
              <Text style={styles.title_location}>
                {' '}
                Longitude: {this.state.where.lng}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onSubmit}>
            <Text style={styles.input}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onSubmitLocation}>
            <Text style={styles.input}>Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  textContainer: {
    width: '100%',
    marginTop: 30,
    marginLeft: 10,
    //backgroundColor:"red"
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey',
  },
  inputContainer: {
    display: 'flex',
  },
  title: {
    color: 'grey',
    marginTop: 20,
    marginLeft: 15,
  },
  TextInput: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    borderColor: 'grey',
  },
  buttonview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
  },
  buttonContainer: {
    backgroundColor: '#058db3',
    width: 150,
    borderRadius: 5,
    height: 35,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonContainer2: {
    backgroundColor: '#058db3',
    width: 150,
    borderRadius: 5,
    height: 25,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Pangram-Black',
    alignItems: 'center',
    color: 'white',
    width: '100%',
  },
  title_location: {
    fontSize: 15,
    color: 'grey',
    marginLeft: 15,
  },
});
export default Register;
