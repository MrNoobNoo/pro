import React, {  useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import { Typography, Button } from '@material-ui/core';
import AgentList from './AgentList'


function valuetext(value) {
  return `${value}°C`;
}

var data = JSON.stringify();





const Filter = () => {

  const [term, setTerm] = useState([]);
  const [agentList, setAgentList] = useState([]); // contains every agent name
  const [selectedOption, setSelectedOption] = useState([]); // containes the agents selected for queries in value label pairs
  const [curAgent, setCurAgent] = useState([]); // contains agents in array format
  const [value, setValue] = useState([0,10]); // contains range for call duration
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [filtered, setfiltered] = useState(null);

  //const max = 0;
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  console.log(agentList);
  console.log(selectedOption);
  console.log(value);
  console.log(min);
  console.log(max);
  console.log("wahh"+filtered);
  //console.log(term);


  useEffect( () => { 
    const fetch = async () => {
    const { data } = await axios.get('https://damp-garden-93707.herokuapp.com/getlistofagents');
    setAgentList(data.data.listofagents);
  };
  fetch();
  }, []);


  useEffect( () => { 
    const fetch = async () => {
    const { data } = await axios.get('https://damp-garden-93707.herokuapp.com/getdurationrange');
   
    setMin(data.data.minimum);
    setMax(data.data.maximum);
    setValue([data.data.minimum,data.data.maximum]);
  };
  fetch();
  }, []);

  const fetchData = () => {
    const updateCurrent = [];
    for (let i = 0; i < selectedOption.length; i++) {
      //options.push({ value: agentList[i], label: agentList[i]});
      updateCurrent.push(selectedOption[i].value);
    }
    console.log("curr" + updateCurrent);
    console.log("curre" + value);
    

    var config = {
      method: 'post',
      url: 'https://damp-garden-93707.herokuapp.com/getfilteredcalls',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        "info": {
          "filter_agent_list": updateCurrent,
          "filter_time_range": value
        }
      }
    };
    axios(config)
      .then(function (response) {
        setfiltered(response.data);
       //console.log(response.data);
    })
      .catch(function (error) {
        console.log(error);
    });
    //update filtered
  }


  const options = [];


  for (let i = 0; i < agentList.length; i++) {
    options.push({ value: agentList[i], label: agentList[i]});
  }

  //options.push({ value: 'harry', label: 'potter'});

  return (
      <div className="Home" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'    }}>
        <h1>Task 1</h1>
        <div style = {{width: 1000, paddingTop: 50 }}> 
          <Typography style={{textAlign: 'center'}}>Enter the list of Agents</Typography>
          <Select
          style={{paddingTop: 20}}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti={true}
          / >
        </div>
        <div style = {{paddingTop: 20, width: 500}}>
        <Typography  style={{textAlign: 'center'}}>Select the call duration range</Typography>
          <Slider
           value={value}
           onChange={handleChange}
           valueLabelDisplay="auto"
           a ria-labelledby="range-slider"
           getAriaValueText={valuetext}
           min ={min}
           max ={max}
          />
        </div>
        <div>
          <Typography style={{}}>{"Selected Range is " + value[0] +" : "+ value[1] }</Typography>
        </div>
        <div style={{paddingTop: 20}}>
        <Button variant="contained" color="primary" onClick={fetchData}>Sumbit</Button>
        </div>
        <div style={{paddingTop: 20}}>
          <AgentList data={filtered}/>
        </div>
      </div>

  );

};

export default Filter;
