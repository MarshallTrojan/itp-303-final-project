import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Chart from 'react-google-charts';
import { Grid } from '@material-ui/core';

const styles = {
    root: {
        textAlign: 'center'
    },
    title: {
        marginBottom: 0,
    }
}

const Linecharts = (props) => {
    const classes = props.classes;
    let chartData = [[{type: 'date', label: 'Date'}, 'Price']];
    let minPrice = Number.MAX_VALUE;
    let maxPrice = Number.MIN_VALUE;
    props.data.forEach(el => {
        minPrice >= el.close && (minPrice = el.close);
        maxPrice <= el.close && (maxPrice = el.close);
        chartData.push([new Date(el.date), el.close]);
    })
    return(
        <div className={classes.root}>
            <div>
                <h1 className={classes.title}>{props.name}</h1>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={4}><h3>{`Current Price: $${props.price}`}</h3></Grid>
                <Grid item xs={4}><h3>{`Max Historical Price: $${maxPrice}`}</h3></Grid>
                <Grid item xs={4}><h3>{`Min Historical Price: $${minPrice}`}</h3></Grid>
            </Grid>
            <Chart 
                width={'100%'}
                height={'60vh'}
                chartType="LineChart"
                loader={<div>Loading Chart...</div>}
                data={chartData}
                options={{
                    hAxis: {
                      title: 'Date',
                    },
                    vAxis: {
                      title: 'Close Price',
                    },
                    series: {
                      1: { curveType: 'function' },
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
};

export default withStyles(styles)(Linecharts);