import styles from "../styles/antrian.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactAudioPlayer from 'react-audio-player';
import { io } from "socket.io-client";
import React, { useState, useEffect, Component } from "react";

const socket = io("http://localhost:5000");

export default function PanggilanAntrian() {
  const [nomerAntrian, setNomerAntrian] = useState(null);
  const [nomerAntrians, setNomerAntrians] = useState([]);
  
  // function play() {
  //   responsiveVoice.speak("Nomor Antrian, " + nomerAntrian + ", menuju, loket, 1", "Indonesian Male", {
  //     rate: 0.9,
  //     pitch: 1,
  //     volume: 1
  //   });
  // }

  function playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  };

  useEffect(() => {
    setNomerAntrian(JSON.parse(localStorage.getItem('nomerAntrian')));
    socket.on("antrianMasuk", (nomerAntrian) => {
        setNomerAntrians([...nomerAntrians, nomerAntrian]);
    });
  });


  return (
    <div className={styles.card}>
      <div className="card text-center">
        <div className="card-header">
          <div className="d-flex align-items-center me-md-auto">
            <i className="bi bi-volume-down-fill"></i>
            <p className={styles.judul}>Panggilan Antrian</p>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nomer</th>
                <th scope="col">Panggil</th>
              </tr>
            </thead>
            <tbody>
              {nomerAntrians.map((nomerAntrian, index) => (
                <span key={index}>
                  <tr>
                    <td>{nomerAntrian}</td>
                    <td><button onClick={playAudio} className={styles.button}><i className="bi bi-volume-up-fill"></i></button></td>
                    {/* <ReactAudioPlayer
                      src="../assets/tingtung.ogg"
                      autoPlay
                      controls
                    /> */}
                  </tr>
                </span>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
