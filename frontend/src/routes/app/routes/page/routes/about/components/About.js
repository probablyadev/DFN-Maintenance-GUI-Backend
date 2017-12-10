import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b2.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">About Us</h1>
      </div>
      <p className="hero-tagline">Everything you need to know about our Company</p>
    </div>
  </section>
);

const Info = () => (
  <div className="container-fluid with-maxwidth">
    <article className="article">
      <div className="row stat-container">
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">10</span>
            <span className="stat-desc">Years Experience</span>
          </section>
          <p>Necessitatibus eaque, deleniti error in quam fuga et nisi facere dolore excepturi accusamus dicta reprehenderit dolor. Quo necessitatibus possimus ipsam, nesciunt aspernatur ex libero asperiores, debitis minus nostrum odio. Sunt dolore, dolorem id, iusto quia est unde a doloribus doloremque quisquam repellat nobis enim ipsam eligendi perspiciatis, provident eos aliquid. </p>
        </div>
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">200+</span>
            <span className="stat-desc">Satisfied Clients</span>
          </section>
          <p>Tempore adipisci ea accusamus odit consequuntur! Quaerat quos nemo qui ipsam accusantium, nostrum error nesciunt quibusdam velit tempore odit deleniti animi laborum sequi saepe minima atque! Nobis repellendus quos voluptatum sapiente, eveniet aliquid ex eum explicabo soluta delectus officia, dolore aspernatur, dicta nam placeat nostrum aliquam magni? Iste, hic, mollitia.</p>
        </div>
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">12</span>
            <span className="stat-desc">Kinds of Products</span>
          </section>
          <p>Nostrum, laudantium minima nam dolorum quasi, ut sunt, dolore ratione suscipit sequi vero ducimus earum praesentium odit aut amet voluptates, sint doloribus omnis. Dignissimos, similique neque praesentium mollitia, libero delectus in adipisci ex nihil laborum iure quaerat magnam obcaecati repellendus exercitationem explicabo! Eum, ut voluptatum sapiente dignissimos unde quae eos quis mollitia, voluptate, dolores excepturi? </p>
        </div>
      </div>
    </article>
  </div>
);

const Culture = () => (
  <article className="article padding-lg-v article-bordered">
    <div className="container-fluid with-maxwidth">
      <div className="row">
        <div className="col-xl-3">
          <h5 className="no-margin-top">OUR CULTURE</h5>
        </div>
        <div className="col-xl-9">
          <div className="row">
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-primary" /><strong>Strong sense of purpose</strong> <br />We want to help everyone build their brands and identity online.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-info" /><strong>Relentless focus on success</strong> <br />Get rid of your excuses. Take pride in getting shit done.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-success" /><strong>New ideas on how to do things better</strong> <br />Question everything. Don't fall into the status-quo trap. Innovate!</p>
            </div>
          </div>
          <div className="divider divider-lg" />
          <div className="row">
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-warning" /><strong>High bar for quality</strong> <br />We're obsessed with building the best and always see room for improvement.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-danger" /><strong>Embrace the challenge</strong> <br />Uncertainty is always part of a startup. We tackle big ideas with courage.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-color-dark" /><strong>Simplify</strong> <br />To create the best experience, we cut all distractions and get to the point.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </article>
);

const About = () => (
  <section className="page-about chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Info /></div>
      <div key="3"><Culture /></div>
    </QueueAnim>
  </section>
);

module.exports = About;
