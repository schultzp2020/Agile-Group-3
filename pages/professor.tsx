const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Home: React.FC = () => (
  <div className="h-screen w-screen p-4">
    <h1 className="text-center"> Course Information Form </h1>

    <div className="flex h-screen justify-center items-center">
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-course-id"
            >
              Course ID:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-course-id"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-course-name"
            >
              Course Name:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-course-name"
              type="text"
              placeholder=""
            />
          </div>
        </div>

        <div className="inline-block relative w-64 mb-4">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="select-time"
          >
            Select Start Time:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="select-time"
          >
            <option></option>
            <option>8:00-8:55</option>
            <option>9:05-10:00</option>
            <option>10:10-11:05</option>
            <option>11:15-12:10</option>
            <option>12:20-1:15</option>
            <option>1:25-2:20</option>
            <option>2:30-3:25</option>
            <option>3:35-4:30</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="flex space-x-4 justify-between items-start border-2 border-black py-4 px-8">
            {days.map((day) => (
              <div key={day} className="divide-y divide-light-blue-400">
                <h1 className="text-center text-lg">{day}</h1>
                <label key={`${day}`} className="flex justify-between items-center">
                  <input type="checkbox" name={`${day}`} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
Home.displayName = 'Home';

export default Home;
