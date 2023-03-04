import React, {
  useCallback,
  useState,
  CSSProperties,
  useRef,
  useEffect,
  useContext,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDropzone } from "react-dropzone";

import {
  faPowerOff,
  faGear,
  faPlayCircle,
  faWindowClose,
  faFile,
  faTrashCan,
  faAdd,
  faClock,
  faClose,
  faKey,
  faFolder,
  faStop,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { secondsToHHMMSS } from "./util";
import loc from "./localization";
import Context from "./Context/Context";
const { ipcRenderer } = window.require("electron");
const FileItem = ({ name, index, duration, deleteFile }) => {
  const shortName = name.substring(0, 10) + "...";
  const numberOfClips = Math.round(duration / 18);
  return (
    <div class=" card bg-base-100  p-2 my-1 rounded-none border-b-2">
      <div className="flex flex-row justify-between items-center">
        <div className=" text-ellipsis">
          <FontAwesomeIcon
            icon={faFile}
            fixedWidth
            size="lg"
            className="text-neutral"
          />
          {shortName}
        </div>
        <div className="flex flex-row items-center">
          <span className="badge badge-success mx-2 p-3 ">{numberOfClips}</span>
          <span className="badge badge-success-content mx-2 p-3 ">
            <div className="text-white">
              <FontAwesomeIcon icon={faClock} fixedWidth size="lg" />
              {secondsToHHMMSS(duration)}
            </div>
          </span>
          <button
            className="btn btn-square btn-outline btn-sm btn-error rounded-lg "
            onClick={() => {
              deleteFile(index);
            }}
          >
            <FontAwesomeIcon icon={faWindowClose} fixedWidth size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ toggleModal }) => {
  const {
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
    setTheme,
    theme,
  } = useContext(Context);

  useEffect(() => {
    ipcRenderer.on("file", (event, path) => {
      setOutputDirectory(path);

      return () => {
        ipcRenderer.removeAllListeners("file");
      };
    });
  }, []);

  const openLink = (link) => {
    ipcRenderer.send("openLink", link);
  };

  return (
    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-200 bg-opacity-50">
      <div className="card bg-base-100 shadow p-10 w-96">
        <div className="absolute top-2 right-2">
          <button
            className="btn btn-ghost btn-square   btn-sm  mx-1"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faClose} fixedWidth size="lg" />
          </button>
        </div>
        <div className="mb-2">
          <div className="text-start ">{loc.speech_language}</div>
          <select
            class="select w-full max-w-xs"
            onChange={(event) => {
              const options = event.target.options;
              setSpeechLanguage(options[event.target.selectedIndex].id);
            }}
          >
            <option disabled selected={speechLanguage === ""}>
              {loc.speech_language}
            </option>
            <option id="ar" selected={speechLanguage === "ar"}>
              {loc.arabic}
            </option>
            {/* <option id="en" selected={speechLanguage === "en"}>
              {loc.english}
            </option> */}
          </select>
          <hr></hr>
        </div>
        <div className="mb-2">
          <div className="text-start ">{loc.conversion_engine}</div>
          <select
            class="select w-full max-w-xs"
            onChange={(event) => {
              const options = event.target.options;
              setConversionEngine(options[event.target.selectedIndex].id);
            }}
          >
            <option disabled selected={conversionEngine === ""}>
              {loc.conversion_engine}
            </option>
            {/* <option id="google" selected={conversionEngine === "google"}>
              Google
            </option> */}
            <option id="wit" selected={conversionEngine === "wit"}>
              Wit.ai
            </option>
          </select>
          <hr></hr>
        </div>
        <div className="mb-2">
          <div className="text-start ">{loc.interface_language}</div>
          <select
            class="select w-full max-w-xs"
            onChange={(event) => {
              const options = event.target.options;
              setInterfaceLanguage(options[event.target.selectedIndex].id);
            }}
          >
            <option disabled selected={interfaceLanguage === ""}>
              {loc.interface_language}
            </option>
            <option id="ar" selected={interfaceLanguage === "ar"}>
              {loc.arabic}
            </option>
            <option id="en" selected={interfaceLanguage === "en"}>
              {loc.english}
            </option>
          </select>
          <hr></hr>
        </div>
        <div className="mb-2">
          <div className="text-start ">{loc.theme}</div>
          <select
            class="select w-full max-w-xs"
            onChange={(event) => {
              const options = event.target.options;
              setTheme(options[event.target.selectedIndex].id);
            }}
          >
            <option disabled selected={theme === ""}>
              {loc.theme}
            </option>
            <option id="light" selected={theme === "light"}>
              {loc.light}
            </option>
            <option id="dark" selected={theme === "dark"}>
              {loc.dark}
            </option>
          </select>
          <hr></hr>
        </div>
        <div className="mb-2">
          <div className="text-start my-1">
            <span className="mx-1">
              {loc.choose_output_directory}
              <button
                className="btn  btn-ghost btn-xs mx-2 rounded-lg"
                onClick={() => {
                  ipcRenderer.send("chooseDir");
                }}
              >
                <FontAwesomeIcon
                  icon={faFolder}
                  fixedWidth
                  size="l"
                  className="text-warning"
                />
              </button>
            </span>
          </div>
          <input
            type="text"
            value={outputDirectory}
            disabled
            placeholder="/output"
            class="input input-bordered w-full max-w-xs"
          />
          <hr></hr>
        </div>
        <div className="mb-2">
          <div className="text-start my-1">
            <span className="mx-1">{loc.enter_wit_api_key}</span>
            <FontAwesomeIcon
              icon={faKey}
              fixedWidth
              size="l"
              className="text-warning mx-2"
            />
          </div>
          <input
            type="text"
            // defaultValue=""
            value={apiKey}
            class="input input-bordered w-full max-w-xs"
            onChange={(event) => {
              setApiKey(event.target.value);
            }}
          />
          <hr></hr>
        </div>
        {/* <div className="mb-2">
          <div className="text-start my-1">
            <span className="mx-1">{loc.enter_google_api_key}</span>
            <FontAwesomeIcon
              icon={faKey}
              fixedWidth
              size="l"
              className="text-warning mx-2"
            />
          </div>
          <input type="text" class="input input-bordered w-full max-w-xs" />
          <hr></hr>
        </div> */}
        <button
          className="btn btn-sm btn-success rounded-lg"
          onClick={toggleModal}
        >
          {loc.save}
        </button>
        <div className="mt-8 flex flex-row items-center justify-between">
          <div className="text-slate-400">{loc.version}</div>
          <div className="text-slate-400">
            <button
              className="btn btn-ghost"
              onClick={() => openLink("https://almufragh.t.me")}
            >
              {loc.searchForUpdates}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const MessageModal = () => {
  const { setError, error } = useContext(Context);

  return (
    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-200 bg-opacity-50">
      <div className="card bg-base-100 shadow p-10 w-96">
        <div className="absolute top-2 right-2">
          <button
            className="btn btn-ghost btn-square   btn-sm  mx-1"
            onClick={() => {
              setError(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} fixedWidth size="lg" />
          </button>
        </div>
        <div className="mb-2">
          <div>{error}</div>
        </div>
      </div>
    </div>
  );
};

const LoadingModal = () => {
  return (
    <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-200 bg-opacity-50">
      <div className="card bg-base-100 shadow p-10 w-96">Loading ....</div>
    </div>
  );
};
function MyDropzone() {
  //const [filesToConvert, setFilesToConvert] = useState([]);
  const { filesToProcess, setFilesToProcess, setLoading, outputDirectory } =
    useContext(Context);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    const files = [];
    acceptedFiles.map((file, index) => {
      files.push({
        id: index,
        name: file.name,
        path: file.path,
        duration: 0.0,
      });
    });

    ipcRenderer.send("getDurations", files);
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    useFsAccessApi: false,
    noClick: true,
    accept: {
      "audio/mpeg": [".mp3", ".wav", ".ogg"],
    },
  });

  useEffect(() => {
    ipcRenderer.on("getDurations-reply", (event, files) => {
      console.log(files);
      addFiles(files);
      setLoading(false);
      ipcRenderer.on("fileComplete", (event, idx) => {
        deleteFile(idx);
      });
    });

    return () => {
      ipcRenderer.removeAllListeners("getDurations-reply");
      ipcRenderer.removeAllListeners("fileComplete");
    };
  }, []);
  const openOutputDir = () => {
    ipcRenderer.send("openOutputDir", outputDirectory);
  };
  const clearFiles = () => {
    setFilesToProcess([]);
  };
  const addFiles = (files) => {
    setFilesToProcess((filesToProcess) => {
      let newFiles = [...files];
      files.map((file, fileIdx) => {
        const idx = filesToProcess.findIndex((item) => {
          return item.path === file.path;
        });
        console.log(idx, filesToProcess);
        if (idx !== -1) {
          newFiles.splice(fileIdx, 1);
        }
      });
      const newList = newFiles.concat(filesToProcess);
      return newList;
    });
  };

  const deleteFile = (idx) => {
    console.log(idx);
    if (idx !== -1) {
      setFilesToProcess((filesToProcess) => {
        const newList = [...filesToProcess].filter((file) => {
          return file.id != idx;
        });

        // newList.splice(idx, 1);
        return newList;
      });
    }
  };

  return (
    <div
      {...getRootProps()}
      className=" card content-center items-center mb-3 mt-1  bg-base-100   rounded-lg p-2   "
    >
      <input {...getInputProps()} />
      {filesToProcess?.length !== 0 ? (
        <div className="">
          <div className="flex flex-row justify-evenly my-2">
            <div className="btn btn-success btn-sm rounded-lg " onClick={open}>
              <div class="flex flex-row   items-center justify-center ">
                <FontAwesomeIcon icon={faAdd} fixedWidth size="lg" />
                <div>{loc.add}</div>
              </div>
            </div>
            <div
              className="btn btn-success btn-sm btn-outline rounded-lg mx-2 "
              onClick={openOutputDir}
            >
              <div class="flex flex-row   items-center justify-center ">
                <FontAwesomeIcon icon={faFolder} fixedWidth size="lg" />
                <div>{loc.open_out_dir}</div>
              </div>
            </div>
            <button className="btn btn-error btn-sm btn-outline rounded-lg  ">
              <div
                class="flex flex-row items-center justify-center "
                onClick={() => {
                  clearFiles();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} fixedWidth size="lg" />
                <div>{loc.clear}</div>
              </div>
            </button>
          </div>
          <div className="overflow-scroll h-96">
            {filesToProcess.map((file, index) => (
              <FileItem
                key={index}
                index={index}
                name={file.name}
                duration={file.duration}
                deleteFile={deleteFile}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed h-72 flex flex-col justify-center items-center w-full ">
          <img
            className="opacity-10"
            src={require("./Images/text-to-speech.png")}
            width="128px"
            height="128px"
          />
          {isDragActive ? (
            <p>{loc.drop_files_here}</p>
          ) : (
            <div>
              <p>{loc.drag_and_drop_or_click_select_button}</p>
              <div className="flex flex-row items-center justify-center mt-2">
                <button
                  className="btn btn-success btn-sm rounded-lg "
                  onClick={open}
                >
                  <div class="flex flex-row   items-center justify-center ">
                    <FontAwesomeIcon icon={faAdd} fixedWidth size="lg" />
                    <div>{loc.add}</div>
                  </div>
                </button>
                <div
                  className="btn btn-success btn-sm btn-outline rounded-lg mx-2 "
                  onClick={openOutputDir}
                >
                  <div class="flex flex-row   items-center justify-center ">
                    <FontAwesomeIcon icon={faFolder} fixedWidth size="lg" />
                    <div>{loc.open_out_dir}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const ProcessStats = () => {
  const {
    setProcessStarted,
    processStarted,
    totalFiles,
    numApiRequests,
    filesToProcess,

    speechLanguage,
    outputDirectory,
    timePerClip,
    totalClipsInFile,
    apiKey,
    setError,
  } = useContext(Context);

  const start = () => {
    if (!filesToProcess.length) {
      setError(loc.pleaseAddSomeFiles);
      return;
    }
    if (!apiKey || apiKey === "null") {
      setError(loc.pleaseEnterApiKey);
      return;
    }
    setProcessStarted(true);
    ipcRenderer.send(
      "start",
      filesToProcess,
      apiKey,
      speechLanguage,
      outputDirectory
    );
  };
  const stop = () => {
    setProcessStarted(false);
    ipcRenderer.send("stop");
  };
  const getTimeInHourSeconds = (timemili) => {
    return secondsToHHMMSS((timemili * totalClipsInFile * totalFiles) / 1000)
      .split(":")
      .map((s) => Math.round(s));
  };
  const eta = getTimeInHourSeconds(timePerClip);
  return (
    <div class="card ">
      <div className=" stats stats-horizontal  shadow   mb-1  rounded-lg flex">
        {!processStarted ? (
          <div className="stat  items-center ">
            <div className="justify-center items-center">
              <button className="btn btn-circle btn-success " onClick={start}>
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  fixedWidth
                  size="lg"
                  className="text-accent-content"
                />
              </button>
            </div>
            <div className="mt-2 text-lg font-bold">{loc.start}</div>
          </div>
        ) : (
          <div className="stat  items-center ">
            <div className="justify-center items-center">
              <button className="btn btn-circle btn-error " onClick={stop}>
                <FontAwesomeIcon icon={faStop} fixedWidth size="lg" />
              </button>
            </div>
            <div className="mt-2 text-lg font-bold">{loc.stop}</div>
          </div>
        )}
        <div className="stat">
          <div className="stat-title">{loc.files}</div>
          <div className="text-lg font-bold">{totalFiles}</div>
        </div>
        <div className="stat">
          <div className="stat-title">{loc.estimated_time}</div>
          <div className=" text-lg font-bold">
            {eta[0]} {loc.hour}
          </div>
          <div className=" text-lg font-bold">
            {eta[1]} {loc.min}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">{loc.network}</div>
          <div className="stat-title">{loc.requests}</div>
          <div className="text-lg font-bold">{numApiRequests}</div>
        </div>
      </div>
    </div>
  );
};

const TitleBar = ({ closeApp, toggleModal, minimizeApp }) => {
  return (
    <div className="flex flex-row justify-between items-center fixed top-0  bg-success   w-full  ">
      <div className="flex flex-row justify-start items-center p-2  ">
        <button
          className="btn btn-ghost btn-square btn-error btn-sm"
          onClick={closeApp}
        >
          <FontAwesomeIcon icon={faPowerOff} fixedWidth size="lg" />
        </button>
        <button
          className="btn btn-ghost btn-square btn-error btn-sm"
          onClick={minimizeApp}
        >
          <FontAwesomeIcon icon={faMinus} fixedWidth size="lg" />
        </button>
        <button
          className="btn btn-ghost btn-square   btn-sm  mx-1"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faGear} fixedWidth size="lg" />
        </button>
      </div>
      <div className="title-bar  top-1 text-base-100 "> </div>
    </div>
  );
};
const Progress = () => {
  const { currentClip, totalClipsInFile, step, currentSubtitle } =
    useContext(Context);
  let progressPercent = Math.round((currentClip / totalClipsInFile) * 100);
  if (!progressPercent) {
    progressPercent = 0;
  }
  return (
    <div>
      {step === 0 ? (
        <div
          className="radial-progress text-success font-bold ml-5 animate-spin"
          style={{
            "--value": 50,
            "--thickness": "15px",
            "--size": "5rem",
          }}
        ></div>
      ) : (
        <div
          className="radial-progress text-success font-bold ml-5"
          style={{
            "--value": progressPercent,
            "--thickness": "15px",
            "--size": "5rem",
          }}
        >
          {progressPercent}%
        </div>
      )}
    </div>
  );
};
const FileStats = () => {
  const { currentFile, currentClip, totalClipsInFile, step, currentSubtitle } =
    useContext(Context);

  return (
    <div className="card bg-base-100  shadow-xl p-3 rounded-lg  ">
      <div className="text-sm">{currentFile.name}</div>
      <div className="flex flex-row justify-between items-center">
        <div className="w-1/3">
          <Progress />
        </div>
        <div className="w-2/3">
          <ul class="steps steps-vertical">
            <li class={`step step-${step === 0 ? "success" : "neutral"}`}>
              <div className="text-l ">{loc.split_audio_files} </div>
            </li>
            <div className="font-bold text-xl">{totalClipsInFile}</div>
            <li class={`step step-${step === 1 ? "success" : "neutral"} `}>
              <div className="text-l  ">{loc.upload_to_server}</div>
            </li>
            <div className="font-bold text-xl  ">
              {totalClipsInFile} / {currentClip}
            </div>
          </ul>
        </div>
      </div>
      <div>{currentSubtitle}</div>
    </div>
  );
};
const SplashScreen = () => {
  return (
    <div className="App justify-center items-center flex">
      <div className="card w-full h-full">
        <img
          src={require("./Images/splash.png")}
          width="480px"
          height="250px"
        />
      </div>
    </div>
  );
};
const App = () => {
  const [modal, setModal] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const {
    setCurrentFile,
    setCurrentClip,
    setNumApiRequests,
    setTotalFiles,
    setTotalClipsInFile,
    setProcessStarted,
    setStep,
    numApiRequests,
    step,
    processStarted,
    resetStats,
    setCurrentSubtitle,
    setTimePerClip,
    loading,
    speechLanguage,
    interfaceLanguage,
    setApiKey,
    setOutputDirectory,
    setInterfaceLanguage,
    error,
    theme,
    setError,
  } = useContext(Context);

  useEffect(() => {
    ipcRenderer.on("numberOfClips", (event, num) => {
      console.log(num);
      setTotalClipsInFile(num);
    });
    ipcRenderer.on("APIHit", (event) => {
      //console.log("API hit");

      setNumApiRequests((num) => num + 1);
    });
    ipcRenderer.on("currentClip", (event, clip) => {
      //console.log(clip);
      setCurrentClip(clip);
    });

    ipcRenderer.on("processComplete", () => {
      setProcessStarted(false);
      resetStats();
    });
    ipcRenderer.on("currentFile", (event, file) => {
      console.log(file);
      setCurrentFile(file);
    });
    ipcRenderer.on("timePerClip", (event, time) => {
      setTimePerClip(time);
    });
    ipcRenderer.on("step", (event, num) => {
      setStep(num);
    });
    ipcRenderer.on("currentSubtitle", (event, sub) => {
      setCurrentSubtitle(sub);
    });
    ipcRenderer.on("clipCreated", () => {
      setTotalClipsInFile((totalClipsInFile) => totalClipsInFile + 1);
    });
    ipcRenderer.on("error", (event, err) => {
      setError(err);
    });

    setTimeout(() => {
      setAppReady(true);
    }, 1500);

    return () => {
      ipcRenderer.removeAllListeners("numberOfClips");
      ipcRenderer.removeAllListeners("APIHit");
      ipcRenderer.removeAllListeners("currentClip");
      ipcRenderer.removeAllListeners("currentFile");

      ipcRenderer.removeAllListeners("processComplete");
      ipcRenderer.removeAllListeners("timePerClip");
      ipcRenderer.removeAllListeners("step");
      ipcRenderer.removeAllListeners("error");
      ipcRenderer.removeAllListeners("currentSubtitle");
      ipcRenderer.removeAllListeners("clipCreated");
    };
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };
  const closeApp = () => {
    ipcRenderer.send("quit");
  };
  const minimizeApp = () => {
    ipcRenderer.send("minimize");
  };
  if (!interfaceLanguage) {
    loc.setLanguage("ar");
  } else {
    loc.setLanguage(interfaceLanguage);
  }

  if (!appReady) {
    return <SplashScreen />;
  }
  return (
    <div
      className={`App bg-neutral-content text-accent-content `}
      data-theme={theme === "dark" ? "dark" : "light"}
      dir={interfaceLanguage === "en" ? "ltr" : "rtl"}
    >
      {modal ? <SettingsModal toggleModal={toggleModal} /> : null}
      {loading ? <LoadingModal /> : null}
      {error ? <MessageModal /> : null}
      <section className={`z-0 bg-success `}></section>

      <hr />
      <TitleBar
        closeApp={closeApp}
        toggleModal={toggleModal}
        minimizeApp={minimizeApp}
      />

      <div className="mx-5 pt-16  ">
        <ProcessStats />
        <FileStats />

        <MyDropzone />
      </div>
    </div>
  );
};

export default App;
