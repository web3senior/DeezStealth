import { Title } from './helper/DocumentTitle'
import styles from './Sender.module.scss'
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV"];

export default function Sender({ title }) {
  Title(title)
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>

          <div className="card__body">
          <h1>Hello To Drag & Drop Files</h1>
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
        </div>
          </div>
      </div>
    </section>
  )
}