import type { Day, DayShorthand } from 'custom-types';

export const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const hours = [
  '8:00-8:55',
  '9:05-10:00',
  '10:10-11:05',
  '11:15-12:10',
  '12:20-1:15',
  '1:25-2:20',
  '2:30-3:25',
  '3:35-4:30'
];

export const formatDayToInt = (day: Day): number => {
  switch (day) {
    case 'Monday':
      return 0;
    case 'Tuesday':
      return 1;
    case 'Wednesday':
      return 2;
    case 'Thursday':
      return 3;
    case 'Friday':
      return 4;
  }
};

export const formatHourToInt = (hour: string): number => {
  // Match everything before "-" and remove ":"
  let time = parseInt(hour.match(/[^-]*/)![0].replace(':', ''));

  if (time < 600) {
    time += 1200;
  }

  return time;
};

export const formatHourToString = (hour: number): string =>
  hours.find((_hour) => formatHourToInt(_hour) === hour)!;

export const formatDaysToDayArray = (days: string): Day[] => {
  const splitDays = days.split(',') as DayShorthand[];

  return splitDays.map((day) => {
    switch (day) {
      case 'M':
        return 'Monday';
      case 'T':
        return 'Tuesday';
      case 'W':
        return 'Wednesday';
      case 'Th':
        return 'Thursday';
      case 'F':
        return 'Friday';
    }
  });
};
