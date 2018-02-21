import React from 'react';
import QueueAnim from 'rc-queue-anim';
import StatusPanel from './StatusPanel/StatusPanel';
import HDDTable from './HDDTable/HDDTable';

const Storage = () => (
    <div className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
            <div key="1"><StatusPanel/></div>
            <div key="2"><HDDTable/></div>
        </QueueAnim>
    </div>
);

module.exports = Storage;
