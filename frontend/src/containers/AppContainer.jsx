import React from 'react';
import styled from 'styled-components';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Application components */
import { Header } from '../components/Header/';
import { Footer } from '../components/Footer';


const theme = {
    position: 'relative',
    fontFamily: 'Roboto sans-serif !important',
    h1: {
        fontWeight: '300'
    },
    h2: {
        fontWeight: '300'
    },
    h3: {
        fontWeight: '300'
    },
    h4: {
        fontWeight: '300'
    }
};

const StyledContainer = styled.div.attrs({className: 'container'})`
    marginTop: 10;
    paddingBottom: 250;
`;


export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    // Is this mui theme even needed here? there is one at the main.jsx
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <ThemeProvider theme={theme}>
                    <section>
                        <Header/>

                        <StyledContainer>
                            {this.props.children}
                        </StyledContainer>

                        <div>
                            <Footer/>
                        </div>
                    </section>
                </ThemeProvider>
            </MuiThemeProvider>
        );
    }
}
