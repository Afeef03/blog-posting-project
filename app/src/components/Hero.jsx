import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backImg from '/images/work.jpg';

const useStyles = makeStyles(() => ({
    heroSection: {
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
}));

const Hero = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.heroSection}>
      <Grid item>
        <Typography variant="body1" align="center">
          MyBlogs
        </Typography>

        <Typography variant="h2" align="center" className='hero-para'>
        Words weaving stories, ideas unfold, knowledge shared.
        </Typography>
        <Typography variant="subtitle1" align="center">
          Explore and discover amazing things!
        </Typography>
      </Grid>
    </Grid>
    );
};

export default Hero;
