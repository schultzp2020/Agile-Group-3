import type { FetchedCourse, Course, ClassTime, SI, FetchedSI, Day } from 'custom-types';
import {
  formatHourToString,
  formatDaysToDayArray,
  formatDayToInt,
  formatHourToInt,
  formatDayToDay
} from '@src/functions';

export const fetchCourses = async (): Promise<Course[]> => {
  const res = await fetch('/api/view-courses.php');
  const fetchedCourses = (await res.json()) as FetchedCourse[];

  let courses = fetchedCourses.map((course) => ({
    ...course,
    time: formatHourToString(course.time),
    days: formatDaysToDayArray(course.days)
  }));

  // Sort courses based on course name
  courses = courses.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'accent' }));

  return courses;
};

export const deleteCourse = async (courseId: number): Promise<void> => {
  await fetch('/api/delete-course.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  });
};

export const addCourse = async (time: number, days: string, name: string): Promise<void> => {
  await fetch('/api/add-course.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ time, days, name })
  });
};

export const updateSI = async (classTimes: ClassTime[], student: number): Promise<void> => {
  await deleteConflicts(student);

  await addConflicts(classTimes, student);
};

export const fetchSIs = async (): Promise<SI[]> => {
  const res = await fetch('/api/view-sis-with-conflicts.php');
  const fetchedSIs = (await res.json()) as FetchedSI[];

  const sis: SI[] = fetchedSIs.map((si) => {
    const conflicts = si.conflicts.map(({ time, day }) => ({
      time: formatHourToString(time),
      day: formatDayToDay(day)
    }));

    return { ...si, conflicts };
  });

  // Sort the SIs based on studentId
  const sortedSIs = sis.sort((a, b) => a.studentId - b.studentId);

  return sortedSIs;
};

export const deleteConflicts = async (student: number): Promise<void> => {
  await fetch('/api/delete-conflicts.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student })
  });
};

export const addConflicts = async (classTimes: ClassTime[], student: number): Promise<void> => {
  for (const { day, hours } of classTimes) {
    for (const { hour, active } of hours) {
      if (active) {
        await addConflict(student, hour, day);
      }
    }
  }
};

export const addConflict = async (student: number, hour: string, day: Day): Promise<void> => {
  await fetch('/api/add-conflict.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student, time: formatHourToInt(hour), day: formatDayToInt(day) })
  });
};

export const attachSI = async (courseId: number, studentId: number): Promise<void> => {
  await fetch('/api/attach-si.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, studentId })
  });
};

export const detachSI = async (courseId: number): Promise<void> => {
  await fetch('/api/detach-si.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  });
};
