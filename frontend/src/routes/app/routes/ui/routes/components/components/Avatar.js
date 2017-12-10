import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';
// Replaced FontIcon with local material-design-iconic-font
const AvatarExampleSimple = () => (
  <List>
    <ListItem
      disabled
      leftAvatar={
        <Avatar src="assets/images-demo/avatars/uxceo-128.jpg" />
            }
        >
        Image Avatar
    </ListItem>
    <ListItem
      disabled
      leftAvatar={
        <Avatar icon={<i className="material-icons">camera</i>} />
            }
        >
        FontIcon Avatar
    </ListItem>
    <ListItem
      disabled
      leftAvatar={
        <Avatar
          icon={<i className="material-icons">camera</i>}
          color={blue300}
          backgroundColor={indigo900}
                />
            }
        >
        FontIcon Avatar with custom colors
    </ListItem>
    <ListItem
      disabled
      leftAvatar={
        <Avatar icon={<FileFolder />} />
            }
        >
        SvgIcon Avatar
    </ListItem>
    <ListItem
      disabled
      leftAvatar={
        <Avatar
          icon={<FileFolder />}
          color={orange200}
          backgroundColor={pink400}
                />
            }
        >
        SvgIcon Avatar with custom colors
    </ListItem>
    <ListItem
      disabled
      leftAvatar={<Avatar>A</Avatar>}
        >
        Letter Avatar
    </ListItem>
    <ListItem
      disabled
      leftAvatar={
        <Avatar
          color={deepOrange300}
          backgroundColor={purple500}
                >
                    A
                </Avatar>
            }
        >
        Letter Avatar with custom colors
    </ListItem>
  </List>
);

const AvatarSection = () => (
  <article className="article">
    <h2 className="article-title">Material Avatar</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <AvatarExampleSimple />
      </div>
    </section>
  </article>
);

module.exports = AvatarSection;
