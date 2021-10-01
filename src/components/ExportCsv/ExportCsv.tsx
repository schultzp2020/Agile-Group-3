import type { StudentState, SelectedFile } from 'custom-types';
import date from 'date-and-time';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export interface ExportCsvProps {
  studentState: StudentState;
  csvFile: SelectedFile;
}

export const ExportCsv: React.FC<ExportCsvProps> = ({ studentState, csvFile }: ExportCsvProps) => {
  const onClick = (): void => {
    const fileName = removeFileExtension(csvFile.file as File);
    const fileUploadedDate = date.format(csvFile.date, 'YYYY/MM/DD HH:mm:ss');

    const csv = Papa.unparse(studentState.inactiveStudents.concat(studentState.activeStudents));
    const blob = new Blob([csv]);
    saveAs(blob, `${fileName} ${fileUploadedDate}.dat`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        type="button"
        className="m-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        End Session
      </button>
    </div>
  );
};
ExportCsv.displayName = 'ExportCsv';

const removeFileExtension = (file: File): string => {
  // Splits the string into an string array by "."
  const splitFileName = file.name.split('.');

  // Removes the extension
  splitFileName.pop();

  // merges the string array into a string
  const fileName = splitFileName.join();

  return fileName;
};
