import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HDDTable from './HDDTable';

const Storage = () => (
    <div className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
            /*<div key="1"><StatusPanel/></div>
            <div key="2"><ActionMenu/></div>
            <div key="3"><HDDTable/></div>*/
            <HDDTable/>
        </QueueAnim>
    </div>
);

module.exports = Storage;
