import React from 'react';
import {Table} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import {Tooltip} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import Style from '../styles/style.css';


class table extends React.Component {
constructor(){
    super();
    this.state = {
        shift:[],
    }
}

componentDidMount(){

    let urlrosters = 'http://localhost:4567/rosters/2013-07-31/2014-07-16';
    let urlshifts = 'http://localhost:4567/shifts/2013-07-31/2014-07-16';
     var punctual = 0;
     var late = 0;
     var early =0;
    
    fetch(urlrosters)
      .then(response =>{
          return response.json();
      })
      .then(data => {
               fetch(urlshifts)
      .then(cresponse =>{
          return cresponse.json();
      })
      .then(callback => {
          this.setState({shifts:callback});
      
            let roasts = data.map((roasters,index)=>{
            var dateFormat = require('dateformat');
            var bolean = false;
            for(var x=0; x<this.state.shifts.length;x++){
                if(roasters.date === this.state.shifts[x].date){
                    if(dateFormat(this.state.shifts[x].finish, "h:MM TT")>dateFormat(this.state.shifts[x].start, "h:MM TT")){
                        let shifts = this.state.shifts[x];
                                    return (
                                <tr key={index}>
                                <td>{dateFormat(roasters.date, " mmmm dS, yyyy")}</td>
                                <td>{dateFormat(roasters.start, "h:MM TT")}</td>
                                <td>{this.checkArrived(roasters.start,shifts.start)}</td>
                                <td>{dateFormat(roasters.finish, "h:MM TT")}</td>
                                <td>{this.checkLeft(roasters.finish,shifts.finish)}</td>
                                </tr>
                            ) 
                    }
                    else{
                                        return (
                                <tr style={{background:"red",color:"white"}} key={index}>
                                <td>{dateFormat(roasters.date, " mmmm dS, yyyy")}</td>
                                <td>{dateFormat(roasters.start, "h:MM TT")}</td>
                                <td>Invalid Shift</td>
                                <td>{dateFormat(roasters.finish, "h:MM TT")}</td>
                                <td>Invalid Shift</td>
                                </tr>)
                    }

              bolean = true;
                }
            }
            if(bolean === false){   
                                    return(
                                <tr style={{background:"yellow"}} key={index}>
                                <td>{dateFormat(roasters.date, " mmmm dS, yyyy")}</td>
                                <td>{dateFormat(roasters.start, "h:MM TT")}</td>
                                <td>Absent</td>
                                <td>{dateFormat(roasters.finish, "h:MM TT")}</td>
                                <td>Absent</td>
                            </tr>
                                    )
             bolean = false;
            }

              
          })
          this.setState({roasters:roasts});
          })
      })
      
      
}

render(){
    return(<div className="container">
        <Table responsive>
            <thead>
                <tr>
                <th>Day</th>
                <th>Rostered Start</th>
                <th>Actual Start</th>
                <th>Rostered Finish</th>
                <th>Actual Finish</th>
                </tr>
            </thead>
            <tbody>
                {this.state.roasters}
            </tbody>
    </Table>
</div>);
}

toolTip(shifts){
    return (
        <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
    )
}

checkArrived(roster,shift){
    var dateFormat = require('dateformat');
    if(dateFormat(shift, "h:MM TT") > dateFormat(roster, "h:MM TT")){
       var min =  shift - roster;
        min =  new Date(shift) - new Date(roster);
        var time = "";
            
        var seconds = (min / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours !== "") {
        if(seconds){
             minutes = minutes + 1;
             time =  hours + ":" + minutes;
        }
        time =  hours + ":" + minutes;
      }
       if(seconds){
         minutes = minutes + 1;
         if(minutes === 1){
              time = minutes + "a minute ";
         }
         else{
              time = minutes + " minutes ";
         }
      
       }
        return(
            <div> Arrived Late <Label bsStyle="danger" > {time} </Label></div>
        );
    }else{
        return "on time";
    }
}

checkLeft(roster,shift){
    var dateFormat = require('dateformat');
    if(dateFormat(shift, "h:MM TT") < dateFormat(roster, "h:MM TT")){
        var min =  new Date(shift) - new Date(roster);
        var time = "";
            
            min = Math.abs(min);

        var seconds = (min / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours !== "") {
        if(seconds){
             minutes = minutes + 1;
             time =  hours + ":" + minutes;
        }
        time =  hours + ":" + minutes;
      }
       if(seconds){
         minutes = minutes + 1;
         if(minutes === 1){
              time = minutes + "a minute ";
         }
         else{
              time = minutes + " minutes ";
         }
      
       }
        return(
            <div> left early  <div className="tooltips"><Label bsStyle="danger"> {time}</Label><span class="tooltiptexts">Tooltip text</span></div></div>
        );
    }else{
        return "on time";
    }

}

 



}
export default table;
