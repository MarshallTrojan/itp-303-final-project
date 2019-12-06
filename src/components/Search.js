import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import { Modal, Backdrop, Fade, Paper } from '@material-ui/core';
import Linechart from './Linechart';

const styles = {
    root: {
        marginTop: 20
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
    {title: 'Symbol', field: 'symbol'},
    {title: 'Name', field: 'name'},
    {title: 'Price', field: 'price', type: 'numeric'},
]

class Search extends React.Component {
    state = {
        data: [],
        modalOpen: false,
        stockPrice: 0,
        stockHistorical: [],
        stockName: ''
    }

    componentDidMount() {
        this.props.watchList === false && fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
            .then(results => {
                return results.json();
            })
            .then(res => {
                this.setState({data: res.symbolsList});
            })
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
                fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${rowData.symbol}`)
                .then(results => {
                    return results.json();
                })
                .then(res => {
                    this.setState({stockPrice: res.price});
                })

                fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${rowData.symbol}?serietype=line`)
                .then(results => {
                    return results.json();
                })
                .then(res => {
                    this.setState({modalOpen: true, stockHistorical: res.historical, stockName: rowData.symbol});
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
            <div className={classes.root}>
                <MaterialTable
                    columns={columns}
                    data={this.state.data}
                    color="primary"
                    title={this.props.watchList === false ? "Search for Stock" : "My watch list"}
                    actions={actions}
                />
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
            </div>
        )
    }
}

export default withStyles(styles)(Search);