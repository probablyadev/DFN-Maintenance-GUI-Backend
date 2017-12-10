import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Centered = () => (
  <section className="container-fluid with-maxwidth-md chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <article className="article">
          <h2 className="article-title">Blank</h2>
        </article>
      </div>
    </QueueAnim>
  </section>
);

module.exports = Centered;
