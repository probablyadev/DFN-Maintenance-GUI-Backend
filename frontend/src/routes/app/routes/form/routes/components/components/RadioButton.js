import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const RadioButtonExampleSimple = () => (
  <div className="row">
    <div className="col-lg-6">
      <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
        <RadioButton
          value="light"
          label="Simple"
          style={styles.radioButton}
                />
        <RadioButton
          value="not_light"
          label="Selected by default"
          style={styles.radioButton}
                />
        <RadioButton
          value="ludicrous"
          label="Custom icon"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
                />
      </RadioButtonGroup>
      <RadioButtonGroup name="shipName" defaultSelected="community">
        <RadioButton
          value="enterprise"
          label="Disabled unchecked"
          disabled
          style={styles.radioButton}
                />
        <RadioButton
          value="community"
          label="Disabled checked"
          disabled
          style={styles.radioButton}
                />
      </RadioButtonGroup>
    </div>
    <div className="col-lg-6">
      <RadioButtonGroup name="notRight" labelPosition="left" defaultSelected="not_light" style={styles.block}>
        <RadioButton
          value="reverse"
          label="Label on the left"
          style={styles.radioButton}
                />
        <RadioButton
          value="not_light"
          label="Selected by default"
          style={styles.radioButton}
                />
        <RadioButton
          value="ludicrous"
          label="Custom icon"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.radioButton}
                />
      </RadioButtonGroup>
      <RadioButtonGroup name="shipName2" labelPosition="left" defaultSelected="community" style={styles.block}>
        <RadioButton
          value="enterprise"
          label="Disabled unchecked"
          disabled
          style={styles.radioButton}
                />
        <RadioButton
          value="community"
          label="Disabled checked"
          disabled
          style={styles.radioButton}
                />
      </RadioButtonGroup>
    </div>
  </div>
);

const RadioButtonSection = () => (
  <article className="article">
    <h2 className="article-title">Material Radio Button</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">
          <RadioButtonExampleSimple />
        </div>
      </div>
    </section>
  </article>
);

module.exports = RadioButtonSection;
