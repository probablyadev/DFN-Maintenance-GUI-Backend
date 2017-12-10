import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import QueueAnim from 'rc-queue-anim';


const mWidthStyle = {
  minWidth: '135px'
};

const FAB = () => (
  <div className="row">
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">FAB</div>
        <div className="box-body text-center">

          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
          <span className="space" />

          <FloatingActionButton mini>
            <ContentAdd />
          </FloatingActionButton>
          <span className="space space-md" />

          <FloatingActionButton secondary>
            <ContentAdd />
          </FloatingActionButton>
          <span className="space" />

          <FloatingActionButton mini secondary>
            <ContentAdd />
          </FloatingActionButton>
          <span className="space space-md" />

          <FloatingActionButton disabled>
            <ContentAdd />
          </FloatingActionButton>
          <span className="space" />

          <FloatingActionButton mini disabled>
            <ContentAdd />
          </FloatingActionButton>

        </div>
      </div>

    </div>
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">Icon Button</div>
        <div className="box-body text-center">

          <IconButton> <ContentAdd /> </IconButton>
          <span className="space" />

          <IconButton> <ContentAdd /> </IconButton>
          <span className="space" />

          <IconButton disabled> <ContentAdd /> </IconButton>

        </div>
      </div>

    </div>
  </div>
);

const Raised = () => (
  <div className="row">
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">Raised</div>
        <div className="box-body text-center">
          <RaisedButton style={mWidthStyle} label="Default" /><div className="divider" />
          <RaisedButton style={mWidthStyle} label="Primary" primary /><div className="divider" />
          <RaisedButton style={mWidthStyle} label="Secondary" secondary /><div className="divider" />
          <RaisedButton style={mWidthStyle} label="Disabled" disabled /><div className="divider" />
        </div>
      </div>

    </div>
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">Flat</div>
        <div className="box-body text-center">
          <FlatButton style={mWidthStyle} label="Default" /><div className="divider" />
          <FlatButton style={mWidthStyle} label="Primary" primary /><div className="divider" />
          <FlatButton style={mWidthStyle} label="Secondary" secondary /><div className="divider" />
          <FlatButton style={mWidthStyle} label="Disabled" disabled /><div className="divider" />
        </div>
      </div>

    </div>
  </div>
);

const Raised2 = () => (
  <div className="row">
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">Raised</div>
        <div className="box-body text-center">
          <RaisedButton style={mWidthStyle} label="Left Icon" labelPosition="after" primary icon={<ContentAdd />} /><div className="divider" />
          <RaisedButton style={mWidthStyle} label="Right Icon" labelPosition="before" secondary icon={<ContentAdd />} /><div className="divider" />
          <RaisedButton style={mWidthStyle} label="Link Button" href="https://github.com/" target="_blank" secondary /><div className="divider" />
        </div>
      </div>

    </div>
    <div className="col-xl-5">

      <div className="box box-default">
        <div className="box-header">Flat</div>
        <div className="box-body text-center">
          <FlatButton style={mWidthStyle} label="Left Icon" labelPosition="after" primary icon={<ContentAdd />} /><div className="divider" />
          <FlatButton style={mWidthStyle} label="Right Icon" labelPosition="before" secondary icon={<ContentAdd />} /><div className="divider" />
          <FlatButton style={mWidthStyle} label="Link Button" href="https://github.com/" target="_blank" secondary /><div className="divider" />
        </div>
      </div>

    </div>
  </div>
);

const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Material Buttons</h2>

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><FAB /></div>
        <div key="2"><Raised /></div>
        <div key="3"><Raised2 /></div>
      </QueueAnim>

    </article>
  </section>
);

module.exports = Page;
