import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import { changeSidebarWidth } from '../../actions/settings';

const sideWidthSelectStyle = {
    fontSize: '14px',
    width: '100%',
    marginTop: '-15px'
};

function mapStateToProps(state) {
    return {
        layoutBoxed: state.settings.layoutBoxed,
        navCollapsed: state.settings.navCollapsed,
        navBehind: state.settings.navBehind,
        fixedHeader: state.settings.fixedHeader,
        sidebarWidth: state.settings.sidebarWidth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeSidebarWidth }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class LayoutOptions extends React.Component {
    constructor(props) {
        super(props);

        this.onSidebarWidthChange = this.onSidebarWidthChange.bind(this);
    }

    onSidebarWidthChange(e, i, val) {
        this.props.changeSidebarWidth(val);
    }

    render() {
        return (
            <section className='customizer-layout-options'>
                <h4 className='section-header'>Layout Options</h4>
                <div className='divider' />

                <div>
                    <div>
                        <Select
                            className='sidebar-width-select'
                            /* floatingLabelText="Sidebar Width" */
                            value={this.props.sidebarWidth}
                            onChange={this.onSidebarWidthChange}
                            style={sideWidthSelectStyle}
                        >
                            <MenuItem value={'small'} primaryText='Small size' />
                            <MenuItem value={'middle'} primaryText='Middle size' />
                            <MenuItem value={'large'} primaryText='Large size' />
                        </Select>
                    </div>
                </div>

            </section>
        );
    }
}

export default LayoutOptions;
