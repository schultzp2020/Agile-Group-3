import { days, hours } from '@src/functions';

/**
 * {@link SchedulerPage} implements the main viewer for the webpage root
 * @returns React function component
 */
export const SchedulerPage: React.FC = () => (
  <div className="bg-blue-800 p-4 h-screen">
    <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
      Scheduler - Weekly Schedule
    </h1>

    <p className="text-lg text-blue-200 text-center m-2">
      Select SI's for class hours and lab hours.
    </p>

    <form className="bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
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
                <select className="bg-blue-200 border-2 border-blue-500 text-black">
                  <option value="blank"></option>
                  <option value="Student 1">Student 1</option>
                  <option value="Student 2">Student 2</option>
                  <option value="Student 3">Student 3</option>
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mb-4">
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
SchedulerPage.displayName = 'SchedulerPage';

export default SchedulerPage;
