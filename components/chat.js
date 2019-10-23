import React from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const pc = new RTCPeerConnection(configuration);
const dataChannelOptions = {
  ordered: false, // do not guarantee order
  maxPacketLifeTime: 3000, // in milliseconds
};

var channel = pc.createDataChannel('my channel', dataChannelOptions);
// console.log(RTCSessionDescription());
// pc.addIceCandidate(new RTCIceCandidate(channel.data));
console.log(channel);
channel.onmessage = function(event) {
  console.log('received: ' + event.data);
};

channel.onopen = function() {
  console.log('datachannel open');
};

channel.onclose = function() {
  console.log('datachannel close');
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      myText: 'My Original Text',
    };
  }

  updateText = () => {
    this.setState({myText: 'My Changed Text'});
  };

  render() {
    return (
      <View>
        <Text> Type your message</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({input: text})}
        />
        <Button
          title="Press me"
          onPress={() => console.log('Your message: ' + this.state.input)}
        />
        <Text onPress={this.updateText}>{this.state.myText}</Text>
      </View>
    );
  }
}
