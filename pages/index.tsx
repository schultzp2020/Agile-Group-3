import type { Student, StudentAction, StudentState, SelectedFile } from 'custom-types';
import { StudentActionKind } from '@src/enums';
import { ExportCsv, ImportCsv, StudentStack, StudentViewer } from '@src/components';
import { useReducer, useState } from 'react';

/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Home: React.FC = () => {
  const [csvFile, setCsvFile] = useState<SelectedFile>({ file: '', date: new Date() });
  const [studentState, studentDispatch] = useReducer<React.Reducer<StudentState, StudentAction>>(
    studentReducer,
    { activeStudents: [], inactiveStudents: [] }
  );

  return (
    <div className="h-screen w-screen">
      {!studentState.activeStudents.length && !studentState.inactiveStudents.length ? (
        <ImportCsv studentDispatch={studentDispatch} csvFile={csvFile} setCsvFile={setCsvFile} />
      ) : (
        <div className="flex justify-between h-full w-full">
          <div className="grid grid-cols-3 gap-4 h-full w-full">
            <StudentStack students={studentState.activeStudents.slice(1, 6)} />
            <div className="col-span-2">
              <StudentViewer
                student={studentState.activeStudents[0]}
                studentDispatch={studentDispatch}
              />
            </div>
          </div>
          <ExportCsv studentState={studentState} csvFile={csvFile} />
        </div>
      )}
    </div>
  );
};
Home.displayName = 'Home';

/**
 * Reducer function for useReducer hook
 * @param state - The current student state
 * @param action - The action to do on the student state
 * @returns an updated student state
 */
const studentReducer = (state: StudentState, action: StudentAction): StudentState => {
  const { activeStudents, inactiveStudents } = state;
  const { type, payload } = action;

  if (type === StudentActionKind.SET_STUDENTS) {
    // Randomize the payload as active students
    return {
      activeStudents: shuffleArray(payload as Student[]),
      inactiveStudents: []
    };
  }

  // If there are no active students, return the current state
  if (!activeStudents.length) {
    return state;
  }

  // Get the current student and remove it from activeStudents
  const currentStudent = activeStudents[0];
  activeStudents.shift();

  switch (type) {
    case StudentActionKind.SKIP:
      (currentStudent as Student).numOfSkips++;
      break;
    case StudentActionKind.SATISFIED:
      (currentStudent as Student).numOfSatisfactions++;
      break;

    case StudentActionKind.DISSATISFIED:
      (currentStudent as Student).numOfDissatisfactions++;
      break;
  }

  // Add the current student to the end of inactiveStudents
  inactiveStudents.push(currentStudent as Student);

  // If there are no remaining active students, randomize the inactive students and set them as active students
  if (!activeStudents.length) {
    return {
      activeStudents: shuffleArray(inactiveStudents),
      inactiveStudents: []
    };
  }

  // Return the updated student state
  return {
    activeStudents,
    inactiveStudents
  };
};

/**
 * Fisher-Yates (aka Knuth) Shuffle.
 * @param array - The array to randomize
 * @returns a randomized array
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default Home;
