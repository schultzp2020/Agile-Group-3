import 'tailwindcss/tailwind.css';
import { Layout } from '@src/components';
import type { AppProps } from 'next/app';

/**
 * Wrapper to apply the layout around all sub pages
 * @param AppProps - The required properties for App
 * @returns React function component
 */
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
