import fetch from "node-fetch";
import { insertCtfDb } from "../database/CtfDb";

export const fetchCtfInfo = async (startTime, finishTime) => {
  console.log("[FetchCtfInfo] Fetch && DB Insert Test Start");
  const getJsonData = (url) => {
    return fetch(url).then((res) => res.json());
  };

  let URL = `https://ctftime.org/api/v1/events/?limit=5&start=${startTime}&finish=${finishTime}`;

  let ctfInfoJsonList = await getJsonData(URL);
  // console.log(ctfInfoJsonList);
  insertCtfDb(ctfInfoJsonList);
};
