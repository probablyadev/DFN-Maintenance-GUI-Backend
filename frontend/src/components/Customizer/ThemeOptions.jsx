import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeTheme } from '../../actions/settings';

function mapStateToProps(state) {
    return {
        theme: state.settings.theme
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeTheme }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class ThemeOptions extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.changeTheme(e.target.value);
    }

    render() {
        const { theme } = this.props;

        return (
            <section>
                <h4 className='section-header'>Theme Options</h4>
                <div className='divider' />

                <div className='row no-margin theme-options clearfix'>
                    <div className='col-4'>
                        <label className='theme-option-check'>
                            <input
                                type='radio'
                                name='theme'
                                value='dark'
                                checked={theme === 'dark'}
                                onChange={this.onChange}
                            />
                            <span className='theme-option-item bg-color-dark'>
                                <span className='overlay'>
                                    <span className='material-icons'>
                                        check
                                    </span>
                                </span>
                                <span>Dark</span>
                            </span>
                        </label>
                    </div>
                    <div className='col-4'>
                        <label className='theme-option-check'>
                            <input
                                type='radio'
                                name='theme'
                                value='gray'
                                checked={theme === 'gray'}
                                onChange={this.onChange}
                            />
                            <span className='theme-option-item bg-color-gray'>
                                <span className='overlay'>
                                    <span className='material-icons'>
                                        check
                                    </span>
                                </span>
                                <span>Gray</span>
                            </span>
                        </label>
                    </div>
                    <div className='col-4'>
                        <label className='theme-option-check'>
                            <input
                                type='radio'
                                name='theme'
                                value='light'
                                checked={theme === 'light'}
                                onChange={this.onChange}
                            />
                            <span className='theme-option-item bg-color-page'>
                                <span className='overlay'>
                                    <span className='material-icons'>
                                        check
                                    </span>
                                </span>
                                <span>Light</span>
                            </span>
                        </label>
                    </div>
                </div>
            </section>
        );
    }
}

export default ThemeOptions;
