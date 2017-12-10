import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Fullscreen = () => (
  <section className="container-fluid">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <div className="article-title">Blank</div>
      </div>
    </QueueAnim>

  </section>
);

module.exports = Fullscreen;
