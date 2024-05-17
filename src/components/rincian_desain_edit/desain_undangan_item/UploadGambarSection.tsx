import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

type UploadImageType = {
    titleLable: string
}

const UploadGambarSection = ({titleLable} : UploadImageType) => {

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        const file = new FileReader
        file.onload = function () {
            console.log(file.result)
        }
        file.readAsDataURL(acceptedFiles[0])
    }, [])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
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