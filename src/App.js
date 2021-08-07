import './App.css';
import TimeTable from './components/TimeTable';

const timetables = [
  [
    'Open just one day in the week',
    {
      monday: [
        { type: 'open', value: 32400 },
        { type: 'close', value: 72000 },
      ],
    },
  ],

  [
    'Opens only one day and closed on next',
    {
      monday: [
        {
          type: 'close',
          value: 3600,
        },
      ],
      sunday: [
        {
          type: 'open',
          value: 64800,
        },
      ],
    },
  ],

  [
    'Closing on next day and have next day time slots',
    {
      friday: [
        {
          type: 'open',
          value: 64800,
        },
      ],
      saturday: [
        {
          type: 'close',
          value: 3600,
        },
        {
          type: 'open',
          value: 32400,
        },
        {
          type: 'close',
          value: 39600,
        },
        {
          type: 'open',
          value: 57600,
        },
        {
          type: 'close',
          value: 82800,
        },
      ],
    },
  ],

  [
    'Full data formatting example',
    {
      monday: [],
      tuesday: [
        { type: 'open', value: 36000 },
        { type: 'close', value: 64800 },
      ],
      wednesday: [],
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
    },
  ],

  [
    'Multislot day',
    {
      monday: [],
      tuesday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 7200 },
        { type: 'open', value: 36000 },
        { type: 'close', value: 39800 },
        { type: 'open', value: 43200 },
        { type: 'close', value: 75600 },
      ],
    },
  ],
  [
    'One more multi slot and next day close timetable',
    {
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
    },
  ],
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Timetable Examples</p>
      </header>
      <div className="App-content">
        {timetables.map(([title, timetable]) => (
          <div>
            <h3>{title}</h3>
            <TimeTable key={title} timetable={timetable} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
