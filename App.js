import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, AppRegistry, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { Icon, Badge } from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

export default class App extends Component<Props> {

  state = {
    BadgeCount: 0
  }

  constructor(props){
    super(props);
    // socket = this.socket = io('http://192.168.1.19:3000', {jsonp: false});
    const socket = this.socket = io('http://192.168.1.47:3001');
    var that = this;
    that.socket.on('show notification', function(data){
      console.log(data[0].message);
      var val = data.slice(-1).pop();
      that.setState({
        BadgeCount: that.state.BadgeCount+1,
      });
      PushNotification.localNotification({
      largeIcon: "ic_notification",
      title: "Penyiraman",
      message: val.message,
      color: val.color,
      number: '10',
      });
    })
  }

  onClickNotify = () => {
    if(this.state.BadgeCount != 0 ){
      this.setState({
        BadgeCount: 0
        })
    }
  }

  displayBadge(){
    if(this.state.BadgeCount > 0){
      return <Badge
        status="success"
        containerStyle={{ position: 'absolute', top: -5, right: -5 }}
        value={this.state.BadgeCount}
      />
    }
  }

  render() {
    return (
      <View>
      <NavBar style={styles}>
       <NavTitle style={styles.title}>
         {"App"}
       </NavTitle>
       <NavGroup style={styles.navGroup}>
         <NavButton style={styles.navButton} onPress={this.onClickNotify}>
         <Icon name='bell' type='font-awesome' color='#ffe100' raised={false}/>
         {this.displayBadge()}
         </NavButton>
       </NavGroup>
     </NavBar>
     </View>
      );
  }
}

const styles = StyleSheet.create({
  statusBar: {
   backgroundColor: '#3343BD',
 },
 navBar: {
   backgroundColor: '#fff',
 },
 title: {
   color: '#E7259C',
 },
 buttonText: {
   color: 'rgba(231, 37, 156, 0.5)',
 },
 navGroup: {
   justifyContent: 'flex-end',
 },
 navButton: {

 },
 image: {
   width: 30,
 },
});

AppRegistry.registerComponent('Plug-Plant', () => App);
