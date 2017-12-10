import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';

const Hero = () => (
  <article className="article">
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">How can we help you?</h1>
      </div>
      <p className="hero-tagline">Feel free to contact us if you have any questions</p>
    </section>
  </article>
    );

const Contact = () => (
  <article className="article article-dark">
    <h2 className="article-title text-center no-margin-top">Contact Us</h2>
    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-transparent">
            <div className="box-body padding-lg-h">
              <h4>Get In Touch</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur necessitatibus ea possimus est quis cumque vel saepe. Eum, quas, ducimus.</p>
              <div className="divider divider-solid" />
              <p>123 Mountain View <br /> Santa Clara, C.A. <br /> USA</p>
              <div className="divider divider-solid" />
              <p>
                <strong>E:</strong> mail@site.com
                <br />
                <strong>P:</strong> +1 234 56789
                <br />
                <strong>S:</strong> www.site.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-transparent">
            <div className="box-body padding-lg-h">
              <h4>Contact</h4>
              <form name="contactForm">
                <div className="form-group">
                  <TextField
                    hintText="Name"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    hintText="Email"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    hintText="Message"
                    fullWidth
                    multiLine
                    rows={3}
                  />
                </div>
                <div className="divider" />
                <RaisedButton primary label="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Contact /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
