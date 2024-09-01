import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Define the MyApp component with the AppProps type
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
