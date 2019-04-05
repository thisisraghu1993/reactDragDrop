import React,{Component, Fragment} from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
export default class CardContainer extends Component {
    render() {
        return (
            <Fragment>
	            <Header/>
	            <Container />
    		</Fragment>
        );
    }
} 