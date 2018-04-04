import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navheader from './components/includes/header.jsx';
import Footer from './components/includes/footer.jsx';
import Table from './components/table/table.jsx';



/*
let fizzBuzz = function(){
    return "asd";
}

//plain js
const myReactElement = React.createElement(
  'div',                 // this element we want to create
  { onClick: fizzBuzz }, // the properties we want to add to the element
  'Hey World!'           // a child element
);

//jsx
const myReactEl = (
  <div className="box">
    <div className="message">
      <span>Hello World</span>
    </div>
  </div>
)
*/

ReactDOM.render(<Navheader/>, document.getElementById('header'));
ReactDOM.render(<Table/>, document.getElementById('root'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));


