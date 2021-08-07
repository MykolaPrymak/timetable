import { render } from '@testing-library/react';

import { TimeTable as TimeTableType } from '../../../constants/interfaces';
import TimeTable from '../index';

// Open just one day in the week
const oneDayTimeTable: TimeTableType = {
  monday: [
    { type: 'open', value: 32400 },
    { type: 'close', value: 72000 },
  ],
};

// Opens only one day and closed on next
const nextDayCloseTimeTable: TimeTableType = {
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
};

// Closing on next day and have next day time slots
const nextDayCloseAndOpenTimeTable: TimeTableType = {
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
};

// Full data formatting example
const fullWeekTimeTable: TimeTableType = {
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
};

// Multislot day
const multislotWeekTimeTable: TimeTableType = {
  monday: [],
  tuesday: [
    { type: 'open', value: 3600 },
    { type: 'close', value: 7200 },
    { type: 'open', value: 36000 },
    { type: 'close', value: 39800 },
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 },
  ],
};

describe('<TimeTable />', () => {
  let getDay = Date.prototype.getDay;

  beforeEach(() => {
    // Mock new Date().getDay() to prevent changing the today label
    Date.prototype.getDay = () => 6; // We will have always Saturday
  });

  afterAll(() => {
    Date.prototype.getDay = getDay;
  });

  it('renders default all closed timetable if nothing is passed', () => {
    const { container } = render(<TimeTable />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders today label at Sunday', () => {
    Date.prototype.getDay = () => 0;
    const { container } = render(<TimeTable />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders one open day in the week', () => {
    const { container } = render(<TimeTable timetable={oneDayTimeTable} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders properly if close time is on next day', () => {
    const { container } = render(<TimeTable timetable={nextDayCloseTimeTable} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders properly if close time is on next day and we have time slots on next day', () => {
    const { container } = render(<TimeTable timetable={nextDayCloseAndOpenTimeTable} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders properly if we have full week of time slots', () => {
    const { container } = render(<TimeTable timetable={fullWeekTimeTable} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders properly if we have couple of time slots in one day', () => {
    const { container } = render(<TimeTable timetable={multislotWeekTimeTable} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
