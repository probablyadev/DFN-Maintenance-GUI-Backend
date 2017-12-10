import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const MenuExampleSimple = () => (
  <div className="box box-default">
    <div className="box-header">Simple examples</div>
    <div className="box-body">
      <Paper style={style}>
        <Menu>
          <MenuItem primaryText="Maps" />
          <MenuItem primaryText="Books" />
          <MenuItem primaryText="Flights" />
          <MenuItem primaryText="Apps" />
        </Menu>
      </Paper>
      <Paper style={style}>
        <Menu>
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help &amp; feedback" />
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Sign out" />
        </Menu>
      </Paper>
    </div>
  </div>
);

const MenuExampleDisable = () => (
  <div className="box box-default">
    <div className="box-header">Disabled items</div>
    <div className="box-body">
      <Paper style={style}>
        <Menu desktop>
          <MenuItem primaryText="Back" />
          <MenuItem primaryText="Forward" disabled />
          <Divider />
          <MenuItem primaryText="Recently closed" disabled />
          <MenuItem primaryText="Google" disabled />
          <MenuItem primaryText="YouTube" />
        </Menu>
      </Paper>
      <Paper style={style}>
        <Menu desktop>
          <MenuItem primaryText="Undo" />
          <MenuItem primaryText="Redo" disabled />
          <Divider />
          <MenuItem primaryText="Cut" disabled />
          <MenuItem primaryText="Copy" disabled />
          <MenuItem primaryText="Paste" />
        </Menu>
      </Paper>
    </div>
  </div>
);

//
const iconsStyle = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};
const MenuExampleIcons = () => (
  <div className="box box-default">
    <div className="box-header">Icons example</div>
    <div className="box-body">
      <Paper style={iconsStyle.paper}>
        <Menu>
          <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
          <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
          <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
          <Divider />
          <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
          <MenuItem primaryText="Download" leftIcon={<Download />} />
          <Divider />
          <MenuItem primaryText="Remove" leftIcon={<Delete />} />
        </Menu>
      </Paper>
      <Paper style={iconsStyle.paper}>
        <Menu>
          <MenuItem primaryText="Clear Config" />
          <MenuItem primaryText="New Config" rightIcon={<PersonAdd />} />
          <MenuItem primaryText="Project" rightIcon={<FontIcon className="material-icons">settings</FontIcon>} />
          <MenuItem
            primaryText="Workspace"
            rightIcon={
              <FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>
                        }
                    />
          <MenuItem primaryText="Paragraph" rightIcon={<b style={iconsStyle.rightIcon}>¶</b>} />
          <MenuItem primaryText="Section" rightIcon={<b style={iconsStyle.rightIcon}>§</b>} />
        </Menu>
      </Paper>
    </div>
  </div>
);

//
const secondaryTextStyle = {
  display: 'inline-block',
  float: 'left',
  margin: '16px 32px 16px 0',
};

const MenuExampleSecondary = () => (
  <div className="box box-default">
    <div className="box-header">Secondary text</div>
    <div className="box-body">
      <Paper style={secondaryTextStyle}>
        <Menu desktop width={256}>
          <MenuItem primaryText="Bold" secondaryText="&#8984;B" />
          <MenuItem primaryText="Italic" secondaryText="&#8984;I" />
          <MenuItem primaryText="Underline" secondaryText="&#8984;U" />
          <MenuItem primaryText="Strikethrough" secondaryText="Alt+Shift+5" />
          <MenuItem primaryText="Superscript" secondaryText="&#8984;." />
          <MenuItem primaryText="Subscript" secondaryText="&#8984;," />
          <Divider />
          <MenuItem primaryText="Paragraph styles" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Align" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Line spacing" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Numbered list" rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="List options" rightIcon={<ArrowDropRight />} />
          <Divider />
          <MenuItem primaryText="Clear formatting" secondaryText="&#8984;/" />
        </Menu>
      </Paper>
      <Paper style={secondaryTextStyle}>
        <Menu desktop width={256}>
          <MenuItem primaryText="Open" secondaryText="Cmd + O" />
          <MenuItem primaryText="Paste in place" secondaryText="Shift + V" />
          <MenuItem primaryText="Research" secondaryText="Opt + Shift + Cmd + I" />
        </Menu>
      </Paper>
      <Paper style={secondaryTextStyle}>
        <Menu desktop width={256}>
          <MenuItem primaryText="Open" secondaryText="&#8984;O" />
          <MenuItem primaryText="Paste in place" secondaryText="&#8679;&#8984;V" />
          <MenuItem primaryText="Research" secondaryText="&#8997;&#8679;&#8984;I" />
        </Menu>
      </Paper>
    </div>
  </div>
);


const MenuSection = () => (
  <article className="article">
    <h2 className="article-title">Material Menu</h2>

    <div className="row">
      <div className="col-xl-6">
        <MenuExampleSimple />
      </div>
      <div className="col-xl-6">
        <MenuExampleDisable />
      </div>
    </div>
    <div className="row">
      <div className="col-xl-6">
        <MenuExampleIcons />
      </div>
      <div className="col-xl-6">
        <MenuExampleSecondary />
      </div>
    </div>
  </article>
);

module.exports = MenuSection;
