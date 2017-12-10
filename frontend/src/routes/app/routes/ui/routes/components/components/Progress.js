import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import LinearProgress from 'material-ui/LinearProgress';

const CircularProgressExampleSimple = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Indeterminate progress</div>
      <div className="box-body">
        <CircularProgress />
        <CircularProgress size={60} thickness={7} />
        <CircularProgress size={80} thickness={5} />
      </div>
    </div>
  </div>
);

class CircularProgressExampleDeterminate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Determinate progress</div>
          <div className="box-body">
            <CircularProgress mode="determinate" value={this.state.completed} />
            <CircularProgress mode="determinate" value={this.state.completed} size={60} thickness={7} />
            <CircularProgress mode="determinate" value={this.state.completed} size={80} thickness={5} />
          </div>
        </div>
      </div>
    );
  }
}

const LinearProgressExampleSimple = () => (
  <div className="box box-transparent">
    <div className="box-header">Indeterminate progress</div>
    <div className="box-body">
      <LinearProgress mode="indeterminate" />
    </div>
  </div>
);

class LinearProgressExampleDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Indeterminate progress</div>
        <div className="box-body">
          <LinearProgress mode="determinate" value={this.state.completed} />
        </div>
      </div>
    );
  }
}

const ProgressSection = () => (
  <article className="article">
    <h2 className="article-title">Material Progress</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <CircularProgressExampleSimple />
            <CircularProgressExampleDeterminate />
          </div>

          <div className="divider divider-xl divider-dashed" />
          <LinearProgressExampleSimple />

          <div className="divider divider-xl divider-dashed" />
          <LinearProgressExampleDeterminate />

        </div>
      </div>
    </section>
  </article>
    );

module.exports = ProgressSection;
