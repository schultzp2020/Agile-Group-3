declare module 'custom-types' {
  export interface SI {
    studentId: number;
    name: string;
  }

  export interface SIWithConflicts extends SI {
    time: 0 | 800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535;
    day: 0 | 1 | 2 | 3 | 4;
  }

  export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

  export interface ClassTime {
    day: Day;
    hours: {
      hour: string;
      active: boolean;
    }[];
  }
}
