declare module 'custom-types' {
  export interface Student {
    firstName: string;
    lastName: string;
    numOfSkips: number;
    numOfSatisfactions: number;
    numOfDissatisfactions: number;
  }

  interface StudentAction {
    type: StudentActionKind;
    payload?: Student[];
  }

  interface StudentState {
    activeStudents: Student[];
    inactiveStudents: Student[];
  }

  interface SelectedFile {
    file: File | string;
    date: Date;
  }
}
