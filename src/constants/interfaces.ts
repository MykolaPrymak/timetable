type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type DailyTimeTableType = 'open' | 'close';

interface DailyTimeTable {
  type: DailyTimeTableType;
  value: number;
}

export interface WeekDayItem {
  title: string;
  key: DayOfWeek;
}

export type TimeTable = {
  [key in DayOfWeek]?: DailyTimeTable[];
};
