import {
  TimeTable as TimeTableType,
  DayOfWeek,
  DailyTimeTable,
  DailyTimeTableType,
  DailyTimeTableTypeOpen,
  DailyTimeTableTypeClose,
} from '../../constants/interfaces';

// Return empty or sorted day
export const getDailyTimeTable = (dayOfWeek: DayOfWeek, timetable: TimeTableType): DailyTimeTable[] => {
  const dayTimeTable = timetable[dayOfWeek] || [];

  // Make array copy and then return it
  return dayTimeTable.slice().sort((a, b) => a.value - b.value);
};

export const formatTime = (time: number = 0): string => {
  // Normalize the value
  // and convert to ms for Date constructor
  time = (time % 86400) * 1000;
  const date = new Date(time);

  // We use UTC functions because Date constructor accepts seconds in UTC
  let hours = date.getUTCHours();

  const isAM = hours < 12;
  if (hours === 0) {
    hours = 12;
  } else if (hours > 13) {
    hours -= 12;
  }
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const displayValues = [hours];
  if (minutes > 0 || seconds > 0) {
    displayValues.push(minutes);

    if (seconds > 0) {
      displayValues.push(seconds);
    }
  }

  // Add leading "0" if need, join by ":" and add AM/PM
  return `${displayValues.map((val, idx) => `${idx > 0 ? '0' : ''}${val}`.slice(-2)).join(':')} ${isAM ? 'AM' : 'PM'}`;
};

export const getNextWeekDayKey = (dayOfWeek: DayOfWeek): DayOfWeek => {
  const weekDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let weekDayIdx = weekDays.indexOf(dayOfWeek);

  if (weekDayIdx === weekDays.length - 1) {
    weekDayIdx = -1;
  }

  // Go one day further and return it's key
  return weekDays[++weekDayIdx];
};

const getTimeIdx = (type: DailyTimeTableType, dayTimeTable: DailyTimeTable[], startIdx: number = 0) => {
  // Don't allow negative startIdx
  startIdx = Math.max(0, startIdx);
  const foundedIdx = dayTimeTable.slice(startIdx).findIndex(timeRecord => timeRecord.type === type);

  // Add startIdx to found index to respect original array indexes
  // If item not found - return -1
  return foundedIdx === -1 ? foundedIdx : foundedIdx + startIdx;
};

export const getOpenTimeIdx = getTimeIdx.bind({}, DailyTimeTableTypeOpen);
export const getCloseTimeIdx = getTimeIdx.bind({}, DailyTimeTableTypeClose);
