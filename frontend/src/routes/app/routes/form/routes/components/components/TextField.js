import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
  width: '100%'
};

//
const TextFieldExampleSimple = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Simple examples</div>
      <div className="box-body">
        <TextField
          hintText="Hint Text"
        /><br />
        <br />
        <TextField
          hintText="The hint text can be as long as you want, it will wrap."
        /><br />
        <TextField
          id="text-field-default"
          defaultValue="Default Value"
        /><br />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
        /><br />
        <TextField
          defaultValue="Default Value"
          floatingLabelText="Floating Label Text"
        /><br />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed
        /><br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
        /><br />
        <TextField
          hintText="MultiLine with rows: 2 and rowsMax: 4"
          multiLine
          rows={2}
          rowsMax={4}
        /><br />
        <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine
          rows={2}
        /><br />
        <TextField
          hintText="Full width"
          fullWidth
        />
      </div>
    </div>
  </div>
);


//
const TextFieldExampleDisabled = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Disabled examples</div>
      <div className="box-body">
        <TextField
          disabled
          hintText="Disabled Hint Text"
        /><br />
        <br />
        <TextField
          disabled
          id="text-field-disabled"
          defaultValue="Disabled Value"
        /><br />
        <TextField
          disabled
          hintText="Disabled Hint Text"
          floatingLabelText="Floating Label Text"
        /><br />
        <TextField
          disabled
          hintText="Disabled Hint Text"
          defaultValue="Disabled With Floating Label"
          floatingLabelText="Floating Label Text"
        />
      </div>
    </div>
  </div>
);


const TextFieldSection = () => (
  <article className="article">
    <h2 className="article-title">Material Text Field</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <TextFieldExampleSimple />
            <TextFieldExampleDisabled />
          </div>

        </div>
      </div>
    </section>
  </article>
);

module.exports = TextFieldSection;
