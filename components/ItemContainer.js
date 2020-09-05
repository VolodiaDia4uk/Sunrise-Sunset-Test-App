import React,{Component} from 'react';
import { Container, Footer, Item, Input, Icon, Button, Text,View,FooterTab } from 'native-base';
import { Image, StyleSheet,Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function ItemContainer({provider,long,lat,sunInfo,placeName}){
  const {
    sunrise,
    sunset,
    astronomical_twilight_begin,
    civil_twilight_begin,
    nautical_twilight_begin,
    astronomical_twilight_end,
    civil_twilight_end,
    nautical_twilight_end,
    day_length,
    solar_noon
    } = sunInfo

  const sunInfoBlock = () =>{
    
  } 
  return(
    <View style={{padding:20}} >
      <Text style={styles.locationStyle}>
        {placeName}
      </Text>
      <Text  style={{marginTop:10}}>
        longitude: {long}
      </Text>
      <Text numberOfLines={1}>
        latitude: {lat}
      </Text>
      <Text numberOfLines={1}>
        day_length: {day_length}
      </Text>
      <Text numberOfLines={1}>
        solar_noon: {solar_noon}
      </Text>     
      <View style={styles.sunInfoStyles}>
        <Text numberOfLines={1} style={styles.locationStyle}>
          Sunrise
        </Text>
        <Feather name="sunrise" size={104} color="#f9be00" />
        <View style={{paddingTop:10}}>
        <Text>
          sunrise: {sunrise}
        </Text>
        <Text>
          astronomical_twilight_begin: {astronomical_twilight_begin}
        </Text>
        <Text>
          civil_twilight_begin: {civil_twilight_begin}
        </Text>
        <Text>
          nautical_twilight_begin: {nautical_twilight_begin}
        </Text>
      </View>
      </View>

      <View style={styles.sunInfoStyles}>
        <Text numberOfLines={1} style={styles.locationStyle}>
          Sunset
        </Text>
        <Feather name="sunset" size={104} color="#ce2c27" />
        <View style={{paddingTop:10}}>
          <Text>
            sunset: {sunset}
          </Text>
          <Text>
            astronomical_twilight_end: {astronomical_twilight_end}
          </Text>
          <Text>
            civil_twilight_end: {civil_twilight_end}
          </Text>     
          <Text>
            nautical_twilight_end: {nautical_twilight_end}
          </Text>
        </View>
    </View>
    <View style={styles.mapContainerStyles}>
      <MapView
          provider={provider}
          style={styles.mapStyles}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        <Marker
              key={1}
              coordinate={{latitude:lat,longitude: long}}
              pinColor={'green'}
            />    
        </MapView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  locationStyle:{
    textAlign:'center',
    fontSize:30
  },
  sunInfoStyles:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
    },
    mapContainerStyles:{
      width:'100%',
      height:height/2,
      marginTop:20  
    },
    mapStyles:{
      flex:1,borderWidth:1,
      borderRadius:15,
      borderColor:'#419fc1'
    }
})
