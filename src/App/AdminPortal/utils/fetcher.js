import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetcher = async ({ url }) => {
  await sleep(1000);
  return await axios
    .get(url)
    .then((response) => response?.data)
    .catch((error) => `error:${error}`);
};
