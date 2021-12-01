import React, { useState, useEffect, useReducer } from "react";
import { Text, ScrollView } from "react-native";
import { MarkedListControl } from "../../src/componentState";
import MarkedCtfCard from "./MarkedCtfCard";

// IMPORT FOR API TEST
import { fetchCtfInfo } from "../../api/fetch";

let initFlag = false;

const MarkedCtfList = ({ navigation }) => {
  const [markedCtfs, updateMarkedCtfs] = useState([]);

  const deleteMarkedCtfList = (id) => {updateMarkedCtfs(MarkedListControl.deleteMarkedCtfList(id, markedCtfs))};
  const updateMarkedCtfList = async (startTime, finishTime) => {updateMarkedCtfs(await MarkedListControl.updateMarkedCtfList(startTime, finishTime))};

  if (!initFlag) {
    initFlag = true;
    updateMarkedCtfList();
  }
  return (
    <ScrollView>
      {markedCtfs.map((markedCtf) => (
        <MarkedCtfCard
          key={markedCtf.id}
          markedCtfs={markedCtfs}
          deleteMarkedCtfList={deleteMarkedCtfList}
          {...markedCtf}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default MarkedCtfList;
