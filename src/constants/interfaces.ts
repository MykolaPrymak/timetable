type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const DailyTimeTableTypeOpen = 'open';
export const DailyTimeTableTypeClose = 'close';

export type DailyTimeTableType = typeof DailyTimeTableTypeOpen | typeof DailyTimeTableTypeClose;

export interface DailyTimeTable {
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
