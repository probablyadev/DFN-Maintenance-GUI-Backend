import React from 'react';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {changeSidebarWidth} from '../../actions';


const sideWidthSelectStyle = {
    fontSize: '14px',
    width: '100%',
    marginTop: '-15px'
};

class LayoutOptions extends React.Component {
    onSidebarWidthChange = (e, i, val) => {
        const {handleSidebarWidthChange} = this.props;
        handleSidebarWidthChange(val);
    };

    render() {
        const {sidebarWidth} = this.props;

        return (
            <section className="customizer-layout-options">
                <h4 className="section-header">Layout Options</h4>
                <div className="divider"/>

                <div>
                    <div>
                        <SelectField
                            className="sidebar-width-select"
                            floatingLabelText="Sidenav Width"
                            value={sidebarWidth}
                            onChange={this.onSidebarWidthChange}
                            style={sideWidthSelectStyle}
                        >
                            <MenuItem value={'small'} primaryText="Small size"/>
                            <MenuItem value={'middle'} primaryText="Middle size"/>
                            <MenuItem value={'large'} primaryText="Large size"/>
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
    handleSidebarWidthChange: (sidebarWidth) => {
        dispatch(changeSidebarWidth(sidebarWidth));
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutOptions);
