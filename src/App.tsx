import WebCam from "./components/WebCam/WebCam";

function App() {
  return (
    <div className="App">
      <h1>Webcam Component</h1>
      <WebCam
        styles={{ width: 200, height: 200 }}
        SSConfig={{
          screenshot: true,
          screenshotButtonText: "Fotografar!",
          screenshotButtonStyles: {
            color: "#000",
            padding: 12,
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "1rem",
            width: 120,
          },
        }}
      />
    </div>
  );
}

export default App;
