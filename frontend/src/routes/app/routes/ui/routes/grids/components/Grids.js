import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Grids = () => (
  <article className="article">
    <h2 className="article-title">Bootstrap Grid options</h2>
    <div className="box box-default table-box mdl-shadow--2dp">
      <table className="mdl-data-table table-bordered mdl-data-table-non-numeric">
        <thead>
          <tr>
            <th />
            <th className="text-center">
                                Extra small<br />
              <small>&lt;576px</small>
            </th>
            <th className="text-center">
                                Small<br />
              <small>≥576px</small>
            </th>
            <th className="text-center">
                                Medium<br />
              <small>≥768px</small>
            </th>
            <th className="text-center">
                                Large<br />
              <small>≥992px</small>
            </th>
            <th className="text-center">
                                Extra large<br />
              <small>≥1200px</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-nowrap" scope="row">Max container width</th>
            <td>None (auto)</td>
            <td>540px</td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
          </tr>
          <tr>
            <th className="text-nowrap" scope="row">Class prefix</th>
            <td><code>.col-</code></td>
            <td><code>.col-sm-</code></td>
            <td><code>.col-md-</code></td>
            <td><code>.col-lg-</code></td>
            <td><code>.col-xl-</code></td>
          </tr>
          <tr>
            <th className="text-nowrap" scope="row"># of columns</th>
            <td colSpan="5">12</td>
          </tr>
          <tr>
            <th className="text-nowrap" scope="row">Gutter width</th>
            <td colSpan="5">30px (15px on each side of a column)</td>
          </tr>
          <tr>
            <th className="text-nowrap" scope="row">Nestable</th>
            <td colSpan="5">Yes</td>
          </tr>
          <tr>
            <th className="text-nowrap" scope="row">Column ordering</th>
            <td colSpan="5">Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
);

const Example = () => (
  <article className="article">
    <h2 className="article-title">Example</h2>
    <div className="box box-default">
      <div className="box-body">

        <div className="grid-structure">
          <div className="row">
            <div className="col-md-12">
              <div className="widget-container">
                .col-md-12
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11">
              <div className="widget-container">
                .col-md-11
               </div>
            </div>
            <div className="col-md-1">
              <div className="widget-container">
                .col-md-1
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="widget-container">
                .col-md-10
               </div>
            </div>
            <div className="col-md-2">
              <div className="widget-container">
                .col-md-2
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="widget-container">
                .col-md-9
               </div>
            </div>
            <div className="col-md-3">
              <div className="widget-container">
                .col-md-3
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="widget-container">
                .col-md-8
               </div>
            </div>
            <div className="col-md-4">
              <div className="widget-container">
                .col-md-4
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="widget-container">
                .col-md-7
               </div>
            </div>
            <div className="col-md-5">
              <div className="widget-container">
                .col-md-5
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="widget-container">
                .col-md-6
               </div>
            </div>
            <div className="col-md-6">
              <div className="widget-container">
                .col-md-6
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="widget-container">
                .col-md-5
               </div>
            </div>
            <div className="col-md-7">
              <div className="widget-container">
                .col-md-7
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="widget-container">
                .col-md-4
               </div>
            </div>
            <div className="col-md-8">
              <div className="widget-container">
                .col-md-8
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="widget-container">
                .col-md-3
               </div>
            </div>
            <div className="col-md-9">
              <div className="widget-container">
                .col-md-9
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className="widget-container">
                .col-md-2
               </div>
            </div>
            <div className="col-md-10">
              <div className="widget-container">
                .col-md-10
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">
              <div className="widget-container">
                .col-md-1
               </div>
            </div>
            <div className="col-md-11">
              <div className="widget-container">
                .col-md-11
               </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className="widget-container">
                .col-md-2
               </div>
            </div>
            <div className="col-md-3">
              <div className="widget-container">
                .col-md-3
               </div>
            </div>
            <div className="col-md-4">
              <div className="widget-container">
                .col-md-4
               </div>
            </div>
            <div className="col-md-2">
              <div className="widget-container">
                .col-md-2
               </div>
            </div>
            <div className="col-md-1">
              <div className="widget-container">
                .col-md-1
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </article>
);

const Page = () => (
  <section className="container-fluid chapter page-grids">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Grids /></div>
      <div key="2"><Example /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
