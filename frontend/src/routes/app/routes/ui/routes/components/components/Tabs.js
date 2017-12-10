import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  padding: '12px 18px',
  marginBottom: 12,
  fontWeight: 400,
};
function handleActive(tab) {
  console.log(`A tab with this route property ${tab.props.route} was activated.`);
}
const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Item One" >
      <div style={styles}>
        <h2>Tab One</h2>
        <p>This is an example tab.</p>
        <p> You can put any sort of HTML or react component in here. It even keeps the component state! </p>
        <Slider name="slider0" defaultValue={0.5} />
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div style={styles}>
        <h2>Tab Two</h2>
        <p> This is another example tab. </p>
      </div>
    </Tab>
    <Tab
      label="onActive"
      data-route="/home"
      onActive={handleActive}
        >
      <div style={styles}>
        <h2>Tab Three</h2>
        <p> This is a third example tab. </p>
      </div>
    </Tab>
  </Tabs>
);


const TabsSection = () => (
  <article className="article">
    <h2 className="article-title">Material Tabs</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">

        <section className="box box-default">
          <div className="box-body no-padding">
            <TabsExampleSimple />
          </div>
        </section>

      </div>
    </section>
  </article>
);

module.exports = TabsSection;
