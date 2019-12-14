import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from './Search';
import StockMarket from './StockMarket';
import HeaderLogIn from './HeaderLogIn';

const styles = {

};

class UserDashboard extends React.Component {

    state={
        id: sessionStorage.getItem("id"),
        stocks: []
    }

    componentDidMount() {
        fetch(`http://303.itpwebdev.com/~pbauman/finalproject/api/stocks/read.php?id=${sessionStorage.getItem("id")}`)
        .then(results => {
            return results.json()
        })
        .then(res => {
            console.log(res)
            if (res[0].name !== "NOSTOCKFORUSER") {
                this.setState({stocks: res});
            }
        })
    }

    render() {
        return (
            <div>
                <HeaderLogIn/>
                <Search watchList={true} signIn={true} userid={this.state.id} stocks={this.state.stocks !== [] && this.state.stocks} delete={true}/>
                <Search watchList={false} signIn={true} delete={false} />
                <StockMarket signIn={true} />
            </div>
        )
    }
};

export default withStyles(styles)(UserDashboard);