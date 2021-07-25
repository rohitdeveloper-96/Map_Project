import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Map from '../screen/Map'
import Register from "../screen/Register"
import ViewLocation from "../screen/ViewLocation"

const Navigation = createStackNavigator({
    Map: { screen: Map },
    Register: { screen: Register },
    ViewLocation: { screen: ViewLocation },
},
    {
        headerMode: 'none',
        initialRouteName: 'Register'
    }
)
const Appcontainer = createAppContainer(Navigation)
export default Appcontainer;