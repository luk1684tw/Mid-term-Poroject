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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import {connect} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar, eventTitle, eventDanger, eventDescript, eventGetStartDate, eventGetEndDate} from 'states/main-actions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import GoogleLogin from 'react-google-login';
import 'react-datepicker/dist/react-datepicker.css';
import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        eventTitleValue: PropTypes.string,
        eventStartDate: PropTypes.string,
        eventEndDate: PropTypes.string,
        eventDescriptValue: PropTypes.string,
        eventDanger: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.searchEl = null;
        this.eventTitleEl = null;
        this.eventStartDateEl = null;
        this.eventEndDateEl = null;
        this.eventDescriptEl = null;
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
        this.handleEventDescriptChange = this.handleEventDescriptChange.bind(this);
        this.handleEventStartDateChange = this.handleEventStartDateChange.bind(this);
        this.handleEventEndDateChange = this.handleEventEndDateChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }
        const {eventTitleValue} = this.props;
        // console.log(this.props.eventDescriptValue);
        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='' href="/">Virpet</NavbarBrand>&nbsp;&nbsp;
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/forecast'>提醒條</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div>
                                        <Button color="danger" onClick={this.toggle}>新增提醒</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='' backdrop={false}>
                                            <ModalHeader toggle={this.toggle}>事件</ModalHeader>
                                            <ModalBody>
                                                <InputGroup>
                                                    <InputGroupAddon>名稱</InputGroupAddon>
                                                    <Input placeholder="段考爆炸" getRef={el => this.eventTitleEl = el} value={this.props.eventTitleValue} onChange={this.handleEventTitleChange}/>
                                                </InputGroup>
                                                <FormGroup>
                                                    <Label for="exampleDate">開始日期</Label>
                                                    <Input placeholder="date placeholder" type="date" name="date" id="exampleDate" getRef={el => this.eventStartDateEl = el} value={this.props.eventStartDate} onChange={this.handleEventStartDateChange}/>
                                                    {/* <DatePicker selected={this.props.eventStartDate} onChange={this.handleEventStartDateChange}placeholderText="請點選輸入日期"/> */}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleDate">結束日期</Label>
                                                    <Input type="date" name="date" id="exampleDate" getRef={el => this.eventEndDateEl = el} value={this.props.eventEndDate} onChange={this.handleEventEndDateChange}/>
                                                    {/* <DatePicker selected={this.props.eventEndDate} onChange={this.handleEventEndDateChange}placeholderText="請點選輸入日期"/> */}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleText">描述</Label>
                                                    <Input type="textarea" name="text" id="exampleText" getRef={el => this.eventDescriptEl = el} value={this.props.eventDescriptValue} onChange={this.handleEventDescriptChange} placeholder="明天考試QQ"/>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>新增</Button>{' '}
                                                <Button color="secondary" onClick={this.toggle}>取消</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>&nbsp;&nbsp;
                                    <div>
                                        <GoogleLogin clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={responseGoogle} onFailure={responseGoogle} className='btn btn-secondary' offline={false}></GoogleLogin>
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
    handleEventTitleChange(e) {
        const text = e.target.value;
        console.log('e.target.value = ' + e.target.value);
        this.props.dispatch(eventTitle(text));
        if (text && this.props.eventDanger) {
            this.props.dispatch(eventDanger(false));
        }
    }
    handleEventDescriptChange(e) {
        const text = e.target.value;
        //console.log('e.target.value = '+e.target.value);
        this.props.dispatch(eventDescript(text));
        if (text && this.props.eventDanger) {
            this.props.dispatch(eventDanger(false));
        }
    }
    handleEventStartDateChange(e){
        //console.log(e.target);
        const date = e.target.value;
        console.log('Start Date: '+date);
        this.props.dispatch(eventGetStartDate(date));
        if(date && this.props.eventDanger){
             this.props.dispatch(eventDanger(false));
        }
    }

    handleEventEndDateChange(e){
        const date = e.target.value;
        console.log('End Date: '+date);
        this.props.dispatch(eventGetEndDate(date));
        if(date && this.props.eventDanger){
             this.props.dispatch(eventDanger(false));
        }
    }
}

export default connect(state => ({
    ...state.main,
    ...state.events,
    searchText: state.searchText
}))(Main);
