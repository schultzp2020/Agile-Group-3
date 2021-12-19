import type { Course, FetchedCourse, Day } from 'custom-types';
import { useState, useEffect } from 'react';
import {
  formatHourToString,
  formatDaysToDayArray,
  days,
  hours,
  formatHourToInt,
  formatDayToShorthand
} from '@src/functions';

const textInputs = ['Course Name:'];

const _days: DayWithState[] = days.map((day) => ({ day, active: false }));

export interface DayWithState {
  day: Day;
  active: boolean;
}

/**
 * {@link ProfessorPage} implements the main viewer for the webpage root
 * @returns React function component
 */
export const ProfessorPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [courseTime, setCourseTime] = useState<string>(hours[0]);
  const [courseDays, setCourseDays] = useState<DayWithState[]>(_days);

  useEffect(() => {
    fetchCourses().then((fetchedCourses) => {
      setCourses(() => fetchedCourses);
    });
  }, []);

  const onSubmit = (): void => {
    const time = formatHourToInt(courseTime);
    const activeDays = courseDays.filter(({ active }) => active);
    const days = activeDays.map(({ day }) => formatDayToShorthand(day)).join(',');

    if (activeDays.length) {
      addCourse(time, days, courseName).then(() => {
        fetchCourses().then((fetchedCourses) => {
          setCourses(() => fetchedCourses);
        });
      });
    }
  };

  const onDelete = (courseId: number): void => {
    deleteCourse(courseId).then(() => {
      fetchCourses().then((fetchedCourses) => {
        setCourses(() => fetchedCourses);
      });
    });
  };

  const onCourseNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    setCourseName(() => value);
  };

  const onCourseTimeChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const value = (e.target as HTMLSelectElement).value;
    setCourseTime(() => value);
  };

  const onCourseDayChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = (e.target as HTMLInputElement).name;
    const active = (e.target as HTMLInputElement).checked;

    const newCourseDays = courseDays.map((o) => {
      if (o.day === name) {
        return { day: name, active };
      }

      return o;
    });

    setCourseDays(() => newCourseDays);
  };

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
                value={courseName}
                onChange={onCourseNameChange}
                required
              />
            </div>
          ))}

          <div className="mb-6 flex justify-between items-center">
            <label className="text-blue-200 font-bold mb-1" htmlFor="select-time">
              Select Course Time:
            </label>
            <select
              className="bg-blue-200 border border-blue-900 focus:bg-white hover:border-blue-500 px-40 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={courseTime}
              onChange={onCourseTimeChange}
              required
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center border-2 border-black py-4 px-8 divide-x divide-black">
            {courseDays.map(({ day, active }) => (
              <div key={day} className="px-2 flex justify-evenly items-center w-full">
                <h1 className="text-center text-lg block text-blue-200 pr-2">{day}</h1>
                <input type="checkbox" name={day} checked={active} onChange={onCourseDayChange} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
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
            <div className="flex items-center justify-center">
              <button
                className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={(): void => onDelete(course.courseId)}
              >
                Delete
              </button>
            </div>
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

  let courses = fetchedCourses.map((course) => ({
    ...course,
    time: formatHourToString(course.time),
    days: formatDaysToDayArray(course.days)
  }));

  courses = courses.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'accent' }));

  return courses;
};

const deleteCourse = async (courseId: number): Promise<void> => {
  await fetch('/api/delete-course.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  });
};

const addCourse = async (time: number, days: string, name: string): Promise<void> => {
  await fetch('/api/add-course.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ time, days, name })
  });
};

export default ProfessorPage;
