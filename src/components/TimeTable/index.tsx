import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { TimeTable as TimeTableType, WeekDayItem } from '../../constants/interfaces';
import './index.scss';

//
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
  const { weekDay, isToday } = props;
  // Sort current day times
  // Find open one - if not - the day is Closed
  // if today - show label

  return (
    <div className="TimeTable-weekday">
      <div className="TimeTable-weekday-name">
        {weekDay.title}
        {isToday && <label className="TimeTable-label">Today</label>}
      </div>
      <div className="TimeTable-weekday-workingHours TimeTable-weekday-workingHours--none">Closed</div>
    </div>
  );
};

const TimeTable = (props: { timetable: TimeTableType }) => {
  const { timetable } = props;
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
