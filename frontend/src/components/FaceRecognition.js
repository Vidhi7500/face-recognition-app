import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };

    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      }
    };

    const detectFace = async () => {
      const video = videoRef.current;
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }, 100);
    };

    loadModels().then(startVideo).then(detectFace);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div>
      <h2>Face Recognition</h2>
      <video ref={videoRef} autoPlay muted width="640" height="480"></video>
    </div>
  );
};

export default FaceRecognition;

