import type { StudentState, SelectedFile } from 'custom-types';
import date from 'date-and-time';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

/**
 * The ExportCsv prop interface
 * @param studentState - The active and inactive students from the roster
 * @param csvFile - The csv file containing the name and date of the roster
 */
export interface ExportCsvProps {
  studentState: StudentState;
  csvFile: SelectedFile;
}

/**
 * {@link ExportCsv} implements a way to export the student roster information to a csv
 * @param ExportCsvProps - The required props for ExportCsv
 * @returns React function component
 */
export const ExportCsv: React.FC<ExportCsvProps> = ({ studentState, csvFile }: ExportCsvProps) => {
  /**
   * onClick function to export the student roster information to a csv
   */
  const onClick = (): void => {
    const fileName = removeFileExtension(csvFile.file as File);
    const fileUploadedDate = date.format(csvFile.date, 'YYYY/MM/DD HH:mm:ss');

    // The csv is parsed by the inactive students on top and the active students on the bottom
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

/**
 * Removes the file extension from the file
 * @param file - The file to remove the file extension from
 * @returns The file name without the file extension
 */
const removeFileExtension = (file: File): string => {
  // Splits the string into an string array by "."
  const splitFileName = file.name.split('.');

  // Removes the extension
  splitFileName.pop();

  // merges the string array into a string
  const fileName = splitFileName.join();

  return fileName;
};
