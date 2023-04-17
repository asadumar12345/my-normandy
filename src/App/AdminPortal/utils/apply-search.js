import dayjs from "dayjs";
// returns true if any of any value of Object contains searchQuery otherwise return false
export function shouldApplyFilter(object, query) {
  let values = [];
  // if search data by date
  const date = new Date(object);
  // eslint-disable-next-line eqeqeq
  if (date != "Invalid Date") {
    // no need to search if searchQuery is empty --> return true for all
    if (query.key !== "between") {
      if (!query.value || !query.value.replace(/\s/g, "").length) return true;
    } else {
      if (!query.value[0] || !query.value[0].replace(/\s/g, "").length)
        return true;
      if (!query.value[1] || !query.value[1].replace(/\s/g, "").length)
        return true;
    }
    let searchDate1 = null;
    let searchDate2 = null;
    let searchDate = null;
    if (query.key === "between") {
      searchDate1 = dayjs(query.value[0]).utc().format("YYYY-MM-DD");
      searchDate2 = dayjs(query.value[1]).utc().format("YYYY-MM-DD");
    } else {
      searchDate = dayjs(query.value).utc().format("YYYY-MM-DD");
    }
    const recordDate = dayjs(object).utc().format("YYYY-MM-DD");
    if (query.key === "after") return recordDate > searchDate;
    else if (query.key === "before") return recordDate < searchDate;
    else if (query.key === "between") {
      return recordDate > searchDate1 && recordDate < searchDate2;
    }
  } else {
    // no need to search if searchQuery is empty --> return true for all
    if (!query || !query.replace(/\s/g, "").length) return true;
    // slugify searchQuery
    const querySlug = query.toLowerCase().replace(/\s/g, "");
    // if search from a strings
    if (typeof object === "string") {
      values = object.toString().toLowerCase().replace(/\s/g, "");
      return values.includes(querySlug);
    } else {
      // fields array to holds all values from the map for sake of comparison with searchQuery
      values = Object.values(object);
      // return true if any of values contains searchQuery
      return values.some((value) => {
        if (!value && value !== 0) return false;
        // slugify value
        const valueSlug = value.toString().toLowerCase().replace(/\s/g, "");
        // .replace(/^\s+|\s+$/g, '');
        return valueSlug.includes(querySlug);
      });
    }
  }
}
