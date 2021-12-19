import type { Course, FetchedCourse } from 'custom-types';
import { useState, useEffect } from 'react';
import { formatHourToString, formatDaysToDayArray, days, hours } from '@src/functions';

const textInputs = ['Course Name:'];

/**
 * {@link ProfessorPage} implements the main viewer for the webpage root
 * @returns React function component
 */
export const ProfessorPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses().then((fetchedCourses) => {
      setCourses(() => fetchedCourses);
    });
  }, []);

  return (
    <div className="bg-blue-800 p-4 h-screen">
      <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
        Professor - Course Creation
      </h1>

      <p className="text-lg text-blue-200 text-center m-2">Course Information Form</p>

      <div className="bg-blue-900 flex p-4 border-2 border-black rounded-lg justify-center">
        <form className="bg-blue-800 p-4 border-2 border-black rounded-lg w-auto accent-gray-800">
          {textInputs.map((textInput) => (
            <div key={textInput} className="mb-6 flex justify-between items-center">
              <label className="text-blue-200 font-bold mb-1">{textInput}</label>
              <input
                className="bg-blue-200 border-2 border-blue-900 rounded w-full py-2 px-4 text-blue-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-900"
                type="text"
                placeholder=""
                required
              />
            </div>
          ))}

          <div className="mb-6 flex justify-between items-center">
            <label className="text-blue-200 font-bold mb-1" htmlFor="select-time">
              Select Start Time:
            </label>
            <select
              className="bg-blue-200 border border-blue-900 focus:bg-white hover:border-blue-500 px-40 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              {hours.map((hour) => (
                <option key={hour}>{hour}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center border-2 border-black py-4 px-8 divide-x divide-black">
            {days.map((day) => (
              <div key={day} className="px-2 flex justify-evenly items-center w-full">
                <h1 className="text-center text-lg block text-blue-200 pr-2">{day}</h1>
                <input type="checkbox" name={day} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="divide-y divide-black h-96 overflow-auto my-4">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="flex justify-center items-center divide-x divide-black p-4 m-2"
          >
            <p className="text-lg text-blue-200 p-2">{course.name}</p>
            <div className="p-2">
              {course.days.map((day) => (
                <p key={`${course.courseId}-${day}`} className="text-lg text-blue-200">
                  {day}
                </p>
              ))}
            </div>
            <p className="text-lg text-blue-200 p-2">{course.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
ProfessorPage.displayName = 'ProfessorPage';

const fetchCourses = async (): Promise<Course[]> => {
  const res = await fetch('/api/view-courses.php');
  const fetchedCourses = (await res.json()) as FetchedCourse[];

  const courses = fetchedCourses.map((course) => ({
    ...course,
    time: formatHourToString(course.time),
    days: formatDaysToDayArray(course.days)
  }));

  return courses;
};

export default ProfessorPage;
