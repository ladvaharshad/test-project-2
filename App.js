/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Container, List, ListItem, Header, Text, Content,Body, Title, Form, Item, Input, Label, Button } from 'native-base';
import { StyleSheet } from 'react-native';
export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      countyName: '',
      data: []
    }
  }

  getData = () => { 
     fetch('https://restcountries.eu/rest/v2/name/'+this.state.countyName, { method: 'GET' })
     .then(res => res.json())
     .then((responseJson) => {
       console.log(responseJson);
       this.setState({ data: responseJson });
       return responseJson;
     }) 
     .catch(error => {
      console.log(error);
     });
  }

  getDetail = (item) => {
    console.log('item>>', item);
    // navigation.navigate('Details');
  } 

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Country</Title>
          </Body>
        </Header>
        <Content>
            <Item>
              <Input value={this.state.countyName} onChangeText={(value)=>this.setState({countyName:value})} style={styles.input} placeholder="Enter country"/>
            </Item>
            <List>
              {
                this.state.data.map((item, index) => {
                  return <ListItem onPress={() => this.getDetail(item)}><Text>
                    { item.name }
                  </Text></ListItem>  
                })
              }
            </List>
            <Button onPress={this.getData} disabled={ !this.state.countyName } style={styles.submitButton} rounded full>
              <Text>Submit</Text>
            </Button> 
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 12,
    margin: 12
  },
  input: {
    margin: 12,
    padding: 12
  }
});