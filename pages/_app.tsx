import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { usePreserveScroll } from './hooks/usePreserveScroll';

function MyApp({ Component, pageProps }: AppProps) {
  usePreserveScroll();
  return <Component {...pageProps} />;
}

export default MyApp;
