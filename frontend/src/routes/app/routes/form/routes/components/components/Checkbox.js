import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  checkbox: {
    maxWidth: 250,
    marginBottom: 16
  }
};

const CheckboxExampleSimple = () => (
  <div className="row" >
    <div className="col-lg-6">
      <Checkbox
        label="Simple"
        style={styles.checkbox}
      />
      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Custom icon"
        style={styles.checkbox}
      />
      <Checkbox
        checkedIcon={<Visibility />}
        uncheckedIcon={<VisibilityOff />}
        label="Custom icon of different shapes"
        style={styles.checkbox}
      />
      <Checkbox
        label="Disabled unchecked"
        disabled
        style={styles.checkbox}
      />
      <Checkbox
        label="Disabled checked"
        checked
        disabled
        style={styles.checkbox}
      />
    </div>
    <div className="col-lg-6">
      <Checkbox
        label="Label on the left"
        labelPosition="left"
        style={styles.checkbox}
      />
      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        label="Custom icon"
        labelPosition="left"
        style={styles.checkbox}
      />
      <Checkbox
        checkedIcon={<Visibility />}
        uncheckedIcon={<VisibilityOff />}
        label="Custom icon of different shapes"
        labelPosition="left"
        style={styles.checkbox}
      />
      <Checkbox
        label="Disabled unchecked"
        disabled
        labelPosition="left"
        style={styles.checkbox}
      />
      <Checkbox
        label="Disabled checked"
        checked
        disabled
        labelPosition="left"
        style={styles.checkbox}
      />
    </div>
  </div>
);

const CheckboxSection = () => (
  <article className="article">
    <h2 className="article-title">Material Checkbox</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <CheckboxExampleSimple />

        </div>
      </div>
    </section>
  </article>
);

module.exports = CheckboxSection;
