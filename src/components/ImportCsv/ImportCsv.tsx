import type { Student, StudentAction, SelectedFile } from 'custom-types';
import { StudentActionKind } from '@src/enums';
import Papa from 'papaparse';

export interface ImportCsvProps {
  studentDispatch: React.Dispatch<StudentAction>;
  csvFile: SelectedFile;
  setCsvFile: React.Dispatch<React.SetStateAction<SelectedFile>>;
}

export type UnparsedStudent = [string, string];

export const ImportCsv: React.FC<ImportCsvProps> = ({
  studentDispatch,
  csvFile,
  setCsvFile
}: ImportCsvProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setCsvFile({ file, date: new Date() });
  };

  const importCsv = (): void => {
    if (typeof csvFile !== 'string') {
      Papa.parse(csvFile.file, { complete: updateData });
    }
  };

  const updateData = (results: Papa.ParseResult<UnparsedStudent>): void => {
    checkForStudents(results.data);

    const unparsedStudents = correctForEOLInFile(results.data);

    checkForStudentDuplicates(unparsedStudents);
    checkForStudentErrors(unparsedStudents);

    studentDispatch({
      type: StudentActionKind.SET_STUDENTS,
      payload: parseStudents(unparsedStudents)
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

const findDuplicateStudents = (arr: UnparsedStudent[]): UnparsedStudent[] =>
  arr.filter(([curFirstName, curLastName], index) =>
    arr.slice(0, index).some(([prevFirstName, prevLastName]) => {
      if (curFirstName === prevFirstName && curLastName === prevLastName) {
        return true;
      }
    })
  );

const findStudentErrors = (arr: UnparsedStudent[]): UnparsedStudent[] =>
  arr.filter(([firstName, lastName]) => !firstName || !lastName);

const correctForEOLInFile = (arr: UnparsedStudent[]): UnparsedStudent[] => {
  const [lastStudentFirstName, lastStudentLastName] = arr[arr.length - 1];

  if (!lastStudentFirstName || lastStudentLastName) {
    return arr.slice(0, arr.length - 2);
  } else {
    return arr;
  }
};

const checkForStudents = (arr: UnparsedStudent[]): void => {
  if (!arr.length) {
    window.alert('No student data provided!');
    return;
  }
};

const checkForStudentDuplicates = (arr: UnparsedStudent[]): void => {
  const studentDuplicates = findDuplicateStudents(arr);

  if (studentDuplicates.length) {
    window.alert('Duplicate students!');
    return;
  }
};

const checkForStudentErrors = (arr: UnparsedStudent[]): void => {
  const studentErrors = findStudentErrors(arr);

  if (studentErrors.length) {
    window.alert('Error students!');
    return;
  }
};

const parseStudents = (arr: UnparsedStudent[]): Student[] =>
  arr.map(([firstName, lastName]) => ({
    firstName,
    lastName,
    numOfSkips: 0,
    numOfSatisfactions: 0,
    numOfDissatisfactions: 0
  }));
