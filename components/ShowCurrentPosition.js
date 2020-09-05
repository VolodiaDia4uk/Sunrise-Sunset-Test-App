import React,{Component} from 'react';
import { Container, Footer, Item, Input, Icon, Button, Text,View,FooterTab } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 
const ShowCurrentPosition = ({getCurrentLocationInfo}) =>{
  return(
      <Footer style={{backgroundColor:'#fff',height:60}}>
          <FooterTab style={{backgroundColor:'#fff'}}>
            <Button style={{display:'flex'}} onPress={()=>getCurrentLocationInfo()}>
              <Entypo name="location" size={24} color="#419fc1" />
              <Text>
                Find ME
              </Text>
            </Button>
          </FooterTab>
        </Footer>
  )
}
export default ShowCurrentPosition