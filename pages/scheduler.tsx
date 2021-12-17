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

/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Home: React.FC = () => (
  <div className="bg-blue-800 flex-center p-4 border-2 border-black rounded-lg">
    <h1 className="text-2xl border-b-2 bg-blue-900 flex-center border-2 border-blue-900 text-blue-200">
      Scheduler - Weekly Schedule
    </h1>

    <p className="text-lg text-blue-200">Select SI's for class hours and lab hours.</p>

    <form className="bg-blue-900 flex-center border-2 border-blue-900 text-blue-200">
      <div className="flex space-x-4 justify-between items-start border-2 border-black py-4 px-8">
        {days.map((day) => (
          <div
            key={day}
            className="divide-y divide-light-blue-400 bg-blue-800 flex-center border-2 border-black rounded-lg"
          >
            <h1 className="text-center text-lg">{day}</h1>
            {hours.map((hour) => (
              <div
                key={`${day}-${hour}`}
                className="flex justify-between items-center bg-blue-800 flex-center border-2 border-black"
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
      <div>
        <p>Click "Submit" button to confirm.</p>
        <a className="bg-blue-700 hover:bg-blue-300 flex items-center text-white p-1 border-2 border-black rounded-lg w-16 h-6">
          <input type="submit" value="Submit"></input>
        </a>
      </div>
    </form>
  </div>
);
Home.displayName = 'Home';

export default Home;
