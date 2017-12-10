import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  toggleBoxedLayout,
  toggleCollapsedNav,
  toggleNavBehind,
  toggleFixedHeader,
  changeSidebarWidth
} from '../../actions';


const sideWidthSelectStyle = {
  fontSize: '14px',
  width: '100%',
  marginTop: '-15px'
};

class LayoutOptions extends React.Component {

  onToggleFixedHeader = (e, val) => {
    const { handleToggleFixedHeader } = this.props;
    handleToggleFixedHeader(val);
  }

  onToggleCollapsedNav = (e, val) => {
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(val);
  }

  onToggleNavBehind = (e, val) => {
    const { handleToggleNavBehind } = this.props;
    handleToggleNavBehind(val);
  }

  onToggleBoxedLayout = (e, val) => {
    const { handleToggleBoxedLayout } = this.props;
    handleToggleBoxedLayout(val);
  }

  onSidebarWidthChange = (e, i, val) => {
    const { handleSidebarWidthChange } = this.props;
    handleSidebarWidthChange(val);
  }

  render() {
    const { layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth } = this.props;

    return (
      <section className="customizer-layout-options">
        <h4 className="section-header">Layout Options</h4>
        <div className="divider" />

        <div>
          <Toggle label="Fixed Header" defaultToggled={fixedHeader} onToggle={this.onToggleFixedHeader} />
          <div className="divider divider-xs" />
          <Toggle label="Collapsed Sidebar" toggled={navCollapsed} onToggle={this.onToggleCollapsedNav} />
          <div className="divider divider-xs" />
          <Toggle label="Full Width Header" defaultToggled={navBehind} onToggle={this.onToggleNavBehind} />
          <div className="divider divider-xs" />
          <Toggle label="Boxed Layout" defaultToggled={layoutBoxed} onToggle={this.onToggleBoxedLayout} />
          <div className="divider divider-xs" />
          <div>
            <SelectField
              className="sidebar-width-select"
              floatingLabelText="Sidenav Width"
              value={sidebarWidth}
              onChange={this.onSidebarWidthChange}
              style={sideWidthSelectStyle}
                        >
              <MenuItem value={'small'} primaryText="Small size" />
              <MenuItem value={'middle'} primaryText="Middle size" />
              <MenuItem value={'large'} primaryText="Large size" />
            </SelectField>
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => ({
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth
});
const mapDispatchToProps = dispatch => ({
  handleToggleFixedHeader: (isFixedHeader) => {
    dispatch(toggleFixedHeader(isFixedHeader));
  },
  handleToggleCollapsedNav: (isNavCollapsed) => {
    dispatch(toggleCollapsedNav(isNavCollapsed));
  },
  handleToggleNavBehind: (isNavBehind) => {
    dispatch(toggleNavBehind(isNavBehind));
  },
  handleToggleBoxedLayout: (isLayoutBoxed) => {
    dispatch(toggleBoxedLayout(isLayoutBoxed));
  },
  handleSidebarWidthChange: (sidebarWidth) => {
    dispatch(changeSidebarWidth(sidebarWidth));
  }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutOptions);
