import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";

const socket = io("http://localhost:5000");
export default function Home() {
  const [nomerAntrian, setNomerAntrian] = useState(0);
  const [nomerAntrians, setNomerAntrians] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("antrian", nomerAntrian);
    localStorage.setItem("nomerAntrian", nomerAntrian);
    console.log("Kirim Nomer Antrian ke " + nomerAntrian);
  }

  useEffect(() => {
    setNomerAntrian(JSON.parse(localStorage.getItem("nomerAntrian")));
    socket.on("antrianMasuk", (nomerAntrian) => {
      setNomerAntrians([...nomerAntrians, nomerAntrian]);
    });
  });

  return (
      <div className={styles.card}>
        <div className="card text-center">
          <div className="card-header">
            <div className="d-flex align-items-center me-md-auto">
              <i className="bi bi-people-fill"></i>
              <p className={styles.judul}> Pilih Nomer Antrian</p>
            </div>
          </div>
          <div></div>
          <div className="card-body">
            <div className={styles.antrian}>
              <div className="card text-center">
                <div className="card-body">
                  <div className={styles.body}>
                  <h3 className={styles.text}>Antrian Nomer</h3>
                  <h1 className={styles.angka}>{nomerAntrian}</h1>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => setNomerAntrian(nomerAntrian + 1)}
              >
                Ambil Nomer Antrian
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
