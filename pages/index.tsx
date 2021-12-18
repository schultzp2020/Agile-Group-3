import StoutCampus from '@public/images/placeholder.png';

/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */

export const Home: React.FC = () => (
  <div className="bg-blue-800">
    <div className="bg-blue-900 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-blue-200 text-center text-3xl">Home Page</h1>
      </div>
      <div className="flex items-center">
        <h1 className="font-serif text-blue-200 text-center text-6xl">Si Scheduler Tool</h1>
      </div>
      <div>
        <h2 className="text-blue-200">Agile Group 3</h2>
        <p className="text-blue-200">Welcome to our Agile Group 3 Project.</p>
      </div>
    </div>
    <div>
      <div className="bg-blue-900 m-4 flex justify-evenly">
        <img src={StoutCampus.src} alt="A Scenic View" width="75%"></img>
      </div>
    </div>
  </div>
);
Home.displayName = 'Home';

export default Home;
