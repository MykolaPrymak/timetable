import { TimeTable as TimeTableType, DailyTimeTable } from '../../../constants/interfaces';
import { getDailyTimeTable, formatTime, getNextWeekDayKey, getOpenTimeIdx, getCloseTimeIdx } from '../helpers';

describe('getDailyTimeTable', () => {
  it('should return empty array if no day is present', () => {
    const timetable: TimeTableType = {};
    const dayTimeTable = getDailyTimeTable('monday', timetable);

    expect(dayTimeTable).toStrictEqual([]);
  });

  it('should return sorted array of time slots based on value', () => {
    const timetable: TimeTableType = {
      monday: [
        { type: 'close', value: 100 },
        { type: 'open', value: 10 },
      ],
    };

    const dayTimeTable = getDailyTimeTable('monday', timetable);

    expect(dayTimeTable).toStrictEqual([
      { type: 'open', value: 10 },
      { type: 'close', value: 100 },
    ]);
  });

  it('should not mutate original array of time slots', () => {
    const timetable: TimeTableType = {
      monday: [
        { type: 'close', value: 100 },
        { type: 'open', value: 10 },
      ],
    };

    getDailyTimeTable('monday', timetable);

    expect(timetable.monday).toStrictEqual([
      { type: 'close', value: 100 },
      { type: 'open', value: 10 },
    ]);
  });

  it('should not remove empty close time slot', () => {
    const timetable: TimeTableType = {
      monday: [{ type: 'close', value: 100 }],
    };

    const dayTimeTable = getDailyTimeTable('monday', timetable);

    expect(dayTimeTable).toStrictEqual([{ type: 'close', value: 100 }]);
  });

  it('should not remove repeated time slots', () => {
    const timetable: TimeTableType = {
      monday: [
        { type: 'close', value: 100 },
        { type: 'close', value: 100 },
        { type: 'close', value: 100 },
        { type: 'close', value: 100 },
        { type: 'open', value: 10 },
        { type: 'open', value: 20 },
      ],
    };

    const dayTimeTable = getDailyTimeTable('monday', timetable);

    expect(dayTimeTable).toStrictEqual([
      { type: 'open', value: 10 },
      { type: 'open', value: 20 },
      { type: 'close', value: 100 },
      { type: 'close', value: 100 },
      { type: 'close', value: 100 },
      { type: 'close', value: 100 },
    ]);
  });
});

describe('formatTime', () => {
  it('should return proper value if no argument is passed', () => {
    expect(formatTime()).toBe('12 AM');
  });

  it('should normalize the input value (skip seconds >= 86400)', () => {
    expect(formatTime(86400)).toBe('12 AM');
  });

  it('should return expected value', () => {
    const testValues = [
      [3600, '1 AM'],
      [32400, '9 AM'],
      [36000, '10 AM'],
      [37800, '10:30 AM'],
      [37820, '10:30:20 AM'],
      [39600, '11 AM'],
      [43200, '12 PM'],
      [64800, '6 PM'],
      [57600, '4 PM'],
      [82800, '11 PM'],
      [86399, '11:59:59 PM'],
    ];

    testValues.forEach(val => {
      const [time, formattedValue] = val;
      expect(formatTime(time as number)).toBe(formattedValue);
    });
  });
});

describe('getNextWeekDayKey', () => {
  it('should return monday for unknown input', () => {
    expect(getNextWeekDayKey('something')).toBe('monday');
    expect(getNextWeekDayKey(2)).toBe('monday');
  });

  it('should return expected value', () => {
    const testCases = [
      ['monday', 'tuesday'],
      ['tuesday', 'wednesday'],
      ['wednesday', 'thursday'],
      ['thursday', 'friday'],
      ['friday', 'saturday'],
      ['saturday', 'sunday'],
      ['sunday', 'monday'],
    ];

    testCases.forEach(testCase => {
      const [currentDay, nextDay] = testCase;
      expect(getNextWeekDayKey(currentDay)).toBe(nextDay);
    });
  });
});

