import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  padding: '12px 18px',
  marginBottom: 12,
  fontWeight: 400,
};

const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Item One" >
      <div style={styles}>
        <h2>Tab One</h2>
        <p> This is another example tab. </p>
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div style={styles}>
        <h2>Tab Two</h2>
        <p> This is another example tab. </p>
      </div>
    </Tab>
    <Tab label="Item Three" >
      <div style={styles}>
        <h2>Tab Three</h2>
        <p> This is another example tab. </p>
      </div>
    </Tab>
  </Tabs>
);

class ActionMenu extends React.Component {
    render() {
        return (
            <article className="article">
                <h2 className="article-title">Action Menu</h2>

                <section className="box box-default">

                        <section className="box box-default">
                            <div className="box-body no-padding">
                                <TabsExampleSimple/>
                            </div>
                        </section>

                </section>
            </article>
        );
    }
}

module.exports = ActionMenu;
