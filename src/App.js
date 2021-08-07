import logo from './logo.svg';
import './App.css';

import TimeTable from './components/TimeTable';
/*
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"> 
    font-family: 'Roboto', sans-serif;
*/

const timetable = {
  monday: [
  
  { type: 'open', value: 3600 },
  { type: 'close', value: 7200 },
  { type: 'open', value: 36000 },
  { type: 'close', value: 39800 },
  { type: 'open', value: 43200 },
  { type: 'close', value: 75600 },
  
],
  tuesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  wednesday: [
    
    { type: 'open', value: 37800 },
    { type: 'close', value: 41400 },
    
  ],
  thursday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  friday: [{ type: 'open', value: 36000 }],
  saturday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 36000 },
  ],
  sunday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 },
  ],
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <TimeTable timetable={timetable} />
    </div>
  );
}

export default App;
