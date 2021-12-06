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
    <h1 className="text-2xl border-b-2 border-gray">Professor - Weekly Schedule</h1>

    <p className="text-lg">Select class hours that require SIs.</p>

    <form>
      <div className="flex space-x-4 justify-between items-start border-2 border-black py-4 px-8">
        {days.map((day) => (
          <div key={day} className="divide-y divide-light-blue-400">
            <h1 className="text-center text-lg">{day}</h1>
            {hours.map((hour) => (
              <label key={`${day}-${hour}`} className="flex justify-between items-center">
                <span className="pr-2">{hour}</span>
                <input type="checkbox" name={`${day}-${hour}`} />
              </label>
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
