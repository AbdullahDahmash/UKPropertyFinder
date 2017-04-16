import React, { Component  } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';

let styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  map: {
    height: 200,
    margin: 40,
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

export default class PropertyView extends Component {

  render() {
    let property = this.props.property;
    let stats = property.bedroom_number + ' bed ' + property.property_type;
    if (property.bathroom_number) {
      stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
    }
    let price = property.price_formatted.split(' ')[0];

    return (
      <ScrollView style={styles.container}>
      <Image style={styles.image} source={{uri: property.img_url}} />
      <View style={styles.heading}>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.title}>{property.title}</Text>
      <View style={styles.separator}/>
      </View>
      <Text style={styles.description}>{stats}</Text>
      <Text style={styles.description}>{property.summary}</Text>
      <MapView style={styles.map}
        initialRegion={{
          latitude: property.latitude,
          longitude: property.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <MapView.Marker
        coordinate={{
          longitude: property.longitude,
          latitude: property.latitude,
        }}
        title={property.title}
        description={property.summary}
      />
      </MapView>
      </ScrollView>
    )
  }
}
