import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const DEFAULT_STYLES = {
  width: "100px",
  height: "100px",
  display: "block",
};

interface ScreenshotConfigProps {
  /**
   * Use true to enable screenshot features
   */
  screenshot?: boolean;
  /**
   * Use to override screenshot button styles
   */
  screenshotButtonStyles?: React.CSSProperties;
  /**
   * Use to override screenshot default text 'Tirar Foto'
   */
  screenshotButtonText?: string;
  screenshotButtonProps?: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "type" | "style"
  >;
}

type WebCamPropTypes = {
  /**
   * Use true when audio is required, false by default
   */
  useAudio?: boolean;
  /**
   * Common css styles to override webcam container styles
   */
  styles?: React.CSSProperties;
  /**
   * Screenshot Config Props
   */
  SSConfig?: ScreenshotConfigProps;
};

const WebCam: React.FC<WebCamPropTypes> = ({
  styles,
  useAudio = false,
  SSConfig,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState<string | null>(null);

  const handleTakeSS = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() as string;
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Webcam
        ref={webcamRef}
        style={styles || DEFAULT_STYLES}
        screenshotFormat="image/jpeg"
        audio={useAudio}
      />
      {SSConfig?.screenshot && (
        <button
          {...SSConfig.screenshotButtonProps}
          onClick={handleTakeSS}
          type="button"
          style={{
            ...SSConfig.screenshotButtonStyles,
            width: SSConfig.screenshotButtonStyles?.width || "200px",
          }}
        >
          {SSConfig.screenshotButtonText || "Tirar Foto"}
        </button>
      )}
      {img && (
        <img
          src={img}
          alt="webcam screenshot"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  );
};

export default WebCam;
