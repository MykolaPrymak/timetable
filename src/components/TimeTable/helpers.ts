import {
  DailyTimeTable,
  DailyTimeTableType,
  DailyTimeTableTypeOpen,
  DailyTimeTableTypeClose,
} from '../../constants/interfaces';

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

const getTimeIdx = (type: DailyTimeTableType, dayTimeTable: DailyTimeTable[], startIdx: number = 0) => {
  const foundedIdx = dayTimeTable.slice(startIdx).findIndex(timeRecord => timeRecord.type === type);

  // Add startIdx to found index to respect original array indexes
  // If item not found - return -1
  return foundedIdx === -1 ? foundedIdx : foundedIdx + startIdx;
};
export const getOpenTimeIdx = getTimeIdx.bind({}, DailyTimeTableTypeOpen);
export const getCloseTimeIdx = getTimeIdx.bind({}, DailyTimeTableTypeClose);
