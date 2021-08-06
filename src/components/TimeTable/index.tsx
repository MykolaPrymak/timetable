import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { TimeTable as TimeTableType } from '../../constants/interfaces';
import './index.scss';

//DayOfWeek

const TimeTable = (prop: { timetable: TimeTableType }) => {
  return (
    <div className="TimeTable">
      <div className="TimeTable-header">
        <AccessTimeIcon />
        Opening hours
      </div>
    </div>
  );
};

export default TimeTable;
