import type { Day, DayShorthand } from 'custom-types';
import { hours, days } from '@src/objects';

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

export const formatDayToShorthand = (day: Day): DayShorthand => {
  switch (day) {
    case 'Monday':
      return 'M';
    case 'Tuesday':
      return 'T';
    case 'Wednesday':
      return 'W';
    case 'Thursday':
      return 'Th';
    case 'Friday':
      return 'F';
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

export const formatDayToDay = (day: number): Day =>
  days.find((_day) => formatDayToInt(_day) === day)!;

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
