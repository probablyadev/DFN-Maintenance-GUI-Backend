import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';

const ListExampleSimple = () => (
  <section className="box box-default">
    <div className="box-header">Nested list</div>
    <div className="box-body">

      <List>
        <Subheader>Nested List Items</Subheader>
        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
        <ListItem
          primaryText="Inbox"
          leftIcon={<ContentInbox />}
          initiallyOpen
          primaryTogglesNestedList
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
              leftIcon={<ActionGrade />}
            />,
            <ListItem
              key={2}
              primaryText="Sent Mail"
              leftIcon={<ContentSend />}
              disabled
              nestedItems={[
                <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
              ]}
            />,
          ]}
        />
      </List>

    </div>
  </section>
);

export default ListExampleSimple;
