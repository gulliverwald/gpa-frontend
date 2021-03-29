import { useHistory, useLocation } from 'react-router-dom';

type RedirectCallback = (pathname: string, data?: unknown | null) => void;
type BackCallback = () => void;

interface LocationState<D> {
  /**
   * Refererrer to the last location.
   */
  referrer: {
    location: Location;
  };

  /**
   * Optional data to pass to another route.
   */
  data?: D;
}

interface RedirectState<D> {
  /**
   * This function redirect to another route by pathname
   * @param pathname - The pathname to redirect.
   * @param data - An optional data to carry on the route.
   */
  redirect: RedirectCallback;

  /**
   * This function return to the last route in the history.
   */
  back: BackCallback;

  /**
   * The current location state.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Location
   */
  state: LocationState<D> | undefined;
  pathname: string;
}

function useRedirect<Data = unknown | undefined | null>(): RedirectState<Data> {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation<any>();

  /**
   * This function redirect to another route by pathname
   * @param pathname - The pathname to redirect.
   * @param data - An optional data to carry on the route.
   */
  const redirect = (pathname: string, data?: unknown | null): void => {
    history.push(pathname, {
      referrer: {
        location,
      },
      data,
    });
  };

  /**
   * This function return to the last route in the history.
   */
  const back = (): void => {
    const { referrer } = location.state;
    if (referrer) {
      history.push(referrer.location.pathname, {
        referrer: {
          location,
        },
      });
    }
  };

  return {
    redirect,
    back,
    state: location.state,
    pathname: location.pathname,
  };
}

export default useRedirect;
