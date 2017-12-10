import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const ListExampleChat = () => (
  <section className="box box-default">
    <div className="box-header">Chat list</div>
    <div className="box-body">

      <List>
        <Subheader>Recent chats</Subheader>
        <ListItem
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src="assets/images-demo/avatars/chexee-128.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Eric Hoffman"
          leftAvatar={<Avatar src="assets/images-demo/avatars/kolage-128.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Grace Ng"
          leftAvatar={<Avatar src="assets/images-demo/avatars/jsa-128.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Kerem Suer"
          leftAvatar={<Avatar src="assets/images-demo/avatars/kerem-128.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
        <ListItem
          primaryText="Raquel Parrado"
          leftAvatar={<Avatar src="assets/images-demo/avatars/adellecharles-128.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </List>
      <Divider />
      <List>
        <Subheader>Previous chats</Subheader>
        <ListItem
          primaryText="Chelsea Otakan"
          leftAvatar={<Avatar src="assets/images-demo/avatars/adhamdannaway-128.jpg" />}
        />
        <ListItem
          primaryText="James Anderson"
          leftAvatar={<Avatar src="assets/images-demo/avatars/angelceballos-128.jpg" />}
        />
      </List>

    </div>
  </section>
);

export default ListExampleChat;
