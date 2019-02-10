import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  });

function OwnedStocks(props) {
    const { classes } = props;
        return(
            <div>
                <h3>Stocks</h3>
                <div className={classes.root}>
                    <Grid container spacing={8}>
                        <Grid item xs={8}>
                        <Paper className={classes.paper}>MSFT</Paper>
                        </Grid>
                        <Grid item xs={8}>
                        <Paper className={classes.paper}>APPL</Paper>
                        </Grid>
                        <Grid item xs={8}>
                        <Paper className={classes.paper}>AMD</Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
}

OwnedStocks.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(OwnedStocks);

