import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { TimeTable as TimeTableType, WeekDayItem } from '../../constants/interfaces';
import './index.scss';
import { getDailyTimeTable, formatTime, getNextWeekDayKey, getOpenTimeIdx, getCloseTimeIdx } from './helpers';

// Weekdays title/keys
const WEEK_DAYS: WeekDayItem[] = [
  {
    title: 'Monday',
    key: 'monday',
  },
  {
    title: 'Tuesday',
    key: 'tuesday',
  },
  {
    title: 'Wednesday',
    key: 'wednesday',
  },
  {
    title: 'Thursday',
    key: 'thursday',
  },
  {
    title: 'Friday',
    key: 'friday',
  },
  {
    title: 'Saturday',
    key: 'saturday',
  },
  {
    title: 'Sunday',
    key: 'sunday',
  },
];

const TimeTableItem = (props: { weekDay: WeekDayItem; timetable: TimeTableType; isToday: boolean }) => {
  const { weekDay, timetable, isToday } = props;

  // Sort current day times
  const dayTimeTable = getDailyTimeTable(weekDay.key, timetable);

  // Array with open hours pairs
  const openHours = [];
  // Current position in dayTimeTable
  let cursor;

  // Find open one (on current cursor position) - if can't - no more open slots
  // If we will have open records - day isn't closed
  do {
    cursor = getOpenTimeIdx(dayTimeTable, cursor);

    // If we can't find open time - end the search
    if (cursor === -1) {
      break;
    }

    const openTime = dayTimeTable[cursor].value;
    let closeTime = 0; // If we won't find the close time we assume that the store will close at 12 AM

    cursor = getCloseTimeIdx(dayTimeTable, cursor);

    if (cursor !== -1) {
      // We have close time in this day
      closeTime = dayTimeTable[cursor].value;
    } else {
      // Try to find close time in next day
      // The close time should be the first one in sorted array
      const nextDayTimeTable = getDailyTimeTable(getNextWeekDayKey(weekDay.key), timetable);
      const nextDayFirstCloseIdx = getCloseTimeIdx(nextDayTimeTable);

      if (nextDayFirstCloseIdx === 0) {
        closeTime = nextDayTimeTable[nextDayFirstCloseIdx].value;
      }
    }

    // Save our pair
    openHours.push([openTime, closeTime]);

    // Continue until we have close results
  } while (cursor !== -1);

  return (
    <div className="TimeTable-weekday">
      <div className="TimeTable-weekday-name">
        {weekDay.title}
        {isToday && <label className="TimeTable-label">Today</label>}
      </div>
      {openHours.length === 0 ? (
        <div className="TimeTable-weekday-workingHours TimeTable-weekday-workingHours--none">Closed</div>
      ) : (
        <div className="TimeTable-weekday-workingHours">
          {openHours.map(timePair => (
            <span className="TimeTable-timeSlot" key={timePair[0]}>
              <span>{formatTime(timePair[0])}</span> - <span>{formatTime(timePair[1])}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const TimeTable = (props: { timetable: TimeTableType }) => {
  const { timetable = {} } = props;
  // Get current day number 0-6 to determine today label
  // Because 0 represents Sunday we need to do shift
  let currentDayIdx = new Date().getDay() - 1;
  if (currentDayIdx === -1) {
    currentDayIdx = 6;
  }

  return (
    <div className="TimeTable">
      <h4 className="TimeTable-header">
        <AccessTimeIcon className="TimeTable-icon" />
        Opening hours
      </h4>
      <div className="TimeTable-weekdays">
        {WEEK_DAYS.map((weekDay, idx) => (
          <TimeTableItem key={weekDay.key} weekDay={weekDay} isToday={idx === currentDayIdx} timetable={timetable} />
        ))}
      </div>
    </div>
  );
};

export default TimeTable;
