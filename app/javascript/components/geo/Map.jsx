import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

let map, marker, circle, location, zoom, infoWindow;
let markers = []
let bounds = new google.maps.LatLngBounds()
let mapDefaults = {
	coordinates: {
		lat: 41.881832,
		lng: -87.623177
	},
	mapOptions: {
		zoom: 11,
		disableDefaultUI: false,
		draggable: true,		
		scrollwheel: false,
	  zoomControl: true,
	  mapTypeControl: false,
	  scaleControl: false,
	  streetViewControl: false,
	  rotateControl: false,
	  fullscreenControl: false,		
		mapTypeId: 'roadmap',
		center: null
	},
	circleDefaults: {
	  strokeColor: '#2d89ef',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#2d89ef',
	  fillOpacity: 0.35,
	  center: null,
	  radius: 10				
	},
	iconDefaults: {
		path: google.maps.SymbolPath.CIRCLE,
		scale: 6,
		strokeWeight: 2,
		strokeColor: '#000000',
		fillColor: '#2d89ef',
		fillOpacity: 0.8				
	},
	dataDefaults: {
		clickable: true,
		strokeColor: '#2d89ef',
		strokeWeight: 1.5,
		strokeOpacity: 1,
		fillColor: 'transparent',
		fillOpacity: 0.55
	},
	subareaDefaults: {
		clickable: true,
		strokeColor: '#000',
		strokeWeight: 1.5,
		strokeOpacity: 0.8,
		fillColor: 'grey',
		fillOpacity: 0.2
	},
	poiOff: [{
		featureType: "poi", 
		stylers: [{ visibility: "off" }],
		name: 'Clear'
	}]	
}

class Map extends Component {
	constructor(props) {
		super(props)
		this.initialState = {
			accounts: [],
			coordinates: []
    };
    this.state = this.initialState;
  }
  componentDidMount() {
  	this.loadMap().then(_=> {
  		setTimeout(_=> { 
  			this.setViewport();
  		}, 500)
  	});
  }
  componentDidUpdate(prevProps, prevState) {
	  if(prevProps.accounts !== this.props.accounts) {
	    this.setState({accounts: this.props.accounts});
	  }  	
	  if(prevProps.coordinates !== this.props.coordinates) {
	    this.setState({coordinates: this.props.coordinates});
	  }
  }
  loadMap() {
  	return new Promise(resolve => {
			map = new google.maps.Map(document.getElementById('map'), {...mapDefaults.mapOptions})
			resolve();  		
  	})
	}
	setViewport() {
		if(this.state.coordinates.length) {
			this.state.coordinates.forEach(coordinate => {
				this.createMarker(coordinate);
			})
			this.plotMarkers();		
			this.fitBounds();	
		} else {
			map.setCenter(new google.maps.LatLng(mapDefaults.coordinates.lat, mapDefaults.coordinates.lng))
		}
	}
	setStreetview(coordinates) {
		let element = document.getElementById('streetview')
	  let request = { origin: coordinates, destination: coordinates, travelMode: google.maps.DirectionsTravelMode.DRIVING }

    new google.maps.DirectionsService().route(request, function(results, status) {
		  if(status == google.maps.DirectionsStatus.OK) {
		    new google.maps.StreetViewService().getPanoramaByLocation(results.routes[0].legs[0].start_location, 50, function(data, status) {
			    let heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, coordinates)
					let streetview = new google.maps.StreetViewPanorama(element, {
						disableDefaultUI: true,
						position: data.location.latLng,
						pov: { heading: heading, pitch: 0, zoom: 1 }
					})
		    })				    
		  }
    })
	}
	setStyle() {
		let styledMapType = new google.maps.StyledMapType(MapDefaults.poiOff)
		map.mapTypes.set('Clear', styledMapType)
    map.setMapTypeId('Clear')	
	}
	setMapListeners() {
		google.maps.event.addListener(map, 'zoom_changed', function() {
			let zoom = map.getZoom()
		})
	}
	setDataListeners() {
		map.data.addListener('mouseover', function(event) {
		})
		map.data.addListener('click', function(event) {
		})		
	}
	createMarker(coordinate) {
		return new Promise(resolve => {
			bounds.extend(coordinate.geometry.location);
			marker = new google.maps.Marker({ 
				position: coordinate.geometry.location,
				accountId: coordinate.account.id,
				animation: google.maps.Animation.DROP
			})			
			markers = [...markers, marker]
			resolve();
		})
	}
	plotMarkers() {
		for(let i = 0; i < markers.length; i++) {
			markers[i].setMap(map)
		}
	}
	clearMarkers() {
		let i = markers.length;
		while(i--) {
			markers[i].setMap(null)
		}
	  markers = []
	}
	createInfoWindow(coordinates) {
		infoWindow =  new google.maps.InfoWindow({
			content: 'Sup',
			position: coordinates
		});				
		marker.addListener('mouseover', function() {
		  infoWindow.open(map, this);
		});
		marker.addListener('mouseout', function() {
		  infoWindow.close();
		});	
	}
	extendBounds() {
		map.data.forEach(function(feature){
		  feature.getGeometry().forEachLatLng(function(latlng) {
		    bounds.extend(latlng)
		  })
		})
	}
	fitBounds() {
		map.fitBounds(bounds);
	}
	addGeoJsonLayer(geojson) {
		map.data.addGeoJson(geojson)
		map.data.setStyle(MapDefaults.dataDefaults)
	}
	clearGeoJsonLayers() {
		map.data.forEach(function(feature) {
    	map.data.remove(feature)
		})
	}
	onMouseEnter(account, e) {
		if(markers.length) {
			let activeMarker = markers.find(marker => marker.accountId == account);
			if(activeMarker.getAnimation() !== null) {
	      activeMarker.setAnimation(null);
	    } else {
	      activeMarker.setAnimation(google.maps.Animation.BOUNCE);
	    }
		}		
	}
	onMouseLeave(account, e) {
		if(markers.length) {
			markers.find(marker => marker.accountId == account).setAnimation(null);
		}
	} 
  render() {
  	const { accounts } = this.state;
  	let accountList = accounts.length ? accounts.map(account => {
  		return (
				<div key={account.id} className="card mb-3" onMouseEnter={this.onMouseEnter.bind(this, account.id)} onMouseLeave={this.onMouseLeave.bind(this, account.id)}>
				  <img className="card-img-top" />
				  <div className="card-body">
				    <h5 className="card-title">{account.bank_name}</h5>
				    <h6 className="card-subtitle mb-2 text-muted">{account.bank_address}</h6>
				    <p className="card-text"><small className="text-muted small">Last updated {moment(account.updated_at).format('MM/DD/YYYY')}</small></p>
				  </div>
				</div>  			
  		)
  	}) : (
  		<div className="d-flex justify-content-center align-items-center">
  			<span style={{lineHeight: 500 + 'px'}}><Link to="/new" className="btn btn-outline-primary">Create An Account</Link></span>
  		</div>
  	)
  	return (
  		<Fragment>
  			<div id="map-container" className="row">
  				<div id="map" className="col-sm"></div>
  				<div id="sidebar" className="col-sm">{accountList}</div>
  			</div>
  		</Fragment>
  	)
  }
}

export default connect()(Map);
