import React from 'react';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';

const testimonials = [
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ratione consequuntur ut placeat.',
    avatar: 'assets/images-demo/avatars/1.jpg',
    name: 'Jason Bourne',
    title: 'Senior PM'
  }, {
    content: 'Cum suscipit voluptatem modi repellat consequuntur aliquid nostrum, dolore pariatur consequatur nobis',
    avatar: 'assets/images-demo/avatars/2.jpg',
    name: 'Bella Swan',
    title: 'VP Product'
  }, {
    content: 'Temporibus nesciunt quod magnam dicta ea, quae minima tempore eiciendis nisi ab, perferendis',
    avatar: 'assets/images-demo/avatars/3.jpg',
    name: 'Min Chan',
    title: 'Engineer Lead'
  }
];

class Section1 extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Basic Testimonials</h2>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index}>
                <div className="testimonial">
                  <span className="testimonial__quote"><i className="material-icons">format_quote</i></span>
                  <blockquote>
                    {testimonial.content}
                  </blockquote>
                  <img alt="avatar" className="avatar" src={testimonial.avatar} />
                  <h5>{testimonial.name}</h5>
                  <span className="title">{testimonial.title}</span>
                </div>
              </div>
            ))
          }
        </div>
      </article>
    );
  }
}

class Section2 extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Basic Testimonials</h2>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index}>
                <div className="testimonial testimonial-alt">
                  <span className="testimonial__quote"><i className="material-icons">format_quote</i></span>
                  <blockquote>
                    {testimonial.content}
                  </blockquote>
                  <img alt="avatar" className="avatar" src={testimonial.avatar} />
                  <h5>{testimonial.name}</h5>
                  <span className="title">{testimonial.title}</span>
                </div>
              </div>
            ))
          }
        </div>
      </article>
    );
  }
}

class Section3 extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Basic Testimonials</h2>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index}>
                <div className="box box-default">
                  <div className="box-body padding-lg-v">
                    <div className="testimonial testimonial-alt">
                      <img alt="avatar" className="avatar" src={testimonial.avatar} />
                      <blockquote>
                        {testimonial.content}
                      </blockquote>
                      <p className="citation">{testimonial.name}, {testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </article>
    );
  }
}

const Page = () => (
  <section className="container-fluid with-maxwidth chapter" >
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Section1 /></div>
      <div key="2"><Section2 /></div>
      <div key="3"><Section3 /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
