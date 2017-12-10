import React from 'react';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';

const productImagePath = 'assets/images-demo/products/';
const products = [
  {
    name: 'Silver Watch',
    img: `${productImagePath}watch-silver.png`,
    sash: 'sash-primary',
    sash_icon: 'star',
    sash_text: 'Featured'
  }, {
    name: 'Black Watch',
    img: `${productImagePath}watch-black.png`,
    sash: 'sash-info',
    sash_icon: 'card_giftcard',
    sash_text: 'Gift'
  }, {
    name: 'Red Watch',
    img: `${productImagePath}watch-edition-red.png`,
    sash: 'sash-danger',
    sash_icon: 'flash_on',
    sash_text: 'Popular'
  }, {
    name: 'Blue Watch',
    img: `${productImagePath}watch-edition-blue.png`,
    sash: '',
    sash_icon: 'info',
    sash_text: 'Featured'
  }, {
    name: 'Black Watch',
    img: `${productImagePath}watch-edition-black.png`,
    sash: 'sash-danger',
    sash_icon: 'favorite',
    sash_text: 'Best Choice'
  }, {
    name: 'Sport Watch',
    img: `${productImagePath}watch-sport-blue.png`,
    sash: 'sash-success',
    sash_icon: 'new_releases',
    sash_text: 'New'
  }, {
    name: 'Sport Watch',
    img: `${productImagePath}watch-sport-green.png`,
    sash: 'sash-warning',
    sash_icon: 'money_off',
    sash_text: 'Free Shipping'
  }, {
    name: 'Sport Watch',
    img: `${productImagePath}watch-sport-white.png`,
    sash: 'sash-white',
    sash_icon: 'star',
    sash_text: 'Featured'
  }
];

class Sashes extends React.Component {
  state = {
    products,
  };

  render() {
    return (
      <section className="container-fluid with-maxwidth no-breadcrumbs chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="row">
              {
                this.state.products.map((product, index) => (
                  <div className="col-xl-3 col-lg-6" key={index}>
                    <a href="javascript:;" className="item-card">
                      <div className={classnames('sash sash-triangle-right', product.sash)}>
                        <div>
                          <i className="material-icons">{product.sash_icon}</i>
                          <span className="sash-text">{product.sash_text}</span>
                        </div>
                      </div>
                      <div className="card__image">
                        <img alt="product" src={product.img} />
                      </div>
                      <div className="card__body card-white">
                        <div className="card__title">
                          <h6>Accessories</h6>
                          <h4>{product.name}</h4>
                        </div>
                        <div className="card__price">
                          <span className="type--strikethrough">$699.99</span>
                          <span>$649.99</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

module.exports = Sashes;