describe('getOpenTimeIdx/getCloseTimeIdx', () => {
  const openedTimeTable: DailyTimeTable[] = [{ type: 'open', value: 10 }];
  const closedTimeTable: DailyTimeTable[] = [{ type: 'close', value: 100 }];

  const multiOpenedTimeTable: DailyTimeTable[] = [
    { type: 'open', value: 10 },
    { type: 'open', value: 20 },
    { type: 'open', value: 30 },
    { type: 'open', value: 40 },
  ];
  const timeTable: DailyTimeTable[] = [
    { type: 'open', value: 10 },
    { type: 'open', value: 20 },
    { type: 'open', value: 30 },
    { type: 'open', value: 40 },
    { type: 'close', value: 100 },
    { type: 'close', value: 200 },
    { type: 'open', value: 400 },
  ];

  it("should return -1 if can't find corresponding time table record", () => {
    expect(getOpenTimeIdx(closedTimeTable)).toBe(-1);

    expect(getCloseTimeIdx(openedTimeTable)).toBe(-1);

    expect(getCloseTimeIdx(multiOpenedTimeTable)).toBe(-1);
  });

  it("should return -1 if can't find corresponding time table record and start index is provided", () => {
    expect(getOpenTimeIdx(closedTimeTable, 1)).toBe(-1);
    expect(getOpenTimeIdx(closedTimeTable, 1)).toBe(-1);
    expect(getOpenTimeIdx(closedTimeTable, 100)).toBe(-1);
    expect(getOpenTimeIdx(closedTimeTable, 0)).toBe(-1);
    expect(getOpenTimeIdx(closedTimeTable, -1)).toBe(-1);
    expect(getOpenTimeIdx(closedTimeTable, -10)).toBe(-1);

    expect(getCloseTimeIdx(openedTimeTable, 1)).toBe(-1);
    expect(getCloseTimeIdx(openedTimeTable, 100)).toBe(-1);
    expect(getCloseTimeIdx(openedTimeTable, 0)).toBe(-1);
    expect(getCloseTimeIdx(openedTimeTable, -1)).toBe(-1);
    expect(getCloseTimeIdx(openedTimeTable, -10)).toBe(-1);
  });

  it('should return first founded index of time table sequential records', () => {
    expect(getOpenTimeIdx(multiOpenedTimeTable)).toBe(0);
  });

  it('should return proper index for time table sequential records if startIdx provided', () => {
    expect(getOpenTimeIdx(multiOpenedTimeTable, 0)).toBe(0);
    expect(getOpenTimeIdx(multiOpenedTimeTable, 1)).toBe(1);
    expect(getOpenTimeIdx(multiOpenedTimeTable, 2)).toBe(2);
    expect(getOpenTimeIdx(multiOpenedTimeTable, 3)).toBe(3);
    // We go out of time records - nothing there
    expect(getOpenTimeIdx(multiOpenedTimeTable, 4)).toBe(-1);
  });

  it('should return expected value', () => {
    const testCases = [
      // [type, startIdx, expected value]

      ['open', 0, 0],
      ['open', 1, 1],
      ['open', 2, 2],
      ['open', 3, 3],
      ['open', 4, 6],
      ['open', 5, 6],
      ['open', 6, 6],
      ['open', 7, -1],

      ['close', 0, 4],
      ['close', 1, 4],
      ['close', 3, 4],
      ['close', 4, 4],
      ['close', 5, 5],
      ['close', 6, -1],
      ['close', 7, -1],

      // Negative index are ignored
      ['open', -1, 0],
      ['open', -10, 0],
      ['close', -1, 4],
      ['close', -15, 4],
    ];

    testCases.forEach(testCase => {
      const [type, startIdx, expectedIdx] = testCase;
      if (type === 'open') {
        expect(getOpenTimeIdx(timeTable, startIdx as number)).toBe(expectedIdx);
      } else {
        expect(getCloseTimeIdx(timeTable, startIdx as number)).toBe(expectedIdx);
      }
    });
  });
});
