import { AppProps } from 'next/app';

// Components
import Header from '../components/Header';

// Styles
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
