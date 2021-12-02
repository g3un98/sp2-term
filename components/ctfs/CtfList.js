import React, { useState } from "react";
import { Button, ScrollView } from "react-native";
import { CtfListControl } from "../../src/componentState";
import CtfCard from "./CtfCard";

let initFlag = false;

const CtfList = ({ navigation }) => {
  const [ctfs, updateCtfs] = useState([]);
  const updateCtfList = async (startTime, finishTime) => {updateCtfs(await CtfListControl.updateCtfList(startTime, finishTime))};

  if (!initFlag) {
    initFlag = true;
    updateCtfList();
  }
  return (
    <ScrollView>
      {ctfs.map((ctf) => (
        <CtfCard key={ctf.id} {...ctf} navigation={navigation} />
      ))}
    </ScrollView>
    // need refresh
  );
};

export default CtfList;
