import StoutCampus from '@public/images/StoutCampus.png';

/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */

export const Home: React.FC = () => (
  <div className="bg-blue-800 p-4 h-screen">
    <div className="text-center p-4 text-6xl border-b-2 bg-blue-900 flex-center border-2 border-black rounded-lg text-blue-200 divide-y divide-black">
      <h1 className="mb-4">Agile Group 3</h1>
      <h1>SI Scheduler Tool</h1>
    </div>
    <div>
      <div className="bg-blue-900 p-4 my-4 flex justify-evenly border-2 border-black rounded-lg">
        <img src={StoutCampus.src} alt="A Scenic View" width="75%"></img>
      </div>
    </div>
  </div>
);
Home.displayName = 'Home';

export default Home;
