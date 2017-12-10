import React from 'react';
import QueueAnim from 'rc-queue-anim';

const BasicBoxes = () => (
  <article className="article">
    <h2 className="article-title">Basic Boxes</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header box-dark">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box Header</div>
          <div className="box-body box-dark">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
  </article>
)

const BoxesWithStyle = () => (
  <article className="article">
    <h2 className="article-title">Boxes with Style</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box with Divider</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="box">
          <div className="box-header">No Background Color</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="box box-transparent">
          <div className="box-header">Transparent Box</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
  </article>
)

const BoxColors = () => (
  <article className="article">
    <h2 className="article-title">Box Colors</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box">
          <div className="box-header bg-color-dark">Box Header</div>
          <div className="box-body bg-color-white">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box">
          <div className="box-header bg-color-white">Box Header</div>
          <div className="box-body bg-color-dark">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box bg-color-dark">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box">
          <div className="box-header bg-color-white">Box Header</div>
          <div className="box-body bg-color-white">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box bg-color-primary">
          <div className="box-header ">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box bg-color-info">
          <div className="box-header ">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box bg-color-success">
          <div className="box-header ">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box bg-color-warning">
          <div className="box-header ">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box bg-color-danger">
          <div className="box-header ">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div> 
    </div>
  </article>
)


const Page = () => {
  return (
    <section className="container-fluid with-maxwidth chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><BasicBoxes /></div>
        <div key="2"><BoxesWithStyle /></div>
        <div key="3"><BoxColors /></div>
      </QueueAnim>
    </section>
  )
}

module.exports = Page;
