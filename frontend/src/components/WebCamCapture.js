import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = ({ onLogin }) => {
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureSnapshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    try {
      const response = await axios.post("/api/uploadImage", {
        image: imageSrc,
      });
      console.log("Image uploaded successfully:", response.data);
      // Once image is uploaded, proceed with login
      onLogin();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Webcam Capture</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true}
        width={640}
        height={480}
        screenshotFormat="image/jpeg"
      />
      <button onClick={captureSnapshot}>Capture Snapshot</button>
      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
