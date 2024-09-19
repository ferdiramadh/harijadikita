import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { storage } from "../../../firebase"
import { getBytes, getDownloadURL, ref, uploadString } from "firebase/storage"
import { UserAuth } from "../../../context/AuthContext"

type UploadImageType = {
    titleLable: string
    onImageChange: (value: string | ArrayBuffer | null | undefined) => void
    sectionFolder?: string
    photoUrl?: string | ArrayBuffer | null | undefined
}

const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder, photoUrl = "" }: UploadImageType) => {

    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<string | ArrayBuffer | null | undefined>()
    const [imageUrl, setImageUrl] = useState(photoUrl)
    const [count, setCount] = useState(0)
    const storageRef = ref(storage, `${sectionFolder}/Images/${user.uid}`)
    const uploadImage = async () => {
        setLoading(true)
        try {
            uploadString(storageRef, `${image}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {

                setImageUrl(downloadURL)
                return downloadURL
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader()

            reader.onload = function (e) {
                let img = e.target?.result
                setImage(img)
            }

            reader.readAsDataURL(file)
            return file
        })
    }, [])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false
    })

    let name = acceptedFiles[0]?.name

    useEffect(() => {
        if (image) {
            onImageChange(imageUrl)
        }

    }, [imageUrl])

    return (
        <>
            <label className="label_input">{titleLable}</label>
            {
                imageUrl ? <div style={{ marginTop: 10 }}>
                    <img src={`${imageUrl}`} style={{ width: '100%', }}
                    ></img>
                </div> :
                    null
            }
            {
                (image == undefined || image == "") && photoUrl == "" &&
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
            }
            {
                name && image !== "" && photoUrl == "" ?
                    <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'space-around' }}>
                        <p>Nama file: </p>
                        <p>{name.length > 10 ? name.slice(0, 10) + "..." : name}</p>
                        <button onClick={uploadImage} className="uploadBtn" disabled={loading}>upload</button>
                        <button onClick={() => setImage('')} className="removeBtn">remove</button>
                    </div> :
                    null
            }

        </>
    )
}

export default UploadGambarSection