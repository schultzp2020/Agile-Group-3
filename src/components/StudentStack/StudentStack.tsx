import type { Student } from 'custom-types';
import Image from 'next/image';

/**
 * The StudentStack prop interface
 * @param students - The active students list
 */
export interface StudentStackProps {
  students: Student[];
}

/**
 * {@link StudentStack} implements a way to view the active students list
 * @param StudentStackProps - The required props for StudentStack
 * @returns React function component
 */
export const StudentStack: React.FC<StudentStackProps> = ({ students }: StudentStackProps) => (
  <div className="flex items-center justify-center h-full w-full">
    <ul
      role="list"
      className="divide-y divide-gray-200 p-4 m-4 border-2 border-blue-500 border-opacity-75 rounded-md w-3/4"
    >
      {students.length > 1 ? (
        <p className="text-md font-medium text-gray-900">Next up...</p>
      ) : (
        <p className="text-md font-medium text-gray-900">No more remaining students!</p>
      )}
      {students.map((student) => (
        <li key={`${student.firstName}-${student.lastName}`} className="py-4 flex">
          <Image
            className="h-10 w-10 rounded-full"
            src={`https://avatars.dicebear.com/api/human/${student.firstName}-${student.lastName}.svg`}
            alt={`${student.firstName} ${student.lastName} profile picture`}
            width={50}
            height={50}
          />
          <div className="ml-3 flex items-center">
            <p className="text-sm font-medium text-gray-900">
              {student.firstName} {student.lastName}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
StudentStack.displayName = 'StudentStack';
