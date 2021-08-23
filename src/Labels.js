import React, { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios';
// import arrayMove from 'array-move';
import Select from 'react-select';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CallData from './CallData';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  

const Labels = () => {

    const [labelList, setLabelList] = useState([]);  // list of unique labels
    const [callData, setCallData] = useState(null) // Call data
    const [selectedIds, setSelectedIds] = useState([]); // containes the agents selected for queries in value label pairs


    console.log(labelList);
    console.log(callData);
    //console.log(options);
    console.log(selectedIds);


    useEffect( () => { 
        const fetch = async () => {
        const { data } = await axios.get('https://damp-garden-93707.herokuapp.com/getlistoflabels', {
            headers: { 
                'Content-Type': 'application/json', 
                'user_id': '24b456'
              }
        });
        setLabelList(data.data.unique_label_list);
      };
      fetch();
      }, []);

    useEffect( () => { 
        const fetch = async () => {
        const { data } = await axios.get('https://damp-garden-93707.herokuapp.com/getcalllist', {
            headers: { 
                'Content-Type': 'application/json', 
                'user_id': '24b456'
              }
        });
        setCallData(data.data.call_data);
      };
      fetch();
      }, []);


    const options = [];
    options.push({ value: 'harry', label: 'potter'});
    for (let i = 0; i < labelList.length; i++) {
        options.push({ value: i, label: i});
      }
    
      const labelOperation = () => {

      }
    
    const classes = useStyles();
   


    return(

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
        <div style = {{width: 500, paddingTop: 200 }}>
        <Typography style={{textAlign: 'center'}}>List of IDs</Typography>
          <Select
          style={{paddingTop: 20}}
          defaultValue={selectedIds}
          onChange={setSelectedIds}
          options={options}
          isMulti={true}
          / >
        </div>
        
        <Typography style={{textAlign: 'center', paddingTop: 20}}>Enter the Label here</Typography>
        <div style={{paddingTop: 20}}>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Enter Label here"
          variant="outlined"
        />
        </div>
        <div style={{paddingTop: 20}}>
        <Button variant="contained" color="primary" onClick={labelOperation}>Add</Button>
        </div>
        <div style={{paddingTop: 20}}>
        <Button variant="contained" color="primary" onClick={labelOperation}>Remove</Button>
        </div>

        <div>
           <CallData data={callData} />
        </div>
        

        </div>

    );

};

export default Labels