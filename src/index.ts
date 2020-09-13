interface CookieOptions {
  path?: string;
  expires?: number;
}

type CookieValues = string | number | boolean;

const getExpirationDate = (hours: number = 1): string =>
  new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();

export default () => {
  const setValue = (
    key: string,
    value: CookieValues,
    options: CookieOptions = {}
  ): void => {
    const cookie = `${key}=${encodeURIComponent(
      value
    )};expires=${getExpirationDate(options.expires)};path=${options.path ??
      '/'}`;

    document.cookie = cookie;
  };

  const getValue = (key: string): CookieValues => {
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const value: string = decodedCookie.split('; ').find((name: string) => {
      return name.startsWith(key);
    }) as string;

    if (value) {
      return value.split('=')[1] ?? '';
    } else {
      return '';
    }
  };

  return { setValue, getValue };
};
