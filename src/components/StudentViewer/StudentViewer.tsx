import type { Student, StudentAction } from 'custom-types';
import { StudentActionKind } from '@src/enums';
import Image from 'next/image';

/**
 * The StudentViewer prop interface
 * @param student - The current active student
 * @param studentDispatch - The student reducer function to change the student state
 */
export interface StudentViewerProps {
  student: Student;
  studentDispatch: React.Dispatch<StudentAction>;
}

/**
 * {@link StudentViewer} implements a way to view the current active student
 * @param StudentStackProps - The required props for StudentViewer
 * @returns React function component
 */
export const StudentViewer: React.FC<StudentViewerProps> = ({
  student,
  studentDispatch
}: StudentViewerProps) => (
  <div className="flex items-center justify-center h-full w-full">
    <div>
      <div className="flex p-4 m-4 border-2 border-blue-500 border-opacity-75 rounded-md">
        <Image
          className="h-10 w-10 rounded-full"
          src={`https://avatars.dicebear.com/api/human/${student.firstName}-${student.lastName}.svg`}
          alt={`${student.firstName} ${student.lastName} profile picture`}
          width={200}
          height={200}
        />
        <div className="ml-3 flex items-center">
          <div>
            <p className="text-lg font-medium text-gray-900">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-lg text-gray-500">{`Number of skips: ${student.numOfSkips}`}</p>
            <p className="text-lg text-gray-500">{`Number of satisfactions: ${student.numOfSatisfactions}`}</p>
            <p className="text-lg text-gray-500">{`Number of dissatisfactions: ${student.numOfDissatisfactions}`}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <button
          onClick={(): void => studentDispatch({ type: StudentActionKind.SATISFIED })}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>
        <button
          onClick={(): void => studentDispatch({ type: StudentActionKind.DISSATISFIED })}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
        </button>
        <button
          onClick={(): void => studentDispatch({ type: StudentActionKind.SKIP })}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Skip
        </button>
      </div>
    </div>
  </div>
);
StudentViewer.displayName = 'StudentViewer';
