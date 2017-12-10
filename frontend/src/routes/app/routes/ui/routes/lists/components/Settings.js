import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

const ListExampleSimple = () => (
  <section className="box box-default">
    <div className="box-header">Settings list</div>
    <div className="box-body">

      <List>
        <ListItem
          primaryText="When calls and notifications arrive"
          secondaryText="Always interrupt"
        />
      </List>
      <Divider />
      <List>
        <Subheader>Priority Interruptions</Subheader>
        <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
        <ListItem primaryText="Calls" rightToggle={<Toggle />} />
        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
      </List>
      <Divider />
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
      </List>

    </div>
  </section>
);

export default ListExampleSimple;
