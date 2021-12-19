import type { SI, ClassTime } from 'custom-types';
import { fetchSIs, updateSI } from '@src/functions';
import { days, hours } from '@src/objects';
import { useState, useEffect } from 'react';

const _hours = hours.map((hour) => ({ hour, active: false }));
const _classTimes: ClassTime[] = days.map((day) => ({ day, hours: _hours }));

/**
 * {@link SI} implements the main viewer for the webpage root
 * @returns React function component
 */
export const SIPage: React.FC = () => {
  const [availableSIs, setAvailableSIs] = useState<SI[]>([]);
  const [si, setSI] = useState<SI | null>(null);
  const [classTimes, setClassTimes] = useState<ClassTime[]>(_classTimes);

  useEffect(() => {
    fetchSIs().then((sis) => {
      setAvailableSIs(() => sis);
      setSI(() => sis[0]);
      const newClassTimes = findClassTimes(classTimes, sis[0]);
      setClassTimes(() => newClassTimes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSIChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const studentId = parseInt((e.target as HTMLSelectElement).value);

    const newSI = availableSIs.find((availableSI) => availableSI.studentId === studentId)!;

    const newClassTimes = findClassTimes(classTimes, newSI);
    setClassTimes(() => newClassTimes);

    setSI(() => newSI);
  };

  const onHourChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = (e.target as HTMLInputElement).name;
    const active = (e.target as HTMLInputElement).checked;

    // Match everything before "-"
    const day = name.match(/[^-]*/)![0];

    // Match everything after "-"
    const hour = name.match(/-([\s\S]*)$/)![0].substring(1);

    const newClassTimes = classTimes.map((classTime) => {
      if (classTime.day === day) {
        const newHours = classTime.hours.map((o) => {
          if (o.hour === hour) {
            return { hour, active };
          }

          return o;
        });

        return { day, hours: newHours };
      }

      return classTime;
    });

    setClassTimes(() => newClassTimes);

    if (si?.studentId) {
      updateSI(newClassTimes, si.studentId).then();
    }
  };

  return (
    <div className="bg-blue-800 p-4 h-screen">
      <div className="flex">
        <h1 className="text-lg text-blue-200 pr-2">Select SI: </h1>
        <select
          className="bg-blue-200 border-2 border-blue-500 text-black mb-6"
          value={si?.studentId}
          onChange={onSIChange}
        >
          {si ? (
            availableSIs.map((availableSI) => (
              <option key={availableSI.studentId} value={availableSI.studentId}>
                {availableSI.name}
              </option>
            ))
          ) : (
            <option value="blank"></option>
          )}
        </select>
      </div>

      <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
        SI - Weekly Schedule
      </h1>

      <p className="text-lg text-blue-200 text-center m-2">
        Select class hours that have a conflict.
      </p>

      <form className="bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200 accent-gray-800">
        <div className="flex space-x-4 justify-between items-start py-4 px-8">
          {classTimes.map(({ day, hours }) => (
            <div
              key={day}
              className="divide-y divide-black bg-blue-800 flex-center border-2 border-black rounded-lg"
            >
              <h1 className="text-center text-lg">{day}</h1>
              {hours.map(({ hour, active }) => (
                <div
                  key={`${day}-${hour}`}
                  className="p-2 flex justify-between items-center bg-blue-800 flex-center"
                >
                  <span className="pr-2">{hour}</span>
                  <input
                    type="checkbox"
                    checked={active}
                    name={`${day}-${hour}`}
                    onChange={onHourChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
SIPage.displayName = 'SIPage';

const findClassTimes = (classTimes: ClassTime[], si: SI): ClassTime[] =>
  classTimes.map((classTime) => ({
    day: classTime.day,
    hours: classTime.hours.map((o) => ({
      hour: o.hour,
      active: si.conflicts.some(
        (conflict) => conflict.day === classTime.day && conflict.time === o.hour
      )
    }))
  }));

export default SIPage;
