import type { Course, SI } from 'custom-types';
import { fetchCourses, fetchSIs, attachSI, detachSI } from '@src/functions';
import { useState, useEffect } from 'react';

/**
 * {@link SchedulerPage} implements the main viewer for the webpage root
 * @returns React function component
 */
export const SchedulerPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sis, setSIs] = useState<SI[]>([]);
  const [availableSIs, setAvailableSIs] = useState<SI[]>([]);

  useEffect(() => {
    fetchCourses().then((fetchedCourses) => {
      setCourses(() => fetchedCourses);

      fetchSIs().then((fetchedSIs) => {
        setSIs(() => fetchedSIs);

        const sisNotAssigned = getSIsNotAssigned(fetchedSIs, fetchedCourses);

        setAvailableSIs(() => sisNotAssigned);
      });
    });
  }, []);

  const onSIChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const value = (e.target as HTMLSelectElement).value;
    const [courseId, studentId] = value.split('-').map((v) => parseInt(v));

    if (studentId === -1) {
      detachSI(courseId).then();
    } else {
      attachSI(courseId, studentId).then();
    }

    const newCourses = courses.map((course) => {
      if (course.courseId === courseId) {
        return { ...course, si: studentId };
      }

      return course;
    });

    setCourses(() => newCourses);

    const sisNotAssigned = getSIsNotAssigned(sis, newCourses);

    setAvailableSIs(() => sisNotAssigned);
  };

  return (
    <div className="bg-blue-800 p-4 h-screen">
      <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
        Scheduler - Weekly Schedule
      </h1>

      <p className="text-lg text-blue-200 text-center m-2">Select SI's for class hours.</p>

      <div className="overflow-auto my-4 flex">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="border-2 border-black rounded p-4 m-2 bg-blue-900 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between w-60">
                <p className="text-lg text-blue-200 p-2">{course.name}</p>
                <p className="text-lg text-blue-200 p-2">{course.time}</p>
              </div>
              <div className="p-2 my-2 border-2 border-black rounded bg-blue-800 divide-y divide-black">
                {course.days.map((day) => (
                  <p
                    key={`${course.courseId}-${day}`}
                    className="text-lg text-blue-200 text-center"
                  >
                    {day}
                  </p>
                ))}
              </div>
            </div>
            <div className="mb-6 flex flex-col items-center">
              <label className="text-blue-200 font-bold mb-1">Select SI:</label>
              <select
                className="bg-blue-200 border border-blue-900 focus:bg-white hover:border-blue-500 px-20 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={`${course.courseId}-${
                  sis.find(({ studentId }) => studentId === course.si)?.studentId || -1
                }`}
                onChange={onSIChange}
              >
                <option value={`${course.courseId}-${-1}`}></option>
                {getAvailableSIs(availableSIs, course).map((si) => (
                  <option
                    key={`${course.courseId}-${si.studentId}`}
                    value={`${course.courseId}-${si.studentId}`}
                  >
                    {si.name}
                  </option>
                ))}
                <option
                  value={`${course.courseId}-${
                    sis.find(({ studentId }) => studentId === course.si)?.studentId
                  }`}
                >
                  {sis.find(({ studentId }) => studentId === course.si)?.name}
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
SchedulerPage.displayName = 'SchedulerPage';

const getSIsNotAssigned = (sis: SI[], courses: Course[]): SI[] =>
  sis.filter(({ studentId }) => !courses.some(({ si }) => studentId === si));

const getAvailableSIs = (sis: SI[], course: Course): SI[] =>
  sis.filter(
    ({ conflicts }) =>
      !conflicts.some((conflict) =>
        course.days.some((day) => conflict.day === day && conflict.time === course.time)
      )
  );

export default SchedulerPage;
