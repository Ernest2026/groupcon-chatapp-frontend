import React, { Component } from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";

import { Pause, Mic, Trash, Stop, Play } from "./Svgs.js";

export default class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordState: null,
    };
  }

  start = () => {
    document.getElementById("rec-start").classList.add("rec-r-10");
    document.getElementById("rec-pause").classList.remove("rec-hide");
    document.getElementById("rec-stop").classList.remove("rec-hide");
    document.querySelector(".audio-react-recorder__canvas").style.display =
      "unset";
    document.getElementById("msg-input").classList.add("vsb-hdn");
    this.setState({
      recordState: RecordState.START,
    });
  };

  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE,
    });
  };

  clear = () => {
    document.getElementById("rec-div").innerHTML = "";
    document.getElementById("msg-input").classList.remove("vsb-hdn");
    document.getElementById("rec-start").classList.remove("rec-hide");
    document.getElementById("rec-clear").classList.add("rec-hide");
    document.querySelector(".audio-react-recorder__canvas").style.display =
      "none";
    document.getElementById("rec-div").style.display = "none";
  };

  stop = () => {
    document.getElementById("rec-start").classList.remove("rec-r-10");
    document.getElementById("rec-start").classList.add("rec-hide");
    document.getElementById("rec-pause").classList.add("rec-hide");
    document.querySelector(".audio-react-recorder__canvas").style.display =
      "none";
    document.getElementById("rec-div").style.display = "unset";
    document.getElementById("rec-stop").classList.add("rec-hide");
    document
      .querySelector(".audio-react-recorder__canvas")
      .classList.add("rec-hide");
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  onStop = async (audioData) => {
    const audio = document.createElement("audio");
    audio.classList.add("rec-file");
    audio.setAttribute("controls", "true");
    audio.innerText = JSON.stringify(audioData);
    const audioSource = document.createElement("source");
    audioSource.setAttribute("id", "sound-file");
    audioSource.setAttribute("src", audioData.url);
    audioSource.setAttribute("type", audioData.type);
    audio.appendChild(audioSource);
    document.getElementById("rec-div").appendChild(audio);
    document.getElementById("rec-clear").classList.remove("rec-hide");
    this.props.parentCallback(audioData);
  };

  render() {
    const { recordState } = this.state;

    return (
      <div>
        <AudioReactRecorder state={recordState} onStop={this.onStop} />

        <div className="rec-div" id="rec-div"></div>

        <button
          type="button"
          className="rec-start"
          id="rec-start"
          onClick={this.start}
        >
          {recordState === "pause" ? <Play /> : <Mic />}
        </button>
        <button
          type="button"
          className="rec-hide rec-pause"
          id="rec-pause"
          onClick={this.pause}
        >
          <Pause />
        </button>
        <button
          type="button"
          className="rec-hide rec-stop"
          id="rec-stop"
          onClick={this.stop}
        >
          <Stop />
        </button>
        <button
          type="button"
          className="rec-hide rec-clear"
          id="rec-clear"
          onClick={this.clear}
        >
          <Trash />
        </button>
      </div>
    );
  }
}
