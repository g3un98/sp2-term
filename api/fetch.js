import fetch from "node-fetch";
import { InsertCtfDb } from "../database/CtfDb";

export const FetchCtfInfo = async (startTime, finishTime) => {
  console.log("[FetchCtfInfo] Fetch && DB Insert Test Start");
  const GetJsonData = (url) => {
    return fetch(url).then((res) => res.json());
  };

  let Url = `https://ctftime.org/api/v1/events/?limit=500&start=${startTime}&finish=${finishTime}`;

  let ctfInfoJsonList = await GetJsonData(Url);
  // console.log(ctfInfoJsonList);
  InsertCtfDb(ctfInfoJsonList);
};
