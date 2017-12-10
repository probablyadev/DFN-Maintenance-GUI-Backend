import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Typography = () => (
  <section>

    <article className="article">
      <h2 className="article-title">Typeface</h2>
      <div className="box box-transparent">
        <div className="box-body no-padding">
          <div className="row">
            <div className="col-xl-4">
              <p>To support all languages worldwide, Google recommends using Roboto for languages that use the Latin, Greek, and Cyrillic scripts and Noto for all other languages.</p>
              <p><strong>Roboto</strong> has been refined extensively to work across the wider set of supported platforms. It is slightly wider and rounder, giving it greater clarity and making it more optimistic</p>
            </div>
            <div className="col-xl-8">
              <img src="assets/images-demo/style_typography_roboto1.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </article>

    <article className="article">
      <h2 className="article-title">Material Headings</h2>
      <div className="box box-default">
        <div className="box-body padding-lg">

          <dl className="typo-styles">
            <dt>h1</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--display-4">Light 112sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">display-4</span>
                <span className="typo-styles__weight">font weight 300</span>
              </div>
            </dd>
            <dt>h2</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--display-3">Regular 56sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">display-3</span>
                <span className="typo-styles__weight">font weight 400</span>
              </div>
            </dd>
            <dt>h3</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--display-2">Regular 45sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">display-2</span>
                <span className="typo-styles__weight">font weight 400</span>
              </div>
            </dd>
            <dt>h4</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--display-1">Regular 34sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">display-1</span>
                <span className="typo-styles__weight">font weight 400</span>
              </div>
            </dd>
            <dt>h5</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--headline">Regular 24sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">headline</span>
                <span className="typo-styles__weight">font weight 400</span>
              </div>
            </dd>
            <dt>h6</dt>
            <dd>
              <div className="typo-styles__demo mdl-typography--title">Regular 20sp</div>
              <div className="typo-styles__desc">
                <span className="typo-styles__name">title</span>
                <span className="typo-styles__weight">font weight 500</span>
              </div>
            </dd>
          </dl>

        </div>
      </div>
    </article>


    <article className="article">
      <h2 className="article-title">Body</h2>

      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Paragraph</div>
            <div className="box-body">

              <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
              <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla</p>

            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Lead body</div>
            <div className="box-body">
              <p className="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Marked text</div>
            <div className="box-body">
              You can use the mark tag to <mark>highlight</mark> text.
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Deleted text</div>
            <div className="box-body">
              <del>This line of text is meant to be treated as deleted text.</del>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Strikethrough text</div>
            <div className="box-body">
              <s>This line of text is meant to be treated as no longer accurate.</s>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Inserted text</div>
            <div className="box-body">
              <ins>This is meant to be treated as an addition to the document.</ins>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Underlined text</div>
            <div className="box-body">

              <u>This line of text will render as underlined</u>

            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Small text</div>
            <div className="box-body">

              <small>This line of text is meant to be treated as fine print.</small>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Bold</div>
            <div className="box-body">
              <strong>rendered as bold text</strong>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Italics</div>
            <div className="box-body">
              <em>rendered as italicized text</em>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="box box-default">
            <div className="box-header">Alignment classes</div>
            <div className="box-body">

              <p className="text-left">Left aligned text.</p>
              <p className="text-center">Center aligned text.</p>
              <p className="text-right">Right aligned text.</p>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Addresses</div>
            <div className="box-body">

              <address>
                <strong>Twitter, Inc.</strong><br />
                                    795 Folsom Ave, Suite 600<br />
                                    San Francisco, CA 94107<br />
                <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>

            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Transformation classes</div>
            <div className="box-body">

              <p className="text-lowercase">Lowercased text.</p>
              <p className="text-uppercase">Uppercased text.</p>
              <p className="text-capitalize">Capitalized text.</p>

            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Abbreviations</div>
            <div className="box-body">

              <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr></p>
              <p><abbr title="HyperText Markup Language" className="initialism">HTML</abbr> is the best thing since sliced bread.</p>

            </div>
          </div>
        </div>
      </div>

    </article>


    <article className="article">
      <h2 className="article-title">Blockquote</h2>
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Left</div>
            <div className="box-body">

              <blockquote>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit excepturi enim rerum dolore nostrum.</p>
                <small>Someone famous</small>
              </blockquote>

            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Right</div>
            <div className="box-body">

              <blockquote className="float-right text-right">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit excepturi enim rerum dolore nostrum.</p>
                <small>Someone famous</small>
              </blockquote>

            </div>
          </div>
        </div>
      </div>
    </article>


    <article className="article">
      <h2 className="article-title">Dropcap & Highlight</h2>
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Dropcap</div>
            <div className="box-body">

              <p><span className="dropcap">D</span>orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo rerum? Eadignissimos nobis facere esse neque atque quos assumenda fugiat libero.</p>
              <p><span className="dropcap colored">D</span>orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus asperiores laboriosam, dignissimos libero voluptas quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. Ea, ipsa in, laboriosam, dignissimos nobis quaerat vitae a facere esse neque .</p>

            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Highlight</div>
            <div className="box-body">
              <p>Opsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quam, soluta, quia mollitia sequi voluptas magnam perspiciatis deleniti <span className="ui-highlight">ratione ad molestias eum</span> minima sed libero enim laborum sunt vel porro. Lorem ipsum dolor sit amet Eum, voluptas, placeat provident impedit<strong> maiores</strong> odio doloribus corrupti exercitationem veritatis ipsum ipsam adipisci quis consequatur assumenda rerum corporis possimus ad architecto</p>
              <p>Dolor sit amet, consectetur adipisicing elit. Ipsam <span className="ui-highlight colored">consectetur adipisicing</span> elit. dolores accusantium inventore expedita ipsum quod dolore repellat porro laudantium necessitatibus, saepe aut ab, aspernatur, reprehenderit qui provident neque quibusdam doloremque.</p>


            </div>
          </div>
        </div>
      </div>
    </article>


    <article className="article">
      <h2 className="article-title">Lists</h2>

      <div className="row">
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Unordered</div>
            <div className="box-body">

              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit
                  <ul>
                    <li>Phasellus iaculis neque</li>
                    <li>Purus sodales ultricies</li>
                    <li>Vestibulum laoreet porttitor sem</li>
                    <li>Ac tristique libero volutpat at</li>
                  </ul>
                </li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
              </ul>

            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Ordered</div>
            <div className="box-body">

              <ol>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit</li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
                <li>Nulla volutpat aliquam velit</li>
              </ol>

            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-default">
            <div className="box-header">Unstyled</div>
            <div className="box-body">

              <ul className="list-unstyled">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit
                    <ul>
                      <li>Phasellus iaculis neque</li>
                      <li>Purus sodales ultricies</li>
                      <li>Vestibulum laoreet porttitor sem</li>
                      <li>Ac tristique libero volutpat at</li>
                    </ul>
                </li>
                <li>Faucibus porta lacus fringilla vel</li>
                <li>Aenean sit amet erat nunc</li>
                <li>Eget porttitor lorem</li>
              </ul>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="box box-default">
            <div className="box-header">Inline</div>
            <div className="box-body">

              <ul className="list-inline">
                <li className="list-inline-item">Lorem ipsum</li>
                <li className="list-inline-item">Phasellus iaculis</li>
                <li className="list-inline-item">Nulla volutpat</li>
              </ul>

            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Description List</div>
            <div className="box-body">

              <dl>
                <dt>Description lists</dt>
                <dd>A description list is perfect for defining terms.</dd>
                <dt>Euismod</dt>
                <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                <dt>Malesuada porta</dt>
                <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
              </dl>

            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-default">
            <div className="box-header">Horizontal description</div>
            <div className="box-body">

              <dl className="row">
                <dt className="col-sm-3">Description lists</dt>
                <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

                <dt className="col-sm-3">Euismod</dt>
                <dd className="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>

                <dt className="col-sm-3">Malesuada porta</dt>
                <dd className="col-sm-9">Etiam porta sem malesuada eget lacinia odio sem nec elit magna mollis euismod.</dd>

                <dt className="col-sm-3">Felis euismod semper eget </dt>
                <dd className="col-sm-9">Fusce lacinia dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
              </dl>

            </div>
          </div>
        </div>
      </div>

    </article>
  </section>

);

const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Typography /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;

