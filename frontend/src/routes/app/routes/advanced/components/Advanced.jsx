import React from 'react';
import QueueAnim from 'rc-queue-anim';

import Updates from './Updates';
import Config from './Config/Config';

const Advanced = () => (
    <div className='container-fluid with-maxwidth chapter'>
        <article className='article'>
            <h2 className='article-title'>Advanced</h2>

            <QueueAnim type='bottom' className='ui-animate'>
                <div key='1'><Updates /></div>
                <div key='2'><Config /></div>
            </QueueAnim>

        </article>
    </div>
);

export default Advanced;
