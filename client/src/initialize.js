// @flow
import ReactGA from 'react-ga';
import env from './env';

const initialize = (): void => {
  // initialize google analytics
  ReactGA.initialize("UA-179020481-1", {
    debug: env.debug,
  });

  // Only log pageviews in prod
  if (!env.debug) {
    ReactGA.pageview(window.location.pathname);
  }
}

export default initialize;
