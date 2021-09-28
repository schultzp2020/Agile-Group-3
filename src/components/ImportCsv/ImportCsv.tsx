import type { Student } from 'custom-types';
import React, { useState } from 'react';
import Papa from 'papaparse';

export interface ImportCsvProps {
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const ImportCsv: React.FC<ImportCsvProps> = ({ setStudents }: ImportCsvProps) => {
  const [csvFile, setCsvFile] = useState<File | string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setCsvFile(file);
  };

  const importCsv = (): void => {
    Papa.parse(csvFile, { complete: updateData });
  };

  const updateData = (results: Papa.ParseResult<string[]>): void => {
    checkForStudents(results.data);

    const unparsedStudents = correctForEOLInFile(results.data);

    checkForStudentDuplicates(unparsedStudents);
    checkForStudentErrors(unparsedStudents);

    setStudents(parseStudents(unparsedStudents));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <h2>Import Roster CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          name="file"
          placeholder="CSV File"
          onChange={handleChange}
        />
        <p />
        <button onClick={importCsv}>Upload now!</button>
      </div>
    </div>
  );
};
ImportCsv.displayName = 'ImportCsv';

const findDuplicateStudents = (arr: string[][]): string[][] =>
  arr.filter(([curFirstName, curLastName], index) =>
    arr.slice(0, index).some(([prevFirstName, prevLastName]) => {
      if (curFirstName === prevFirstName && curLastName === prevLastName) {
        return true;
      }
    })
  );

const findStudentErrors = (arr: string[][]): string[][] =>
  arr.filter(([firstName, lastName]) => !firstName || !lastName);

const correctForEOLInFile = (arr: string[][]): string[][] => {
  const [lastStudentFirstName, lastStudentLastName] = arr[arr.length - 1];

  if (!lastStudentFirstName || lastStudentLastName) {
    return arr.slice(0, arr.length - 2);
  } else {
    return arr;
  }
};

const checkForStudents = (arr: string[][]): void => {
  if (!arr.length) {
    window.alert('No student data provided!');
    return;
  }
};

const checkForStudentDuplicates = (arr: string[][]): void => {
  const studentDuplicates = findDuplicateStudents(arr);

  if (studentDuplicates.length) {
    window.alert('Duplicate students!');
    return;
  }
};

const checkForStudentErrors = (arr: string[][]): void => {
  const studentErrors = findStudentErrors(arr);

  if (studentErrors.length) {
    window.alert('Error students!');
    return;
  }
};

const parseStudents = (arr: string[][]): Student[] =>
  arr.map(([firstName, lastName]) => ({
    firstName,
    lastName,
    numOfSkips: 0,
    numOfSatisfactions: 0,
    numOfDissatisfactions: 0
  }));
