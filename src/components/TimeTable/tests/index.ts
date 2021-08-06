import { TimeTable } from '../../../constants/interfaces';

const inputs: TimeTable[] = [
  // Open just one day in the week
  {
    monday: [
      { type: 'open', value: 32400 },
      { type: 'close', value: 72000 },
    ],
  },

  // Closing on next day
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
  // Full data formatting example
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
];
