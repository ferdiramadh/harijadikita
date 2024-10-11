import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadString, deleteObject } from "firebase/storage"
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
   
    const storageRef = ref(storage, `${sectionFolder}/Images/${user.uid}`)
    // console.log(user.uid)
    const uploadImage = async () => {
        setLoading(true)
        try {
            uploadString(storageRef, `${image}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {

                setImageUrl(downloadURL)
                setLoading(false)
                alert('Gambar berhasil diunggah.')
                return downloadURL
            })
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    const deleteImage = async () => {
        let text = "Gambar akan dihapus. Anda yakin?"
        if (window.confirm(text) == true) {
            await deleteObject(storageRef).then((snapshot) => {
                setImageUrl("")
                onImageChange("")
                alert('gambar berhasil dihapus')
            }).catch((error) => {
                alert(error.message)
            })
        } else {
          alert("Dibatalkan")
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
    console.log(acceptedFiles[0])
    const onImageChangeX = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            // setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    useEffect(() => {
        if (image) {
            onImageChange(imageUrl)
        }

    }, [imageUrl])

    return (
        <>
            <label className="label_input">{titleLable}</label>
            {
                imageUrl ?
                    <div style={{ marginTop: 10 }}>
                        <img src={`${imageUrl}`} style={{ width: '100%', }}
                            alt={titleLable} />
                        <div className="editSection">
                            <div className="buttons">
                                <button className="deleteBtn" onClick={deleteImage}>Hapus</button>
                                <div className="editWrapper">
                                    <div {...getRootProps()} className="drag_drop">
                                        <label className="custom-file-upload">
                                            <input {...getInputProps()}
                                                type="file"
                                                className="drag_drop_input"
                                                accept="image/jpg, image/png, image/jpeg"
                                            />
                                            Ubah
                                        </label>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    :
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
                    <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {
                            loading ? <p>Menunggah gambar...</p>
                                :
                                <>
                                    <p>Nama file: </p>
                                    <p>{name.length > 10 ? name.slice(0, 10) + "..." : name}</p>
                                    <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button onClick={uploadImage} className="uploadBtn" >upload</button>
                                        <button onClick={() => setImage('')} className="removeBtn">remove</button>
                                    </div>
                                </>
                        }
                    </div> :
                    null
            }

        </>
    )
}

export default UploadGambarSection