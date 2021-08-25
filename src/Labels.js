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
  const [callData, setCallData] = useState(null) // Call data received from api
  //const [changeCallData, setChangeCallData] = useState(false) // Boolean to reduce api calls. Can also be used with evenLister to update frontend data incase data is change in backend.
  const [selectedIds, setSelectedIds] = useState([]); // containes the agents selected for queries in value label pairs
  const [inputLabel, setInputLabel] = useState("Enter Label Here"); // contains user input label
  const [selectedIdss, setSelectedIdss] = useState("kahli h"); // fetching list of ids clicked by user.


    //console.log(labelList);
    //console.log(callData);
    //console.log(options);
    //console.log(selectedIds);
    //console.log(selectedIdss);

    


    useEffect( () => { 
        
        const fetch = async () => {
        
        const { data } = await axios.get('https://damp-garden-93707.herokuapp.com/getlistoflabels', {
            headers: { 
                'Content-Type': 'application/json', 
                'user_id': '24b456'
              }
        });
        setLabelList(data.data.unique_label_list);
        //setChangeCallData(false);
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
        //setChangeCallData(true);
      };
      fetch();
      }, []);


  const options = [];
    for (let i = 0; i < labelList.length; i++) {
        options.push({ value: i, label: i});
      }
    
  const remValidate = () => {                                     // Triggers on RemoveButton
        const ids = [];
        for (let i = 0; i < selectedIds.length; i++) {
          ids.push(selectedIds[i].value);
        }

        console.log(ids);

        if(labelList.indexOf(inputLabel) !== -1){

          var data = JSON.stringify({
            "operation": {"callList": ids,"label_ops": [{"name": inputLabel,"op": "remove"}]}
          });
          
          var config = {
            method: 'post',
            url: 'https://damp-garden-93707.herokuapp.com/applyLabels',
            headers: { 
              'Content-Type': 'application/json', 
              'user_id': '24b456'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          alert('Labels removed succesfully. This may take some minutes to reflect.');
          //window.location.reload();

        }
        else{
          alert("This Label does not exist for selected Ids")
        }
    }
    
  const classes = useStyles();
   
  const addValidate = () => {
      
      if(inputLabel.length >60){
        alert("Label's length should be between 0 and 60")
      }
      else if(inputLabel.indexOf(' ') >= 0)
        {alert("No whitespaces allowed in Labels")}
      else {
        
        const ids = [];
        for (let i = 0; i < selectedIds.length; i++) {
          ids.push(selectedIds[i].value);
        }

        console.log(ids);


          var data = JSON.stringify({
            "operation": {"callList": ids,"label_ops": [{"name": inputLabel,"op": "add"}]}
          });
          
          var config = {
            method: 'post',
            url: 'https://damp-garden-93707.herokuapp.com/applyLabels',
            headers: { 
              'Content-Type': 'application/json', 
              'user_id': '24b456'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          alert("The label has been succesfully applied on the ids selected. This may take some time to reflect.");
          setInputLabel("Enter Label here");
        

      
    }

  }

    return(

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
          <h1>Task 2</h1>
        <div style = {{width: 500, padding: 50 }}>
        <div style = {{padding: 10}}>
        <Typography style={{textAlign: 'center',}}>List of IDs</Typography>
        </div>
        <div>
          <Select
          defaultValue={selectedIds}
          onChange={setSelectedIds}
          options={options}
          isMulti={true}
          / >
        </div>
        </div>
        <div style={{padding: 10}}>
        <Typography style={{textAlign: 'center', paddingTop: 5}}>Enter the Label here</Typography>
        </div>
        <div style={{paddingTop: 20}}>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Enter Label here"
          variant="outlined"
          onChange= {(e) => {setInputLabel(e.target.value),console.log(e.target.value)}}
        />
        </div>
        <div style={{paddingTop: 10}}>
        <Button style={{border: '2px solid black', borderRadius: 7 , width: 110, backgroundColor: '#5CFF5C'}} onClick={addValidate}>Add</Button>
        </div>
        <div style={{paddingTop: 10}}>
        <Button style={{border: '2px solid black', borderRadius: 7, width: 110, backgroundColor: '#FF5C5C'}} onClick={remValidate}>Remove</Button>
        </div>

        <div>
           <CallData data={callData}/>
        </div>
        

        </div>

    );

};

export default Labels