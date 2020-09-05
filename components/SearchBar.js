import React,{Component} from 'react';
import { Container, Header,  Item, Input, Icon, Button, Text,View, List } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 

export default function SearchBar({inputValue,onChangeLocation,clearInput}){
  return(
    <Header searchBar rounded style={{backgroundColor:'#419fc1',height:60}}>
      <Item style={{backgroundColor:'#fff'}}>
        <Input placeholder="Please Input Location" value={inputValue}
        onBlur={()=>clearInput()} 
        onChangeText={(text)=>onChangeLocation(text)}
        />
      </Item>
    </Header>
  )
}
