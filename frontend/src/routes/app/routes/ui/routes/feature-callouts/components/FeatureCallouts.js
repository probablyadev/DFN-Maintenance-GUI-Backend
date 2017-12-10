import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';

const imgLeft = {
  backgroundImage: 'url(assets/images-demo/covers/photo-imNop2O1Rit190cSkxXv_1-7069.jpg)',
  backgroundPosition: 'center'
};
const imgRight = {
  backgroundImage: 'url(assets/images-demo/covers/photo-1455813870877-04a32045af63.jpg)',
  backgroundPosition: 'center'
};
const imgCenter = {
  backgroundImage: 'url(assets/images-demo/covers/photo-1456374407032-6e4baf58fb62.jpg)',
  backgroundPosition: 'left center'
};

const Section1 = () => (
  <div className="feature-callout feature-content-right card-white image-pull clearfix">
    <div className="container-fluid with-maxwidth">
      <div className="col-12 col-md-6 offset-md-6">
        <div className="callout-feature-content">
          <h2>Architecto odit fuga facere</h2>
          <p>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</p>
          <RaisedButton label="Try it Now" secondary />
        </div>
      </div>
    </div>
    <div className="col-12 col-md-6 feature-callout-image-pull" style={imgLeft} />
  </div>
);

const Section2 = () => (
  <div className="feature-callout feature-content-left card-white image-pull clearfix">
    <div className="container-fluid with-maxwidth">
      <div className="col-12 col-md-6">
        <div className="callout-feature-content">
          <h2>Commodi molestiae, culpa eveniet</h2>
          <p>Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam</p>
          <RaisedButton label="Try it Now" secondary />
        </div>
      </div>
    </div>
    <div className="col-12 col-md-6 offset-md-6 feature-callout-image-pull" style={imgRight} />
  </div>
);

const Section3 = () => (
  <div className="feature-callout feature-content-center image-cover">
    <div className="feature-callout-cover has-overlay" style={imgCenter}>
      <div className="container-fluid with-maxwidth">
        <div className="callout-feature-content">
          <h2>Culpa distinctio nemo</h2>
          <p>Cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam.</p>
          <RaisedButton label="Try it Now" secondary />
        </div>
      </div>
    </div>
  </div>
);

const FeatureCallouts = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Section1 /></div>
      <div key="2"><Section2 /></div>
      <div key="3"><Section3 /></div>
    </QueueAnim>
  </section>
);

module.exports = FeatureCallouts;
