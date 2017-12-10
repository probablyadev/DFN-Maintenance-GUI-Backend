import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={2} />
    <Paper style={style} zDepth={3} />
    <Paper style={style} zDepth={4} />
    <Paper style={style} zDepth={5} />
  </div>
);

const PaperExampleRounded = () => (
  <div>
    <Paper style={style} zDepth={1} rounded={false} />
    <Paper style={style} zDepth={2} rounded={false} />
    <Paper style={style} zDepth={3} rounded={false} />
    <Paper style={style} zDepth={4} rounded={false} />
    <Paper style={style} zDepth={5} rounded={false} />
  </div>
);

const PaperExampleCircle = () => (
  <div>
    <Paper style={style} zDepth={1} circle />
    <Paper style={style} zDepth={2} circle />
    <Paper style={style} zDepth={3} circle />
    <Paper style={style} zDepth={4} circle />
    <Paper style={style} zDepth={5} circle />
  </div>
);

const PaperSection = () => (
  <article className="article">
    <h2 className="article-title">Material Paper</h2>

    <section className="box box-default">
      <div className="box-header">Simple example</div>
      <div className="box-body">
        <PaperExampleSimple />
      </div>
    </section>
    <section className="box box-default">
      <div className="box-header">Non-rounded corners</div>
      <div className="box-body">
        <PaperExampleRounded />
      </div>
    </section>
    <section className="box box-default">
      <div className="box-header">Circular Paper</div>
      <div className="box-body">
        <PaperExampleCircle />
      </div>
    </section>
  </article>
    );

module.exports = PaperSection;
