import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Menu from './Menu';
import IconMenu from './IconMenu';
import DropdownMenu from './DropdownMenu';

const Menus = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Menu /></div>
      <div key="2"><IconMenu /></div>
      <div key="3"><DropdownMenu /></div>
    </QueueAnim>
  </section>
);

module.exports = Menus;
