import React from 'react';
import QueueAnim from 'rc-queue-anim';

export const Timeline = () => (
  <div className="ui-timline-container">
    <section className="ui-timeline">
      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-caption">
              <a href="javascript:;" className="btn btn-primary btn-block">Today</a>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">3 min ago</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-info"><i className="material-icons">camera</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-primary">Go hiking</h4>
              <p>Consectetur adipisicing elit. Error, accusantium debitis voluptatem dolore excepturi ducimus fugiat nulla perspiciatis quo ipsum non eligendi nisi veniam maxime in quas atque omnis cumque!</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item alt">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">1 hour ago</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-warning"><i className="material-icons">shopping_cart</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-danger">Buy some toys</h4>
              <p>Ullam, commodi, modi, impedit nostrum odio sit odit necessitatibus accusantium enim voluptates culpa cupiditate cum pariatur a recusandae tenetur aspernatur at beatae.</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">3 hours ago</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-success"><i className="material-icons">camera</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-warning">Soluta nihil</h4>
              <p>Incidunt, molestias odio soluta nihil accusantium sit nostrum doloremque. Recusandae, ullam, odio consequatur facere totam reiciendis similique dicta explicabo!</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item alt">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">7 hours ago</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-danger"><i className="material-icons">check</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-success">Odio sit odit necessitatibus</h4>
              <p>Ullam, commodi, modi, impedit nostrum odio sit odit necessitatibus accusantium enim voluptates culpa cupiditate cum pariatur a recusandae tenetur aspernatur at beatae.</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">10 hours ago</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-primary"><i className="material-icons">alarm</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-info">Accusantium sint</h4>
              <p>Ipsam, minus, quam, sit officiis accusantium sint voluptates voluptatibus minima cum non quos corrupti dolorem eligendi modi eius magnam unde!</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-caption">
              <a href="javascript:;" className="btn btn-danger btn-block">Yesterday</a>
            </div>
          </div>
        </div>
      </article>


      <article className="tl-item alt">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">8:30 PM</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-warning"><i className="material-icons">comment</i></div>
            <div className="tl-content">
              <h4 className="tl-tile">Enim asperiores facere</h4>
              <p>Odit, iusto, dolorem, aut ipsum rem atque enim asperiores facere tempore explicabo omnis corporis hic! Molestias, dolores, iure esse at illo aliquam temporibus in eum cupiditate magni velit eveniet unde facilis quisquam numquam nihil atque tempore vitae porro maxime repellendus quas a sit repellat delectus expedita nam natus fugiat ut ipsam eaque voluptates omnis ratione?</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">7:00 PM</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-success"><i className="material-icons">folder</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-warning">Illum veniam atque</h4>
              <p>Illum veniam atque iste voluptatem eos saepe quisquam aperiam voluptatum sunt.</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item alt">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">12:55 PM</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-danger"><i className="material-icons">folder</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-success">Voluptas molestias</h4>
              <p>At, veniam, officia pariatur voluptas molestias nobis distinctio quo temporibus! Nisi, fugit, ipsum, veritatis, optio consectetur nam molestiae quidem placeat deleniti animi ad nobis iure modi eius recusandae odio adipisci nesciunt.</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">10:13 AM</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-primary"><i className="material-icons">email</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-info">Nulla magni sequi</h4>
              <p>Laborum, ducimus, perferendis nulla magni sequi cumque nisi eum praesentium omnis voluptas id molestias adipisci accusamus nobis totam. Odit, hic suscipit necessitatibus quos</p>
            </div>
          </div>
        </div>
      </article>

      <article className="tl-item alt">
        <div className="tl-body">
          <div className="tl-entry">
            <div className="tl-time">9:10 AM</div>
            <div className="tl-icon btn-icon-round btn-icon btn-icon-thin btn-info"><i className="material-icons">card_giftcard</i></div>
            <div className="tl-content">
              <h4 className="tl-tile text-primary">Sed cumque temporibus</h4>
              <p>Deserunt sed cumque temporibus. Doloribus, iste, sit recusandae fugiat assumenda ea magni at doloremque ipsum amet molestias error mollitia maxime ad alias eos id cumque corporis placeat nisi a quaerat nemo magnam ab numquam ratione facere dolorum. Cumque, dolores, sint molestiae eaque quibusdam illo error!</p>
            </div>
          </div>
        </div>
      </article>

    </section>
  </div>
);

const Page = () => (
  <div className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Timeline /></div>
    </QueueAnim>
  </div>
);

module.exports = Page;
