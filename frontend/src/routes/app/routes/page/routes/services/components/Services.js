import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1 className="hero-title">Services We Provide</h1>
    </div>
    <p className="hero-tagline">We provide amazing solutions that you can't miss</p>
  </section>
);

const Services = () => (
  <article className="article padding-lg-v article-dark article-bordered">

    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">create</i></a>
                </div>
                <h3>Web Design</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">code</i></a>
                </div>
                <h3>Development</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">laptop</i></a>
                </div>
                <h3>Website</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">camera_alt</i></a>
                </div>
                <h3>Photography</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">phone_iphone</i></a>
                </div>
                <h3>Mobile App</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-body">
              <div className="icon-box ibox-plain ibox-center">
                <div className="ibox-icon">
                  <a href="javascript:;"><i className="material-icons">language</i></a>
                </div>
                <h3>Marketing</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia.</p>
              </div>
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
      <div key="2"><Services /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;

