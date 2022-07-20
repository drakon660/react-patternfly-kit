import axios from "axios";
import React, { useState } from "react";
import { useDownloadFile } from "./useDownloadFile";

export const DownloadSampleCsvFile: React.FC = () => {
  
  
  const getFileName = () => {
    return "_sample-file.csv";
  };

  const downloadSampleCsvFile = () => {
    // throw new Error("uncomment this line to mock failure of API");
    return axios.get(
      "https://raw.githubusercontent.com/anubhav-goel/react-download-file-axios/main/sampleFiles/csv-sample.csv",
      {
        responseType: "blob",
        /* 
        headers: {
          Authorization: "Bearer <token>", // add authentication information as required by the backend APIs.
        },
         */
      }
    );
  };

  const { ref, url, download, name } = useDownloadFile({
    apiDefinition: downloadSampleCsvFile,
    preDownloading: ()=>{},
    postDownloading:()=>{},
    onError: ()=>{},
    getFileName,
  });

  return (
    <>
      <a href={url} download={name} className="hidden" ref={ref} />
      <button onClick={download}>Export</button>
      </>   
  );
};