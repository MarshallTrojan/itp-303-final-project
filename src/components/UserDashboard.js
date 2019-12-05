import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from './Search';
import StockMarket from './StockMarket';

const styles = {

};

const UserDashboard = (props) => {
    return (
        <div>
            <Search watchList={true} signIn={true} />
            <Search watchList={false} signIn={true} />
            <StockMarket signIn={true} />
        </div>
    )
};

export default withStyles(styles)(UserDashboard);