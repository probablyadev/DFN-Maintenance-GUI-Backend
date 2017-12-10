import React from 'react';
import QueueAnim from 'rc-queue-anim';

const FullWidth = () => (
  <section className="container-fluid">
    <ul className="breadcrumb">
      <li className="breadcrumb-item"><a href="javascript:;">Page</a></li>
      <li className="breadcrumb-item active">Blank</li>
    </ul>
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <article className="article">
          <h2 className="article-title">Blank</h2>
        </article>
      </div>
    </QueueAnim>
  </section>
);

module.exports = FullWidth;
