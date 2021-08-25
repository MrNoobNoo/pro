import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IdLabels from './IdLabels';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
const CallData = props => {

  

   if(props.data===null){
       return <div style={{paddingTop: 25}}>Use the form above to fetch filtered results.</div>;
   }

    const idLabelsHelper = (labels) => {
        // cost ala 
        // console.log(labels); 
        return(

          <div style={{}}>
            <IdLabels data ={labels}/>
          </div>
        );
    } 

    const listItems = props.data.map((d, index) => {
      return (
        <div style={{padding: 2}}>
        <div style={{ width: 500, display: "flex",  padding: 5, border: '2px solid black', borderRadius: 7 }}>
          <div>
            {/* // check box  */}
          </div>
          <div style={{ width: 100, padding: 5, fontSize: 30, }}>
            {d.call_id}
          </div>
          
          <div style = {{width : 400, padding: 5, paddingLeft: 100}}>
            {idLabelsHelper(d.label_id)}
          </div>
        </div>
        </div>

      );
    });

    const classes = useStyles();

    return (
      
        <div style={{padding: 5}}>
          <div style = {{padding: 10}}>
            {listItems}
          </div>
        </div>
      
    );
};

export default CallData;