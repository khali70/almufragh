import React, { useEffect, useState } from "react";
import loc from "../localization";
import Context from "./Context";

export default function ContextWrapper(props) {
  const [numApiRequests, setNumApiRequests] = useState(0);
  const [currentFile, setCurrentFile] = useState("____.mp3");
  const [currentClip, setCurrentClip] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalClipsInFile, setTotalClipsInFile] = useState(0);
  const [step, setStep] = useState(-1);
  const [timePerClip, setTimePerClip] = useState(0);
  const [filesToProcess, setFilesToProcess] = useState([]);
  const [processStarted, setProcessStarted] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState(() => {
    if (JSON.parse(localStorage.getItem("speechLanguage"))) {
      return JSON.parse(localStorage.getItem("speechLanguage"));
    } else {
      return "ar";
    }
  });
  const [theme, setTheme] = useState(() => {
    if (JSON.parse(localStorage.getItem("theme"))) {
      return JSON.parse(localStorage.getItem("theme"));
    } else {
      return "light";
    }
  });
  const [conversionEngine, setConversionEngine] = useState(() => {
    if (JSON.parse(localStorage.getItem("conversionEngine"))) {
      return JSON.parse(localStorage.getItem("conversionEngine"));
    } else {
      return "wit";
    }
  });
  const [apiKey, setApiKey] = useState(() => {
    if (JSON.parse(localStorage.getItem("apiKey"))) {
      return JSON.parse(localStorage.getItem("apiKey"));
    } else {
      return "";
    }
  });
  const [interfaceLanguage, setInterfaceLanguage] = useState(() => {
    if (JSON.parse(localStorage.getItem("interfaceLanguage"))) {
      return JSON.parse(localStorage.getItem("interfaceLanguage"));
    } else {
      return "ar";
    }
  });
  const [outputDirectory, setOutputDirectory] = useState(() => {
    if (JSON.parse(localStorage.getItem("outputDirectory"))) {
      return JSON.parse(localStorage.getItem("outputDirectory"));
    } else {
      return "";
    }
  });

  const resetStats = () => {
    setCurrentClip(0);
    setCurrentFile("");
    setTotalClipsInFile(0);
    setStep(-1);
    setCurrentSubtitle("");
  };

  useEffect(() => {
    localStorage.setItem("speechLanguage", JSON.stringify(speechLanguage));
    localStorage.setItem("conversionEngine", JSON.stringify(conversionEngine));
    localStorage.setItem(
      "interfaceLanguage",
      JSON.stringify(interfaceLanguage)
    );
    loc.setLanguage(interfaceLanguage);
    localStorage.setItem("outputDirectory", JSON.stringify(outputDirectory));
    localStorage.setItem("apiKey", JSON.stringify(apiKey));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [
    speechLanguage,
    conversionEngine,
    apiKey,
    interfaceLanguage,
    outputDirectory,
    theme,
  ]);

  useEffect(() => {
    setTotalFiles(filesToProcess.length);
  }, [filesToProcess]);

  return (
    <Context.Provider
      value={{
        numApiRequests,
        setNumApiRequests,
        currentFile,
        currentClip,
        setCurrentFile,
        setCurrentClip,
        totalFiles,
        setTotalFiles,
        totalClipsInFile,
        setTotalClipsInFile,
        filesToProcess,
        setFilesToProcess,
        step,
        setStep,
        timePerClip,
        setTimePerClip,
        speechLanguage,
        setSpeechLanguage,
        apiKey,
        setApiKey,
        interfaceLanguage,
        setInterfaceLanguage,
        outputDirectory,
        setOutputDirectory,
        conversionEngine,
        setConversionEngine,
        processStarted,
        setProcessStarted,
        resetStats,
        currentSubtitle,
        setCurrentSubtitle,
        setLoading,
        loading,
        setError,
        error,
        theme,
        setTheme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
