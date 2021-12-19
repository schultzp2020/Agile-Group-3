declare module 'custom-types' {
  export interface SI {
    studentId: number;
    name: string;
    conflicts: {
      time: string;
      day: Day;
    }[];
  }

  export interface FetchedSI extends SI {
    conflicts: {
      time: 800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535;
      day: 0 | 1 | 2 | 3 | 4;
    }[];
  }

  export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

  export type DayShorthand = 'M' | 'T' | 'W' | 'Th' | 'F';

  export interface ClassTime {
    day: Day;
    hours: Hour[];
  }

  export interface Hour {
    hour: string;
    active: boolean;
  }

  export interface Course {
    courseId: number;
    name: string;
    time: string;
    days: Day[];
    si: number;
  }

  export interface FetchedCourse extends Course {
    time: number;
    days: string;
  }
}
