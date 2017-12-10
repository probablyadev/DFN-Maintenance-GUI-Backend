import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

const ListExampleSimple = () => (
  <section className="box box-default">
    <div className="box-header">Contact list</div>
    <div className="box-body">

      <List>
        <ListItem
          primaryText="Chelsea Otakan"
          leftIcon={<ActionGrade color={pinkA200} />}
          rightAvatar={<Avatar src="assets/images-demo/avatars/chexee-128.jpg" />}
        />
        <ListItem
          primaryText="Eric Hoffman"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/kolage-128.jpg" />}
        />
        <ListItem
          primaryText="James Anderson"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/jsa-128.jpg" />}
        />
        <ListItem
          primaryText="Kerem Suer"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/kerem-128.jpg" />}
        />
      </List>
      <Divider inset />
      <List>
        <ListItem
          primaryText="Adelle Charles"
          leftAvatar={
            <Avatar
              color={pinkA200} backgroundColor={transparent}
              style={{left: 8}}
                        >
                            A
                        </Avatar>
                    }
          rightAvatar={<Avatar src="assets/images-demo/avatars/adellecharles-128.jpg" />}
        />
        <ListItem
          primaryText="Adham Dannaway"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/adhamdannaway-128.jpg" />}
        />
        <ListItem
          primaryText="Allison Grayce"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/allisongrayce-128.jpg" />}
        />
        <ListItem
          primaryText="Angel Ceballos"
          insetChildren
          rightAvatar={<Avatar src="assets/images-demo/avatars/angelceballos-128.jpg" />}
        />
      </List>

    </div>
  </section>
);

export default ListExampleSimple;
