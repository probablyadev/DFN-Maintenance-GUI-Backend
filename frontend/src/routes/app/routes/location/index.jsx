import React from 'react';
import QueueAnim from 'rc-queue-anim';

import StatusPanel from './StatusPanel';
import Index from './Map/index';

const Location = () => (
    <div className='container-fluid with-maxwidth no-breadcrumbs chapter page-dashboard'>
        <QueueAnim type='bottom' className='ui-animate'>
            <div key='1'><StatusPanel /></div>
            <div key='2'><Index /></div>
        </QueueAnim>
    </div>
);

export default Location;
