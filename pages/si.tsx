import { useState, useEffect } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = [
  '8:00-8:55',
  '9:05-10:00',
  '10:10-11:05',
  '11:15-12:10',
  '12:20-1:15',
  '1:25-2:20',
  '2:30-3:25',
  '3:35-4:30'
];

export interface SI {
  studentId: number;
  name: string;
  time: 800 | 905 | 1010 | 1115 | 1220 | 1325 | 1430 | 1535;
  day: 0 | 1 | 2 | 3 | 4;
}

/**
 * {@link SI} implements the main viewer for the webpage root
 * @returns React function component
 */
export const SI: React.FC = () => {
  const [availableSIs, setAvailableSIs] = useState<SI[]>([]);
  const [si, setSI] = useState<SI | null>(null);

  useEffect(() => {
    fetch('http://143.198.123.91:883/api/view-sis-with-conflicts.php').then((res) =>
      res.json().then((data: SI[]) => setAvailableSIs(() => data))
    );

    setSI(() => availableSIs[0]);
  }, []);

  return (
    <div className="bg-blue-800 p-4 h-screen">
      <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
        SI - Weekly Schedule
      </h1>

      <p className="text-lg text-blue-200 text-center m-2">
        Select class hours that have a conflict.
      </p>

      <form className="bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200 accent-gray-800">
        <div className="flex space-x-4 justify-between items-start py-4 px-8">
          {days.map((day) => (
            <div
              key={day}
              className="divide-y divide-black bg-blue-800 flex-center border-2 border-black rounded-lg"
            >
              <h1 className="text-center text-lg">{day}</h1>
              {hours.map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="p-2 flex justify-between items-center bg-blue-800 flex-center"
                >
                  <span className="pr-2">{hour}</span>
                  <input type="checkbox" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="m-4 md:flex md:items-center flex justify-center items-center">
          <button
            className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
SI.displayName = 'SI';

export default SI;
