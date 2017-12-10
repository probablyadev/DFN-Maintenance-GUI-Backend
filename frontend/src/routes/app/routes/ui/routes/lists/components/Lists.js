import React from 'react';
import QueueAnim from 'rc-queue-anim';
// Material UI
import ListExampleSimple from './Simple';
import ListExampleChat from './Chat';
import ListExampleContacts from './Contacts';
import ListExampleFolder from './Folder';
import ListExampleNested from './Nested';
import ListExampleSettings from './Settings';
import ListExamplePhone from './Phone';
import ListExampleMessages from './Messages';
import ListExampleSelectable from './Selectable';

const Lists = () => (
  <div className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <article className="article">
          <h2 className="article-title">Material Lists</h2>
          <div className="row">

            <div className="col-xl-4">
              <ListExampleSimple />
            </div>
            <div className="col-xl-4">
              <ListExampleChat />
            </div>
            <div className="col-xl-4">
              <ListExampleContacts />
            </div>

            <div className="col-xl-4">
              <ListExampleFolder />
            </div>
            <div className="col-xl-4">
              <ListExampleNested />
            </div>
            <div className="col-xl-4">
              <ListExamplePhone />
            </div>

            <div className="col-xl-4">
              <ListExampleSettings />
            </div>
            <div className="col-xl-4">
              <ListExampleMessages />
            </div>
            <div className="col-xl-4">
              <ListExampleSelectable />
            </div>

          </div>
        </article>
      </div>
    </QueueAnim>
  </div>
    );

module.exports = Lists;
