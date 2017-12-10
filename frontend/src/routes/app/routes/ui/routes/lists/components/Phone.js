import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const ListExampleSimple = () => (
  <section className="box box-default">
    <div className="box-header">Simple list</div>
    <div className="box-body">

      <List>
        <ListItem
          leftIcon={<CommunicationCall color={indigo500} />}
          rightIcon={<CommunicationChatBubble />}
          primaryText="(650) 555 - 1234"
          secondaryText="Mobile"
        />
        <ListItem
          insetChildren
          rightIcon={<CommunicationChatBubble />}
          primaryText="(323) 555 - 6789"
          secondaryText="Work"
        />
      </List>
      <Divider inset />
      <List>
        <ListItem
          leftIcon={<CommunicationEmail color={indigo500} />}
          primaryText="aliconnors@example.com"
          secondaryText="Personal"
        />
        <ListItem
          insetChildren
          primaryText="ali_connors@example.com"
          secondaryText="Work"
        />
      </List>

    </div>
  </section>
);

export default ListExampleSimple;
