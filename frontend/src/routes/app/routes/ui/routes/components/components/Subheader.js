import React from 'react';

const TmplSection = () => (
  <section className="row ui-section">
    <div className="col-lg-8 clearfix">
      <h2 className="section-header">Tmpl</h2>
    </div>
    <div className="col-md-12">

      <section className="panel panel-default">
        <div className="panel-body padding-xl">
          <div className="col-lg-8 mx-auto">
            <h4>Basic</h4>
            <div className="divider divider-md" />

            <div className="divider divider-lg divider-dashed" />
            <h4>Advanced</h4>
            <div className="divider divider-md" />
          </div>
        </div>
      </section>

      <section className="panel panel-default">
        <div className="panel-body padding-xl">
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6" />
          </div>
        </div>
      </section>

      <div className="row">
        <div className="col-md-6" />
        <div className="col-md-6" />
      </div>

    </div>
  </section>
    );

module.exports = TmplSection;
