import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';

const ExpandableCards = () => (
  <article className="article">
    <h2 className="article-title">Expandable Card</h2>

    <div className="row">
      <div className="col-xl-4">
        <Card style={{backgroundColor: APPCONFIG.color.primary}}>
          <CardHeader
            title="Expandable card"
            subtitle="Subtitle"
            actAsExpander
            showExpandableButton
            titleColor="#fff"
            subtitleColor="#e1e1e1"
            style={{color: '#fff'}}
                        />
          <CardText
            expandable
            style={{color: '#fff'}}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions
            expandable
            style={{color: '#fff'}}
                        >
            <FlatButton label="Action1" style={{color: '#fff'}} />
            <FlatButton label="Action2" style={{color: '#fff'}} />
          </CardActions>
        </Card>
      </div>
      <div className="col-xl-4">
        <Card>
          <CardHeader
            title="Expandable card"
            subtitle="Subtitle"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions expandable>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    </div>
  </article>
);

const MaterialCards = () => (
  <article className="article">
    <h2 className="article-title">Simple Card</h2>
    <div className="row">
      <div className="col-xl-4 col-lg-6">
        <div className="card bg-color-dark">
          <div className="card-content">
            <span className="card-title">Card Dark</span>
            <p>Hey there, I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;">A link</a>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6">
        <div className="card bg-color-primary">
          <div className="card-content">
            <span className="card-title">Card Primary</span>
            <p>Hey there, I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;">A link</a>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4 col-lg-6">
        <div className="card bg-color-success">
          <div className="card-content">
            <span className="card-title">Card Accent</span>
            <p>Hey there, I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;">A link</a>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6">
        <div className="card bg-color-white">
          <div className="card-content">
            <span className="card-title">Card White</span>
            <p>Hey there, I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;" className="color-primary">A link</a>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const ImageCards = () => (
  <article className="article">
    <h2 className="article-title">Image Card</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="card card-white">
          <div className="card-image">
            <img src="assets/images-demo/assets/600_400-2.jpg" alt="" />
            <span className="card-title">Image Card</span>
          </div>
          <div className="card-content">
            <p>Hey there, I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;" className="color-primary">A link</a>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card card-white">
          <div className="card-image">
            <img src="assets/images-demo/assets/600_400-3.jpg" alt="" />
            <span className="card-title">Image Card with Pofile</span>
          </div>
          <div className="card-content">
            <a className="card-profile-img float-right" href="javascript:;"><img src="assets/images/g1.jpg" alt="" /></a>
            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;">A link</a>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card card-white">
          <div className="card-image">
            <img src="assets/images-demo/assets/600_400-1.jpg" alt="" />
            <span className="card-title">Image Card with Icon Button</span>
          </div>
          <div className="card-content">
            <a className="card-button float-right" href="javascript:;">
              <button className="btn btn-icon btn-icon-round btn-floating btn-danger"><i className="material-icons mdi-sm">favorite</i></button>
            </a>
            <p>I am a very simple card. I am good at containing small bits of information.
              I am quite convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="javascript:;">A link</a>
            <a href="javascript:;">A link</a>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><ExpandableCards /></div>
      <div key="2"><MaterialCards /></div>
      <div key="3"><ImageCards /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;

