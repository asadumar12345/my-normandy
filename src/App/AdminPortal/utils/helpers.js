import dayjs from "dayjs";

export const isPositiveInteger = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  const num = Number(str);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
};

export const formatDate = (value) => {
  dayjs.locale("en-US");
  return dayjs(value).format("MMM D, YYYY");
};

export const formatDateDDMMYYYY = (value) => {
  dayjs.locale("en-US");
  return dayjs(dayjs(value).format("DD/MM/YYYY"), "DD/MM/YYYY");
};

export const getMonth = (date) => {
  return dayjs(date).format("MMM");
};

export const getYear = (date) => {
  return dayjs(date).format("YYYY");
};

export const getNameFormEmail = (str) => {
  return str.match(/^([^@]*)@/)[1];
};

export const getRandomString = () => {
  let r = (Math.random() + 1).toString(36).substring(7);
  return r;
};

export const getRandomNumber = () => {
  let r = Math.floor(Math.random() * 100000 + 1);
  return r;
};

export const getRandomPercentage = () => {
  let r = Math.floor(Math.random() * 100 + 1);
  return r;
};
export const getDateFromMonth = (monthName) => {
  // Create a date object with the current year and the given month
  const date = new Date(`${monthName} 1, ${new Date().getFullYear()}`);
  return { date };
};

const refreshPage = () => window.location.reload();

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getNewSearchParamStringWithArgs = ({ page, pageSize, search }) => {
  let searchParams = `?page=${page}&pageSize=${pageSize}`;
  if (search) {
    searchParams += `&filterName=${search}`;
  }
  return searchParams;
};

export const generateSearchParamsGetter = (params) => {
  const page = params.get("page");
  const pageSize = params.get("pageSize");
  const search = params.get("filterName");

  return () => {
    let paramsString = `?page=${page}&pageSize=${pageSize}`;
    if (search) {
      paramsString += `&filterName=${search}`;
    }
    return paramsString;
  };
};

export const getSearchParams = (spObj) => {
  return [
    spObj.get("id"),
    spObj.get("page"),
    spObj.get("pageSize"),
    spObj.get("filterName"),
    spObj.get("open"),
  ];
};
