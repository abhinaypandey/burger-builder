import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => { // clean way when state depends on the old state
            return {showSideDrawer: !prevState.showSideDrawer}; // due to async nature it might not update the latest state so use this 
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps)(Layout);