import React from 'react';
import { connect } from 'react-redux';
import { changeColorOption } from '../../actions';

class ColorSchemeOptions extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { handleChange } = this.props;
    const newColorOption = e.target.value;
    handleChange(newColorOption);
  }

  render() {
    const { colorOption } = this.props;

    return (
      <section>
        <h4 className="section-header">Color Options</h4>
        <p className="small no-margin">Tip: Additionally, you can active "Full Width Header" above</p>
        <div className="divider" />
        <div className="row">
          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="11" checked={colorOption === '11'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-dark item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="12" checked={colorOption === '12'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-primary item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="13" checked={colorOption === '13'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-success item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="14" checked={colorOption === '14'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-info item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="15" checked={colorOption === '15'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-warning item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="16" checked={colorOption === '16'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-danger item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
          </div>

          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="21" checked={colorOption === '21'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-light item-header" />
                <span className="bg-color-light item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="22" checked={colorOption === '22'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-primary item-header" />
                <span className="bg-color-primary item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="23" checked={colorOption === '23'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-success item-header" />
                <span className="bg-color-success item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="24" checked={colorOption === '24'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-info item-header" />
                <span className="bg-color-info item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="25" checked={colorOption === '25'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-warning item-header" />
                <span className="bg-color-warning item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="26" checked={colorOption === '26'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-danger item-header" />
                <span className="bg-color-danger item-header" />
                <span className="bg-color-dark" />
              </span>
            </label>
          </div>
          <div className="col-4">
            <label className="color-option-check">
              <input type="radio" name="color" value="31" checked={colorOption === '31'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-dark item-header" />
                <span className="bg-color-dark item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="32" checked={colorOption === '32'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-primary item-header" />
                <span className="bg-color-primary item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="33" checked={colorOption === '33'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-success item-header" />
                <span className="bg-color-success item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="34" checked={colorOption === '34'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-info item-header" />
                <span className="bg-color-info item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="35" checked={colorOption === '35'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-warning item-header" />
                <span className="bg-color-warning item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
            <label className="color-option-check">
              <input type="radio" name="color" value="36" checked={colorOption === '36'} onChange={this.onChange} />
              <span className="color-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span className="bg-color-danger item-header" />
                <span className="bg-color-danger item-header" />
                <span className="bg-color-light" />
              </span>
            </label>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  colorOption: state.settings.colorOption
});
const mapDispatchToProps = dispatch => ({
  handleChange: (colorOption) => {
    // console.log('change color option to: ' + colorOption);
    dispatch(changeColorOption(colorOption));
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorSchemeOptions);
