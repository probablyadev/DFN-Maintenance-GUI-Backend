import React from 'react';
import QueueAnim from 'rc-queue-anim';
import StatusPanel from './StatusPanel';
import Map from './Map/Map';

const Location = () => (
    <div className='container-fluid with-maxwidth no-breadcrumbs chapter page-dashboard'>
        <QueueAnim type='bottom' className='ui-animate'>
            <div key='1'><StatusPanel /></div>
            <div key='2'><Map /></div>
        </QueueAnim>
    </div>
);

module.exports = Location;
