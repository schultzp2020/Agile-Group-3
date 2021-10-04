import type { Student, StudentAction, SelectedFile } from 'custom-types';
import { StudentActionKind } from '@src/enums';
import Papa from 'papaparse';

/**
 * The ImportCsv prop interface
 * @param studentDispatch - The student reducer function to change the student state
 * @param csvFile - The csv file containing the name and date of the roster
 * @param setCsvFile - The {@link csvFile} state setter function
 */
export interface ImportCsvProps {
  studentDispatch: React.Dispatch<StudentAction>;
  csvFile: SelectedFile;
  setCsvFile: React.Dispatch<React.SetStateAction<SelectedFile>>;
}

/**
 * The unparsed student type
 */
export type UnparsedStudent = [string, string];

/**
 * {@link ImportCsv} implements a way to import the student roster information
 * @param ImportCsvProps - The required props for ImportCsv
 * @returns React function component
 */
export const ImportCsv: React.FC<ImportCsvProps> = ({
  studentDispatch,
  csvFile,
  setCsvFile
}: ImportCsvProps) => {
  /**
   * Sets the csv file for the student roster
   * @param event - HTML input event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setCsvFile({ file, date: new Date() });
  };

  /**
   * Parses the csv file for the student roster
   */
  const importCsv = (): void => {
    if (typeof csvFile !== 'string') {
      Papa.parse(csvFile.file, { complete: updateData });
    }
  };

  /**
   * Dispatches a {@link StudentActionKind.SET_STUDENTS} request
   * @param results - The unparsed results from the csv
   */
  const updateData = (results: Papa.ParseResult<UnparsedStudent>): void => {
    let err = checkForStudents(results.data);
    if (err) {
      return;
    }

    const unparsedStudents = correctForEOFInFile(results.data);

    err = checkForStudentDuplicates(unparsedStudents);
    if (err) {
      return;
    }

    err = checkForStudentErrors(unparsedStudents);
    if (err) {
      return;
    }

    studentDispatch({
      type: StudentActionKind.SET_STUDENTS,
      payload: mapStudents(unparsedStudents)
    });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <p className="text-lg font-medium text-gray-900 m-2">Import Roster CSV File!</p>
        <input
          className="cursor-pointer m-2"
          type="file"
          name="file"
          placeholder="CSV File"
          onChange={handleChange}
        />
        <p />
        <button
          className="m-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={importCsv}
        >
          Upload now!
        </button>
      </div>
    </div>
  );
};
ImportCsv.displayName = 'ImportCsv';

/**
 * Finds duplicate students
 * @param arr - The unparsed students array
 * @returns an array of duplicate students
 */
const findDuplicateStudents = (arr: UnparsedStudent[]): UnparsedStudent[] =>
  arr.filter(([curFirstName, curLastName], index) =>
    arr.slice(0, index).some(([prevFirstName, prevLastName]) => {
      if (curFirstName === prevFirstName && curLastName === prevLastName) {
        return true;
      }
    })
  );

/**
 * Finds students that have errors attached to them i.e., no first or last name
 * @param arr - The unparsed students array
 * @returns an array of error students
 */
const findStudentErrors = (arr: UnparsedStudent[]): UnparsedStudent[] =>
  arr.filter(([firstName, lastName]) => !firstName || !lastName);

/**
 * Removes the end of file extra line
 * @param arr - The unparsed students array
 * @returns an array of students
 */
const correctForEOFInFile = (arr: UnparsedStudent[]): UnparsedStudent[] => {
  const [lastStudentFirstName, lastStudentLastName] = arr[arr.length - 1];

  if (!lastStudentFirstName || lastStudentLastName) {
    return arr.slice(0, arr.length - 2);
  } else {
    return arr;
  }
};

/**
 * Checks to see if the csv file has information
 * @param arr - The unparsed students array
 */
const checkForStudents = (arr: UnparsedStudent[]): null | Error => {
  if (!arr.length) {
    window.alert('No student data provided!');
    return Error('No students provided!');
  }

  return null;
};

/**
 * Checks to see if the csv file has duplicate students
 * @param arr - The unparsed students array
 */
const checkForStudentDuplicates = (arr: UnparsedStudent[]): null | Error => {
  const studentDuplicates = findDuplicateStudents(arr);

  if (studentDuplicates.length) {
    window.alert('Duplicate students!');
    return Error('Duplicate students!');
  }

  return null;
};

/**
 * Checks to see if the csv file has error students
 * @param arr - The unparsed students array
 */
const checkForStudentErrors = (arr: UnparsedStudent[]): null | Error => {
  const studentErrors = findStudentErrors(arr);

  if (studentErrors.length) {
    window.alert('Error students!');
    return Error('Error students!');
  }

  return null;
};

/**
 * Maps the unparsed students to {@link Student} array
 * @param arr - The mapped students array
 */
const mapStudents = (arr: UnparsedStudent[]): Student[] =>
  arr.map(([firstName, lastName]) => ({
    firstName,
    lastName,
    numOfSkips: 0,
    numOfSatisfactions: 0,
    numOfDissatisfactions: 0
  }));
