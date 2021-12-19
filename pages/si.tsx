import { useState, useEffect } from 'react';

export interface SI {
  studentId: number;
  name: string;
}

export interface SIWithConflicts extends SI {
  time: 0 | 800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535;
  day: 0 | 1 | 2 | 3 | 4;
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface ClassTime {
  day: Day;
  hours: {
    hour: string;
    active: boolean;
  }[];
}

const hours = [
  { hour: '8:00-8:55', active: false },
  { hour: '9:05-10:00', active: false },
  { hour: '10:10-11:05', active: false },
  { hour: '11:15-12:10', active: false },
  { hour: '12:20-1:15', active: false },
  { hour: '1:25-2:20', active: false },
  { hour: '2:30-3:25', active: false },
  { hour: '3:35-4:30', active: false }
];

/**
 * {@link SI} implements the main viewer for the webpage root
 * @returns React function component
 */
export const SI: React.FC = () => {
  const [availableSIs, setAvailableSIs] = useState<SI[]>([]);
  const [si, setSI] = useState<SI | null>(null);
  const [classTimes, setClassTimes] = useState<ClassTime[]>([
    { day: 'Monday', hours },
    { day: 'Tuesday', hours },
    { day: 'Wednesday', hours },
    { day: 'Thursday', hours },
    { day: 'Friday', hours }
  ]);

  useEffect(() => {
    fetch('/api/view-sis-with-conflicts.php').then((res) =>
      res.json().then((sisWithConflicts: SIWithConflicts[]) => {
        // Remove extra member variables
        const sis = sisWithConflicts.map(({ studentId, name }) => ({ studentId, name }));

        // Sort the SIs based on studentId
        const sortedSIs = sis.sort((a, b) => a.studentId - b.studentId);

        // Remove duplicate SIs
        const filteredSIs = sortedSIs.filter(
          (sortedSI, index) => !index || sortedSI.studentId !== sortedSIs[index - 1].studentId
        );

        setAvailableSIs(() => filteredSIs);
        setSI(() => filteredSIs[0]);
      })
    );
  }, []);

  const onSIChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const studentId = parseInt((e.target as HTMLSelectElement).value);

    const newSI = availableSIs.find((availableSI) => availableSI.studentId === studentId)!;

    setSI(() => newSI);
  };

  const onHourChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = (e.target as HTMLInputElement).name;
    const active = (e.target as HTMLInputElement).checked;

    // Match everything before "-"
    const day = name.match(/[^-]*/)![0];

    // Match everything after "-"
    const hour = name.match(/-([\s\S]*)$/)![0].substring(1);

    const newClassHours = classTimes.map((classTime) => {
      if (classTime.day === day) {
        const newHours = classTime.hours.map((object) => {
          if (object.hour === hour) {
            return { hour, active };
          }

          return object;
        });

        return { day, hours: newHours };
      }

      return classTime;
    });

    setClassTimes(() => newClassHours);
  };

  const onSubmit = (): void => {
    if (si?.studentId) {
      updateSI(classTimes, si.studentId).then();
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
        <div className="m-4 md:flex md:items-center flex justify-center items-center">
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
  );
};
SI.displayName = 'SI';

const changeDay = (day: Day): number => {
  switch (day) {
    case 'Monday':
      return 0;
    case 'Tuesday':
      return 1;
    case 'Wednesday':
      return 2;
    case 'Thursday':
      return 3;
    case 'Friday':
      return 4;
  }
};

const updateSI = async (classTimes: ClassTime[], student: number): Promise<void> => {
  await deleteConflicts(student);

  await addConflicts(classTimes, student);
};

const deleteConflicts = async (student: number): Promise<void> => {
  const res = await fetch('/api/delete-conflicts.php', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student })
  });

  if (res.status !== 200) {
    const e = await res.json();

    // eslint-disable-next-line no-console
    console.log(e);
  }
};

const addConflicts = async (classTimes: ClassTime[], student: number): Promise<void> => {
  for (const { day, hours } of classTimes) {
    for (const { hour, active } of hours) {
      if (active) {
        const res = await fetch('/api/add-conflict.php', {
          method: 'Post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student, time: hour, day: changeDay(day) })
        });

        if (res.status !== 200) {
          const e = await res.json();

          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  }
};

export default SI;
