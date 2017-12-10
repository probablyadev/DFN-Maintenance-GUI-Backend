import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../actions';

class ThemeOptions extends React.Component {

  onChange = (e) => {
    const { handleChange } = this.props;
    const newThemeOption = e.target.value;
    handleChange(newThemeOption);
  }

  render() {
    const { theme } = this.props;

    return (
      <section>
        <h4 className="section-header">Theme Options</h4>
        <div className="divider" />

        <div className="row no-margin theme-options clearfix">
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={this.onChange} />
              <span className="theme-option-item bg-color-dark">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span>Dark</span>
              </span>
            </label>
          </div>
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="gray" checked={theme === 'gray'} onChange={this.onChange} />
              <span className="theme-option-item bg-color-gray">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span>Gray</span>
              </span>
            </label>
          </div>
          <div className="col-4">
            <label className="theme-option-check">
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={this.onChange} />
              <span className="theme-option-item bg-color-page">
                <span className="overlay"><span className="material-icons">check</span></span>
                <span>Light</span>
              </span>
            </label>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (themeOption) => {
    dispatch(changeTheme(themeOption));
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeOptions);
