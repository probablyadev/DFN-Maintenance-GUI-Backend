import React, { Component } from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    padding-top: 35px;
    padding-bottom: 30px;
    text-align: center;
    background-color: #E0F2F1;
    color: black;
    position: absolute;
    bottom: -70;
    width: 100%;
`;

export class Footer extends Component {
    render() {
        return (
            <Footer>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <p>© DFN 2017</p>
                        </div>
                    </div>
                </div>
            </Footer>
        );
    }
}