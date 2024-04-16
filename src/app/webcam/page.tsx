"use client";

import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import socket from "@/app/socketStore";

const webcam = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [username, setUsername] = useState<string>("");
  const [created, setCreated] = useState<boolean>(false);
  const videoRef = useRef<any>(null);

  const constraints: MediaStreamConstraints = {
    audio: false,
    video: true,
  };

  const enableCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    () => {
      if (stream) {
        stream.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleVideoCall = () => {
    if (username) {
      socket.emit("join", username);
      //   enableCamera();
    } else {
      alert("please enter username");
    }
  };

  socket.on("created", () => {
    setCreated(true);
    enableCamera();
  });
  socket.on("joined", () => {
    setCreated(false);
    enableCamera();
  });

  socket.on("full", () => {
    alert("room is full can't join");
  });

  socket.on("ready", () => {});
  socket.on("candidate", () => {});
  socket.on("offer", () => {});
  socket.on("answer", () => {});

  return (
    <Box height="100vh">
      <Box display={stream ? "none" : "flex"} alignItems="center" justifyContent="center" mt={3}>
        <TextField placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button onClick={() => handleVideoCall()}> Call</Button>
      </Box>
      {stream ? <video ref={videoRef} autoPlay style={{ width: "100%", height: "100vh" }} /> : ""}
    </Box>
  );
};

export default webcam;
