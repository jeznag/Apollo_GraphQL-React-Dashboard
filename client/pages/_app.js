import 'semantic-ui-css/semantic.min.css';
import '../src/styles/App.css';
import '../src/styles/LoginPage.css';
import 'antd/dist/antd.css';

// This default export is required in a new `pages/_app.js` file.
export default function GOFARApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
