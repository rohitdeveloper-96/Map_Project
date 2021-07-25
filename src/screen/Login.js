import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native"
import Logo from '../assets/images/login_logo.png'
import { StackActions, NavigationActions } from 'react-navigation';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    resetHandler = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: "HomeScreen" }),
                ],
            }),
        );
    };
    //Validation
    validation = () => {
        if (this.state.username.length !== 0 && this.state.password.length !== 0) {
            if (this.state.password.length >= 8) {
                this.props.navigation.navigate('HomeScreen');
                this.resetHandler();
            }
            else {
                alert("Your Password contains minimum 8 Characters")
            }
        } else {
            alert("Please Fill the required Fields");
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/* <View style={styles.textContainer}>
                    <Text style={styles.text}>Login</Text>
                </View> */}
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                </View>
                <TextInput
                    placeholder='Enter your Username'
                    autoFocus={true}
                    onChangeText={(username) => this.setState({ username })}
                    value={this.state.username}
                    style={styles.inputCointainer}
                />
                <TextInput
                    placeholder='Enter your Password'
                    autoFocus={true}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    style={styles.inputCointainer}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.validation}>
                    <Text style={styles.input}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor:"red"
    },
    textContainer: {
        width: "100%",
        marginTop: 30
        //backgroundColor:"red"
    },
    text: {
        textAlign: "center",
        fontSize: 30
    },
    logoContainer: {
        width: "100%",
        //backgroundColor:"yellow",
        alignItems: "center",
        marginTop: 100,
        marginBottom: 50
    },
    inputCointainer: {
        height: 50,
        borderWidth: 1,
        margin: 15,
        borderRadius: 5,
        borderColor: "black",
    },
    buttonContainer: {
        alignSelf: "center",
        backgroundColor: '#058db3',
        width: 150,
        borderRadius: 10,
        height: 45,
        marginTop: 30
    },
    input: {
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Pangram-Black",
        alignItems: 'center',
        color: 'white',
        width: '100%'
    },
})
export default Login;