import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {connect} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-info' href="/">Virpet</NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/'>Event</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/forecast'>Meow</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div>
                                        <Button color="danger" onClick={this.toggle}>Add event</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className=''>
                                            <ModalHeader toggle={this.toggle}>Event Title</ModalHeader>
                                            <ModalBody>
                                                Add Event
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <div className='search ml-auto'>
                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{this.props.searchText && <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
}
                                    </div>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (<Today/>)}/>
                    <Route exact path="/forecast" render={() => (<Forecast/>)}/>
                    <div className='footer'>
                        DataLab.
                    </div>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default connect(state => ({
    ...state.main,
    searchText: state.searchText
}))(Main);
