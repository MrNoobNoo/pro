import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
const AgentList = props => {

   if(props.data===null){
       return <div style={{paddingTop: 25}}>Use the form above to fetch filtered results.</div>;
   }
   
        console.log(props.data);
    
    const listItems = props.data.data.map((d) => {
        return (
        <TableRow key={d.name}>
          
          <TableCell >{d.agent_id}</TableCell>
          <TableCell >{d.call_id}</TableCell>
          <TableCell >{d.call_time}</TableCell>
        </TableRow>
        );
    });

    const classes = useStyles();

    
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Agent Name</TableCell>
                <TableCell >Call ID</TableCell>
                <TableCell>Call Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listItems}
            </TableBody>
          </Table>
        </TableContainer>
      );
};

export default AgentList;