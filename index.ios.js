
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import SearchPage from './SearchPage';

export default class UKPropertyFinder extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    marginTop: 80
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('UKPropertyFinder', () => UKPropertyFinder);
