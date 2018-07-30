const renderIf = (test, trueComponent, falseComponent = null) => {
  return test ? trueComponent : falseComponent;
};

// TODO: cookies not until tomorrow
const cookieFetchAll = () => {
  return Object.assign(...document.cookie.split(';'))
    .map((cookie) => {
      const [key, value] = cookie.split('=');
      return { [key.trime()]: value };
    });
};

const cookieDelete = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const cookieFetch = (key) => {
  return cookieFetchAll()[key];
};


export { renderIf, cookieDelete, cookieFetch, cookieFetchAll }; // eslint-disable-line