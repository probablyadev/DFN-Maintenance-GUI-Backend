import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Main = () => (
    <div>PLACEHOLDER</div>
);

const Dashboard = () => (
    <div className='container-fluid no-breadcrumbs page-dashboard'>

        <QueueAnim type='bottom' className='ui-animate'>
            <Main />
        </QueueAnim>

    </div>
);

module.exports = Dashboard;
