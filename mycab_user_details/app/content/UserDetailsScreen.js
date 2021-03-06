import React, { Component } from 'react';
import { View, Image, ImageBackground,Button, Text, Switch, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import styles from '../styles/userdetails-styles';
import ImagePicker from 'react-native-image-picker';

export default class UserDetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: "abc xyz",
      age: 21,
      sex: "M",
      rating: 5,
      email: "me@email.com",
      mobNo: "9845098450",
      allowNot: true,
      sendOffers: true,
      nameedit: false,
      emailedit: false,
      mobNoedit: false,
      image: require('../images/user.png')
    }
  }

  toggleNotifications = (value) => {
    this.setState({ allowNot: value })
  }

  updateAction() {
    alert('Details updated successfully')
  }

  updateImage() {
    const options = {
      title: 'Select Image',
      maxWidth: 800, maxHeight: 600,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          image: source,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={() => this.updateImage()} style={styles.imageContainer}>
            <ImageBackground source={this.state.image} style={{ flex: 1, width: null, height: null, }}>
              <View style={{backgroundColor: 'green', width: 40, height: 40, borderRadius: 40, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                <Text style={{justifyContent: 'center',justifyContent:'center', alignSelf: 'center', color: 'white', fontSize: 35}}>+</Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        </View>

        <View style={styles.bodyContainer}>

          <View style={styles.tabContainer}>
            <Image source={require('../icons/user.png')} style={styles.itemIcon}></Image>
            <TextInput index style={styles.h1} editable={this.state.nameedit} value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
            <TouchableOpacity onPress={() => this.setState({ nameedit: true })}>
              <Image source={require('../icons/edit.png')} style={styles.editIcon}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <Image source={require('../icons/email.png')} style={styles.itemIcon}></Image>
            <TextInput style={styles.h1} editable={this.state.emailedit}> {this.state.email} </TextInput>
            <TouchableOpacity onPress={() => this.setState({ emailedit: true })}>
              <Image source={require('../icons/edit.png')} style={styles.editIcon}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <Image source={require('../icons/mobile1.png')} style={styles.itemIcon}></Image>
            <TextInput style={styles.h1} editable={this.state.mobNoedit}> {this.state.mobNo} </TextInput>
            <TouchableOpacity onPress={() => this.setState({ mobNoedit: true })}>
              <Image source={require('../icons/edit.png')} style={styles.editIcon}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <Text style={styles.h1}> Notify me </Text>
            <Switch thumbColor="green" value={this.state.allowNot} onValueChange={(val) => this.toggleNotifications(val)}></Switch>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save" disabled={!this.state.nameedit && !this.state.emailedit && !this.state.mobNoedit}></Button>
        </View>
      </View>
    )
  }
}
