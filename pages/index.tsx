import type { Student } from 'custom-types';
import { ImportCsv } from '@src/components';
import { useState } from 'react';

export const Home: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <div className="w-screen h-screen">
      {!students.length ? (
        <ImportCsv setStudents={setStudents} />
      ) : (
        <div>
          {students.map((student) => (
            <ul key={`${student.firstName}-${student.lastName}`}>
              <li>{student.firstName}</li>
              <li>{student.lastName}</li>
              <li>{student.numOfSkips}</li>
              <li>{student.numOfSatisfactions}</li>
              <li>{student.numOfDissatisfactions}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};
Home.displayName = 'Home';

export default Home;
