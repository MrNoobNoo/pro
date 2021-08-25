import React from 'react';
import './App.css';
import Labels from './Labels'
import Filter from './Filter';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';


const TaskOne = () => {

  const classes = useStyles();
	return (
		<div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: 10}}>
    <div>
    <Link to='/tasktwo'>Go to TaskTwo</Link>
    </div>
			  {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'> */}
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', paddingTop: 50}}>
        <Card className={classes.root}>
    <div>
      <Filter/>
    </div>
    </Card>
    </div>
			
		</div>
	)
};

const TaskTwo = () => {
  const classes = useStyles();

	return (
		<div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: 10}}>
    <div>
				<Link to='/'>Go to Task one</Link>
    </div>
        
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', paddingTop: 50}}>
        <Card className={classes.root}>
    <div>
      <Labels/>
    </div>
    </Card>
    </div>
    
		</div>
	)
};

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

export {TaskOne, TaskTwo } ;

