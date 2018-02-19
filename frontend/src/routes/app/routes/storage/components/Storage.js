import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HDDTable from './HDDTable';

const Storage = () => (
    <div className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
            <HDDTable/>
        </QueueAnim>
    </div>
);

module.exports = Storage;
