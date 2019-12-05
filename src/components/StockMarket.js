import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { Grid, FormControl, InputLabel, Select, MenuItem, Modal, Fade, Paper, Backdrop } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import Linechart from './Linechart';

const styles = {
    root: {
        marginTop: 20
    },
    select: {
        color: '#004346',
        // backgroundColor: 'white'
    },
    table: {
        backgroundColor: 'black'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '80%',
        height: '80%'
    }
}

const columns = [
    {title: 'Ticker', field: 'ticker'},
    {title: 'Changes', field: 'changes', type: 'numeric'},
    {title: 'Price', field: 'price', type: 'numeric'},
    {title: 'Changes Percentage', field: 'changesPercentage'},
    {title: 'Company Name', field: 'companyName'},
]

class StockMarket extends React.Component {
    state = {
        modalOpen: false,
        data: [],
        filter: 'Most Active',
        open: false,
        stockPrice: 0,
        stockHistorical: [],
        stockName: ''
    }

    componentDidMount() {
        fetch('https://financialmodelingprep.com/api/v3/stock/actives')
            .then(results => {
                return results.json()
            })
            .then(res => {
                this.setState({data: res.mostActiveStock})
            })
    }

    handleChange = (e) => {
        if (e.target.value === 'Most Active') {
            fetch('https://financialmodelingprep.com/api/v3/stock/actives')
            .then(results => {
                return results.json()
            })
            .then(res => {
                this.setState({data: res.mostActiveStock})
            })
        } else if (e.target.value === 'Most Gainer') {
            fetch('https://financialmodelingprep.com/api/v3/stock/gainers')
            .then(results => {
                return results.json()
            })
            .then(res => {
                console.log(res)
                this.setState({data: res.mostGainerStock})
            })
        } else {
            fetch('https://financialmodelingprep.com/api/v3/stock/losers')
            .then(results => {
                return results.json()
            })
            .then(res => {
                this.setState({data: res.mostLoserStock})
            })
        }
        this.setState({filter: e.target.value});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleModalClose = () => {
        this.setState({modalOpen: false});
    }

    render() {
        const classes = this.props.classes;
        const actions = [
            {
              icon: () => <VisibilityIcon />,
              tooltip: 'View Stock',
              onClick: (event, rowData) => {
                fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${rowData.ticker}`)
                .then(results => {
                    return results.json();
                })
                .then(res => {
                    this.setState({stockPrice: res.price});
                })

                fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${rowData.ticker}?serietype=line`)
                .then(results => {
                    return results.json();
                })
                .then(res => {
                    this.setState({modalOpen: true, stockHistorical: res.historical, stockName: rowData.ticker});
                })
              }
            }
        ];
        this.props.signIn === true && actions.push(
            {
                icon: () => <AddIcon />,
                tooltip: 'Add Stock',
                onClick: (event, rowData) => {

                }
            }
        );
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={10}>
                    <MaterialTable
                        title={`Stock Market - ${this.state.filter}`}
                        columns={columns}
                        data={this.state.data}
                        actions={actions}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="filter">Filter</InputLabel>
                        <Select
                            labelId="filter"
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.state.filter}
                            onChange={(event) => {this.handleChange(event)}}
                            className={classes.select}
                        >
                            <MenuItem value={"Most Active"}>Most Active</MenuItem>
                            <MenuItem value={"Most Gainer"}>Most Gainer</MenuItem>
                            <MenuItem value={"Most Loser"}>Most Loser</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.modalOpen}
                    onClose={this.handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.modalOpen}>
                        <Paper className={classes.paper}>
                            <Linechart data={this.state.stockHistorical} price={this.state.stockPrice} name={this.state.stockName}/>
                        </Paper>
                    </Fade>
                </Modal>
            </Grid>
        )
    }
}

export default withStyles(styles)(StockMarket);