import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { storage } from "../../../firebase"
import { ref, uploadString } from "firebase/storage"

type UploadImageType = {
    titleLable: string
    onImageChange: (value: string | ArrayBuffer | null | undefined) => void
}

const UploadGambarSection = ({ titleLable, onImageChange }: UploadImageType) => {

    const [image, setImage] = useState<string | ArrayBuffer | null | undefined>()
    const [count, setCount] = useState(0)
    const storageRef = ref(storage, `Sampul/Images/${count}`)
    const uploadImage = async () => {
        try {
            uploadString(storageRef, `${image}`, 'data_url').then((snapshot) => {

                console.log(snapshot);
              });
              
        } catch (error) {
            
        }
    }
    const onDrop = useCallback((acceptedFiles:File[]) => {
        acceptedFiles.map((file) => {
          const reader = new FileReader();
    
          reader.onload = function (e) {
            let img = e.target?.result
            setImage(img)
          };
    
          reader.readAsDataURL(file);
          return file;
        });
      }, []);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', 'jpeg'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false
    })
    useEffect(() => {
        if(image) {
            onImageChange(image)
        }
    }, [image])
    if(image) return  <div style={{paddingBottom: 150}}>
        <h3>{count}</h3>
    <img src={`${image}`} style={{width: '100%', }}
    ></img>
    <button onClick={uploadImage}>upload</button>
    <button onClick={() => setImage('')}>remove</button>
    <button onClick={() => setCount(prev => prev + 1)}>add count</button>
    </div>
    return (
        <>
            <label className="label_input">{titleLable}</label>
            <div className="upload_image_section">
                <div {...getRootProps()} className="drag_drop">
                    <FiUploadCloud size={40} color="#667085" />
                    <p>Pilih berkas atau tarik dan lepas di sini</p>
                    <p>JPG, JPEG, PNG, ukuran berkas tidak lebih dari 10MB</p>
                    <label className="custom-file-upload">
                        <input {...getInputProps()}
                            type="file"
                            className="drag_drop_input"
                            accept="image/jpg, image/png, image/jpeg"
                        />
                        Pilih berkas
                    </label>

                </div>
            </div>
        </>
    )
}

export default UploadGambarSection