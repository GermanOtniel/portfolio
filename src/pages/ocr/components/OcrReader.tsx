import { useRef, useState } from "react";
import { MainButton } from "../../../components/shared";
import { useThemeContext } from "../../../context/themeContext/Theme.Context";
import { createWorker } from "tesseract.js";
import { Avatar, Col, Grid, IconButton, Loader, Panel, Row } from "rsuite";
import { Image } from "@rsuite/icons";

const OcrReader = () => {
  const refFile = useRef<HTMLInputElement | null>(null);
  const { theme, } = useThemeContext();
  const [fileName, setFileName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    handleOCR(url);
  };

  const handleOCR = async (image: string) => {
    try {
      setLoading(true);
      const worker = await createWorker({
        logger: m => console.log(m)
      });
      
      await worker.loadLanguage('spa');
      await worker.initialize('spa');
      const { data: { text } } = await worker.recognize(image);
      if (text.trim() === "") {
        setOcrText("Inténtalo otra vez...");
      } else {
        setOcrText(text);
      }
      
      await worker.terminate();
    } catch (error) {
      setOcrText("Reconocimiento falló...");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (imageKey: string) => {

  };

  return (
    <>
      <div className='table-toolbar' style={{ display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "end", gap: 8, padding: "20px 20px 5px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="/images/example-image-ocr.png" download="example-image-ocr.png">
            <IconButton
              as="div"
              style={{ opacity: .5 }} 
              icon={<Image />} 
            />
          </a>
          <MainButton
            theme={theme} 
            appearance="ghost" 
            onClick={() => refFile.current?.click()}
          >
            Cargar Imagen
          </MainButton>
        </div>
        <p style={{ fontSize: "10px", fontWeight: "light" }}>{fileName}</p>
      </div>
      <div className='custom-table-container' style={{ overflow: "scroll" }}>
        <input 
          ref={refFile} 
          type="file" 
          style={{ display: "none" }} 
          accept="image/*" 
          onChange={handleFileUpload} 
        />

        <Grid fluid>
          <Row>
            {selectedImage && (
              <Col xs={24} sm={24} md={12} style={{ marginBottom: "15px" }}>
                <Panel header="Imagen:" bordered>
                  <img style={{ width: "100%" }} src={selectedImage} />
                </Panel>
              </Col>
            )}
            <Col xs={24} sm={24} md={12} style={{ marginBottom: "15px" }}>
              {loading && (
                <div style={{ width: "100%", minHeight: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Loader backdrop content="Reconociendo..." vertical />
                </div>
              )}
              {(!loading && ocrText) && (
                <Panel header="Texto:" bordered>
                  {ocrText}
                </Panel>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default OcrReader;