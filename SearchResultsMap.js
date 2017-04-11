import React, { Component  } from 'react'
import {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import PropertyView from './PropertyView';

const styles = StyleSheet.create({
	map : {
		flex: 1,
		alignItems: 'stretch'
	}
});
export default class SearchResultsMap extends Component {
	constructor(props) {
		super(props);
		const listings = this.props.listings;
		const markers = [];
		listings.forEach((listing) => {
			markers.push({
				latlng: {
					longitude: listing.longitude,
					latitude: listing.latitude,
				},
				title: listing.title,
				description: listing.summary,
        listing
			});
		});
		this.state = {
			markers
		};
	}

	getInitialRegion() {
    let points = this.props.listings.map((listing) => ({
      latitude: listing.latitude,
      longitude: listing.longitude,
    }));
		let minX, maxX, minY, maxY;

		// init first point
		((point) => {
			minX = point.latitude;
			maxX = point.latitude;
			minY = point.longitude;
			maxY = point.longitude;
		})(points[0]);

		// calculate rect
		points.map((point) => {
			minX = Math.min(minX, point.latitude);
			maxX = Math.max(maxX, point.latitude);
			minY = Math.min(minY, point.longitude);
			maxY = Math.max(maxY, point.longitude);
		});

		const midX = (minX + maxX) / 2;
		const midY = (minY + maxY) / 2;
		const deltaX = (maxX - minX);
		const deltaY = (maxY - minY);

		return {
			latitude: midX,
			longitude: midY,
			latitudeDelta: deltaX,
			longitudeDelta: deltaY
		};
	}

  onMarkerPress(i) {
    let property = this.state.markers[i].listing;

    this.props.navigator.push({
      title: "Property",
      component: PropertyView,
      passProps: {property: property}
    });
  }

	render() {
		return (
			<MapView style={styles.map}
			initialRegion={this.getInitialRegion()}
			>
			{this.state.markers.map((marker,i) => (
				<Marker
        key={i}
				coordinate={marker.latlng}
				title={marker.title}
				description={marker.description}
        onPress={(e) => {
          e.stopPropagation(); 
          this.onMarkerPress(i)
        }}
				/>
			))}
			</MapView>
		)
	}
}
