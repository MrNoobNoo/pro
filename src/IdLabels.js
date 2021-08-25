import React from 'react';

const IdLabels = props => {

    const listItems = props.data.map((d, index) => {
        return (
  
          <div style={{padding: 5}}>
            <div style = {{ border: '1px solid black', borderRadius: 7, padding: 5}}>
              {d}
            </div>
          </div>
  
        );
      });
      

    return (
        <div style = {{display: "flex", flexWrap: 'wrap'}}>
            {listItems}
        </div>
    );
}
  

export default IdLabels;