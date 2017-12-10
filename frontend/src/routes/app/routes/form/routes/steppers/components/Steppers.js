import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HorizontalLinear from './HorizontalLinear';
import VerticalLinear from './VerticalLinear';
import HonrizontalNonLinear from './HonrizontalNonLinear';
import VerticalNonLinear from './VerticalNonLinear';


const Stepper = () => (
  <div className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><HorizontalLinear /></div>
      <div key="2"><VerticalLinear /></div>
      <div key="3"><HonrizontalNonLinear /></div>
      <div key="4"><VerticalNonLinear /></div>
    </QueueAnim>
  </div>
);

module.exports = Stepper;
