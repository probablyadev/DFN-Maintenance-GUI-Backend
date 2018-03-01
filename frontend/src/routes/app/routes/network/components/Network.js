import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Internet from 'Internet';
import VPN from 'VPN';

const Network = () => (
    <div className="container-fluid with-maxwidth chapter">
        <article className="article">
            <h2 className="article-title">Network</h2>

            <QueueAnim type="bottom" className="ui-animate">
                <div key="1"><Internet/></div>
                <div key="2"><VPN/></div>
            </QueueAnim>

        </article>
    </div>
);

module.exports = Network;
