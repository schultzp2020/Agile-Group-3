const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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

const textInputs = ['Course ID:', 'Course Name:'];

/**
 * {@link Professor} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Professor: React.FC = () => (
  <div className="bg-blue-800 p-4 h-screen">
    <h1 className="text-center p-2 text-2xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200">
      Professor - Course Creation
    </h1>

    <p className="text-lg text-blue-200 text-center m-2">Course Information Form</p>

    <div className="bg-blue-900 flex-center p-4 border-2 border-black rounded-lg flex md:justify-center">
      <form className="bg-blue-800 flex-center p-4 border-2 border-black rounded-lg max-w-sm accent-gray-800">
        {textInputs.map((textInput) => (
          <div key={textInput} className="mb-6 flex justify-between w-full">
            <label className="block text-blue-200 font-bold md:text-left mb-1">{textInput}</label>
            <input
              className="bg-blue-200 appearance-none border-2 border-blue-900 rounded w-full py-2 px-4 text-blue-800  leading-tight focus:outline-none focus:bg-white focus:border-blue-900"
              type="text"
              placeholder=""
            />
          </div>
        ))}

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
              {hours.map((hour) => (
                <option key={hour}>{hour}</option>
              ))}
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

        <div className="md:flex md:items-center flex justify-center items-center">
          <button
            className="shadow bg-blue-600 border-2 border-black hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);
Professor.displayName = 'Professor';

export default Professor;
