import React,{Component} from 'react';
import { Text, View, StyleSheet,ActivityIndicator,Keyboard,Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Item, Input,Content,List, ListItem, Toast, Root } from 'native-base';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import SeachBar from '../components/SearchBar'
import ShowCurrentPosition from '../components/ShowCurrentPosition'
import ItemContainer from '../components/ItemContainer'
import {SUNRISE_API, GOOGLE_API_KEY, GOOGLE_LOCATION_API, AUTOCOMPLETE_API, GOOGLE_GEOCODE_BY_LOCATION} from '../constants/index'

const { height } = Dimensions.get('window');

const FOOTTER_HEADER_HEIGHT = 60;

export default class MainPage extends Component {

  state={
    inputValue:'',
    locationLongitude:0,
    locationLatitude:0,
    citiesList:[],
    placeName:'',
    loading:false,
    sunInfo:{},
    locationError:false
  }

  onChangeLocation = async(text) =>{
    const {inputValue,longitude,latitude } = this.state
    this.setState({ inputValue:text });
    const apiKey = `${AUTOCOMPLETE_API}key=${GOOGLE_API_KEY}&input=${text}`;
    try{
      const result = await fetch(apiKey)
      const json = await result.json()
      this.setState({
        citiesList:json.predictions
      })
    }
    catch(err){
      this.showToast()
    }
  }

  componentDidMount(){
    this.getCurrentLocationInfo()
  }


  showToast=()=>{
    Toast.show({
      text: 'response failed',
      type: "danger",
      duration: 3500,
      style:{
        bottom:25,
        buttonText: "Okay"
        }
    })
    this.setState({
      loading:false
    })
  }

  showInfoByLocationId=async(locationId)=>{
    this.setState({
      loading:true,
      citiesList:[],
      locationError:false
    })
    Keyboard.dismiss()
    try{
      const response = await fetch(`${GOOGLE_LOCATION_API}place_id=${locationId}&fields=name,geometry&key=${GOOGLE_API_KEY}`) 
      const json = await response.json()
      const {lat,lng} = json.result.geometry.location
      this.setState({
        locationLongitude:lng,
        locationLatitude:lat,
        placeName:json.result.name
      })
      this.updateSunriseInfo(lat,lng)
    }
    catch(err){
      console.error(err)
    }
  }

  updateSunriseInfo=async(lat,lng)=>{
    try{
          const sunriseResponse = await fetch(`${SUNRISE_API}lat=${lat}&lng=${lng}`)
          const info = await sunriseResponse.json()
          if(info.status==='OK'){
            this.setState({
              sunInfo:info.results,
              inputValue:'',
              loading:false
            })
          }
          else{
            this.showToast()
          }

    }
    catch(err){
      console.error(err)
    }
  }

  getCurrentPlaceName = async(lat,lon)=>{
    try{
      const response = await fetch(`${GOOGLE_GEOCODE_BY_LOCATION}latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`)
      const json = await response.json()
      const adress_container = json.results[0].address_components
      this.setState({
        placeName:adress_container[3].long_name +', '+ adress_container[1].long_name
      })
    }
    catch(err){
      this.showToast()
    }
  }

  getCurrentLocationInfo=async()=>{
    this.setState({
      loading:true
    })
    await navigator.geolocation.getCurrentPosition(
      position=>{
        const {longitude,latitude} = position.coords
        this.setState({
          locationLongitude:position.coords.longitude,
          locationLatitude :position.coords.latitude,
          locationError:false 
        })
        this.getCurrentPlaceName(latitude,longitude)
        this.updateSunriseInfo(latitude,longitude)
      },
      error=>{
        console.error(error)
        this.setState({
          locationError:true,
          loading:false
        })
      }
    )

  }

  clearInput = () =>{
      this.setState({
        inputValue:'',
        citiesList:[]
      })
  }
  
  render(){
    const{citiesList,locationLatitude,locationLongitude,sunInfo,placeName,inputValue,loading,locationError} = this.state
    const items = citiesList.map(item=>
      <ListItem 
      key={item.place_id} 
      noIndent
      style={{ backgroundColor: "#cde1f9" }} 
      onPress={()=>this.showInfoByLocationId(item.place_id)}
      >
        <Text>{item.description}</Text>
      </ListItem>)

    return (
      <Root>  
        <Container >
          <SeachBar
          inputValue={inputValue}
          onChangeLocation={this.onChangeLocation}
          clearInput={this.clearInput}
          FOOTTER_HEADER_HEIGHT={FOOTTER_HEADER_HEIGHT}    
          />
          <Content style={styles.contentStyle}>        
              <List style={styles.listStyle}>
                {items}
              </List>       
            {loading?<ActivityIndicator/>:
              locationError?
              <View style={{height:height-FOOTTER_HEADER_HEIGHT * 2,justifyContent:'center'}}><Text >Sorry we can not find your current location at the moment</                  Text></View>
              :
              <ItemContainer
              long = {locationLongitude}
              lat = {locationLatitude}
              sunInfo = {sunInfo}
              placeName={placeName}
              />}
              <Text>{this.state.errorMessage}</Text>
          </Content>
          <ShowCurrentPosition getCurrentLocationInfo={this.getCurrentLocationInfo} FOOTTER_HEADER_HEIGHT={FOOTTER_HEADER_HEIGHT}/>
        </Container>
      </Root>  
    )
  }
}

const styles = StyleSheet.create({
  contentStyle:{
    backgroundColor:'#f8f4f0'
  },
  listStyle:{
    width:'100%',
    position:'absolute',
    zIndex:100
  }
})
