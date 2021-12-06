/**
 * {@link Home} implements the main viewer for the webpage root
 * @returns React function component
 */
export const Home: React.FC = () => (
  <div className="h-screen w-screen p-4">
    <h1 className="text-center text-3xl">Home Page</h1>
  </div>
);
Home.displayName = 'Home';

export default Home;
