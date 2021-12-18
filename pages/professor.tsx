const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/**
 * {@link Professor} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Professor: React.FC = () => (
  <div className="bg-blue-800 flex-center p-4 border-2 border-black rounded-lg">
    <h1 className="text-center text-blue-100"> Course Information Form </h1>

    <div className="bg-blue-900 flex-center p-4 border-2 border-black rounded-lg flex h-screen md:justify-center max-hfit ">
      <form className="bg-blue-800 flex-center p-4 border-2 border-black rounded-lg max-w-sm max-h-96">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-blue-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-course-id"
            >
              Course ID:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-blue-200 appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-blue-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-900"
              id="inline-course-id"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-blue-200  font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-course-name"
            >
              Course Name:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-blue-200 appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-blue-800  leading-tight focus:outline-none focus:bg-white focus:border-blue-900"
              id="inline-course-name"
              type="text"
              placeholder=""
            />
          </div>
        </div>

        <div className="md:flex md:content-center mb-8">
          <div>
            <label
              className="block text-blue-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="select-time"
            >
              Select Start Time:
            </label>
          </div>
          <div className="max-w-sm">
            <select
              className="block appearance-none w-full bg-blue-200 border border-blue-900 focus:bg-white hover:border-blue-500 px-6 py-2 pr-20 rounded shadow leading-tight focus:outline-none focus:shadow-outline "
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
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 flex justify-center items-center">
          <div className="flex space-x-4 justify-between items-start border-2 border-black py-4 px-8">
            {days.map((day) => (
              <div key={day} className="divide-y divide-light-blue-400">
                <h1 className="text-center text-lg block text-blue-200">{day}</h1>
                <label key={`${day}`} className="flex justify-between items-center border-blue-800">
                  <input type="checkbox" name={`${day}`} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="md:flex md:items-center mb-6 flex justify-center items-center">
            <button
              className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
Professor.displayName = 'Professor';

export default Professor;
