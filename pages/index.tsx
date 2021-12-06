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
  <div className="h-screen w-screen p-4">
    <h1>Scheduler - Weekly Schedule</h1>

    <p>Select SI's for class hours and lab hours.</p>

    <form>
      <div className="flex space-x-4 justify-between items-start border-2 border-black py-4 px-8">
        {days.map((day) => (
          <div key={day} className="divide-y divide-light-blue-400">
            <p>{day}</p>
            {hours.map((hour) => (
              <div key={`${day}-${hour}`} className="flex justify-between">
                <label className="px-2">{hour}</label>
                <select name="SI" id="SI" className="border-2 border-gray">
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
        <input type="submit" value="Submit"></input>
      </div>
    </form>
  </div>
);
Home.displayName = 'Home';

export default Home;
