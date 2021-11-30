import React, { useState } from "react";
import { Button, ScrollView } from "react-native";
import CtfCard from "./CtfCard";

// IMPORT FOR API TEST
import { fetchCtfInfo } from "../../api/fetch";

let initFlag = false;

const CtfList = ({ navigation }) => {
  const [ctfs, updateCtfs] = useState([]);
  
  const updateCtfList = async (startTime) => {
    // update database and call database select function -> ctfs = select(???)
    let newCtfList = await fetchCtfInfo(startTime=startTime);
    updateCtfs(newCtfList);
  }

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
    
    // need refresh function
  );
};

export default CtfList;
