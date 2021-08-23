import React from 'react';
import './App.css';
import Labels from './Labels'
import Filter from './Filter';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    
     width: 1000,
     padding: 50,
    //display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default () => {
  const classes = useStyles();

  // Labels.js for Labels task is still in works.
  // Filter.js is for the Task 1 

  return (
  //  <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'>
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', paddingTop: 50}}>
    <Card className={classes.root}>
    <div><Filter/></div>
    </Card>
    </div>
  
    );

};
