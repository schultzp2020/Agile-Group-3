declare module 'custom-types' {
  // Main interface for student
  export interface Student {
    firstName: string;
    lastName: string;
    numOfSkips: number;
    numOfSatisfactions: number;
    numOfDissatisfactions: number;
  }

  // Student function interface for reducer function
  interface StudentAction {
    type: StudentActionKind;
    payload?: Student[];
  }

  // Student state interface for reducer function
  interface StudentState {
    activeStudents: Student[];
    inactiveStudents: Student[];
  }

  // File state interface
  interface SelectedFile {
    file: File | string;
    date: Date;
  }
}
