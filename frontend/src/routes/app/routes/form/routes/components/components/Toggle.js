import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    maxWidth: 250,
    marginBottom: 16
  },
};

const ToggleExampleSimple = () => (
  <div className="row">
    <div className="col-md-6">
      <Toggle
        label="Simple"
        style={styles.toggle}
      />
      <Toggle
        label="Toggled by default"
        defaultToggled
        style={styles.toggle}
      />
      <Toggle
        label="Disabled"
        disabled
        style={styles.toggle}
      />
      <Toggle
        label="Disabled"
        disabled
        defaultToggled
        style={styles.toggle}
      />
    </div>
    <div className="col-md-6">
      <Toggle
        label="Label on the right"
        labelPosition="right"
        style={styles.toggle}
      />
      <Toggle
        label="Toggled by default"
        labelPosition="right"
        defaultToggled
        style={styles.toggle}
      />
      <Toggle
        label="Disabled"
        labelPosition="right"
        disabled
        style={styles.toggle}
      />
      <Toggle
        label="Disabled"
        labelPosition="right"
        disabled
        defaultToggled
        style={styles.toggle}
      />
    </div>
  </div>
);

const ToggleSection = () => (
  <article className="article">
    <h2 className="article-title">Material Toggle</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <ToggleExampleSimple />

        </div>
      </div>
    </section>
  </article>
);

module.exports = ToggleSection;
