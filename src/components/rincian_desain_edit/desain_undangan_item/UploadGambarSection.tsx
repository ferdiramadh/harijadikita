import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { storage } from "../../../firebase"
import { getDownloadURL, ref, deleteObject, uploadBytesResumable } from "firebase/storage"
import { UserAuth } from "../../../context/AuthContext"

type UploadImageType = {
    titleLable: string
    onImageChange: any
    sectionFolder?: string
    photoUrl?: string | ArrayBuffer | null | undefined | any[]
    updateDeleteImageField: (deletedId?: number | undefined) => void
    multiple?: boolean
}

type ImageType = {
    id: number
    name: string
    imageUrl: any
    progress?: number
}

const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder, photoUrl = [], updateDeleteImageField, multiple = false }: UploadImageType) => {
    const initiateData = {
        id: 1,
        name: "",
        imageUrl: photoUrl ? photoUrl : ""
    }
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [pickImageFile, setPickImageFile] = useState<ImageType[]>([])
    const [imageUrls, setImageUrls] = useState(Array.isArray(photoUrl) ? photoUrl : [initiateData])
    const buttonText = pickImageFile.length > 1 ? "unggah semua" : "unggah"
    function setRef(id?: number) {
        const photoId = id ? id : 1
        return ref(storage, `${sectionFolder}/Images/${user.uid}${"numberId" + photoId?.toString()}`)
    }

    const deleteImage = async (id: number) => {
        let text = "Gambar akan dihapus. Anda yakin?"
        if (window.confirm(text) == true) {
            await deleteObject(setRef(id)).then((snapshot) => {

                if (sectionFolder !== "Gallery") {
                    setImageUrls([])
                    updateDeleteImageField()
                } else {
                    setImageUrls((prevItems) =>
                        prevItems.filter(item => item.id !== id)
                    );
                    updateDeleteImageField(id)
                }

                setTimeout(() => {
                    alert('Gambar berhasil dihapus dari data anda.')
                }, 500)
            }).catch((error) => {
                alert(error.message)
            })
        } else {
            alert("Dibatalkan")
        }

    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.map((file, i) => {
            const reader = new FileReader()
            reader.onload = function (e: ProgressEvent<FileReader>) {
                let img = e.target?.result
                if (e.target?.result instanceof ArrayBuffer) {
                    const bytes = new Uint8Array(e.target.result);
                    setPickImageFile((prev) => [...prev, {
                        id: i + 1,
                        name: file.name,
                        imageUrl: bytes,
                        progress: 0
                    }])
                }
            }
            reader.readAsArrayBuffer(file)
            return
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: multiple,
        onDropRejected: (val) => {
            const error = val[0].errors
            alert(error[0].message)
        }
    })

    const removeItem = (id: number) => {
        setPickImageFile((prevItems) => prevItems.filter((item) => item.id !== id))
    }
    const handleUpload = async () => {
        const titleText = pickImageFile.length > 1 ? "Semua gambar" : "Gambar"
        setLoading(true)
        const promises = pickImageFile.map((img) => {
            const storageRef = setRef(img.id)
            const uploadTask = uploadBytesResumable(storageRef, img.imageUrl)

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Progress function
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        setPickImageFile((prev) => {
                            const updatedItems = prev.map((item) => {
                                if (item.id === img.id) {
                                    return { ...item, progress: progress }
                                }
                                return item
                            })
                            return updatedItems
                        }
                        )
                    },
                    (error) => {
                        // Error function
                        alert(error)
                        reject(error)
                    },
                    async () => {
                        // Complete function
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        removeItem(img.id)
                        if (sectionFolder !== "Gallery") {
                            setImageUrls([{
                                id: img.id,
                                name: img.name,
                                imageUrl: downloadURL
                            }])
                        } else {
                            setImageUrls((prev) => [...prev, {
                                id: img.id,
                                name: img.name,
                                imageUrl: downloadURL
                            }])
                        }

                        resolve(downloadURL)
                    }
                )
            })
        })
        Promise.all(promises)
            .then(() => {
                setLoading(false)
                setPickImageFile([])
                alert(`${titleText} berhasil diunggah.`)
            })
            .catch((error) => {
                setLoading(false)
                alert(error.message)
            })
    }

    const removeMatchingItems = () => {
        setPickImageFile((prevItems) =>
            prevItems.filter((item) =>
                !imageUrls.some((removeItem) => removeItem.id === item.id)
            )
        );
    };

    useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            if (sectionFolder !== "Gallery") {
                for (let i = 0; i < imageUrls.length; i++) {
                }
                onImageChange(imageUrls[0]?.imageUrl, imageUrls[0]?.id)
            } else {
                onImageChange(imageUrls)
            }

            removeMatchingItems()
        }

    }, [imageUrls])

    return (


        <>
            {
                (imageUrls.length > 0) || imageUrls[0]?.imageUrl ?
                    imageUrls.map((item, i) => {
                        if (item.imageUrl)
                            return (
                                <UploadParts key={i} id={item.id} imgUrl={item.imageUrl} deleteImage={deleteImage} />
                            )
                    })
                    :
                    <label className="label_input">{titleLable}</label>
            }
            {
                ((pickImageFile.length == 0) && (imageUrls[0]?.imageUrl == "" || imageUrls.length == 0)) || (imageUrls[0]?.imageUrl == "" && (pickImageFile.length == 0)) ?
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
                    </div> : null
            }
            {
                pickImageFile.length > 0 ?
                    pickImageFile.map((item, i) => {
                        return (
                            <Unggah key={i} item={item} cancel={removeItem} loading={loading} />
                        )
                    })
                    :
                    null
            }
            {
                pickImageFile.length > 0 && <button onClick={handleUpload} className="uploadBtn" >{buttonText}</button>
            }
        </>
    )
}

type UnggahType = {
    item: ImageType
    cancel: (id: number) => void
    loading: boolean
}

const Unggah = ({ item, cancel, loading }: UnggahType) => {

    const { name, id, progress } = item
    return (
        <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {
                loading ?
                    <>
                        <p>Menunggah gambar...</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </>
                    :
                    <>
                        <p>Nama file: </p>
                        <p>{name.length > 10 ? name.slice(0, 12) + "..." : name}</p>
                        <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => cancel(id)} className="removeBtn">batal</button>
                        </div>
                    </>
            }
        </div>
    )
}

type UploadPartsType = {
    id: number
    imgUrl: any
    deleteImage: (id: any) => Promise<void>
}

const UploadParts = ({ id, imgUrl, deleteImage }: UploadPartsType) => {

    return (
        <div style={{ marginTop: 10 }}>
            <img
                src={imgUrl} style={{ width: '100%' }}
                alt={"titleLable"} />
            <div className="editSection">
                <div className="buttons">
                    <button className="deleteBtn" onClick={() => deleteImage(id)}>Hapus</button>
                </div>

            </div>
        </div>
    )
}

export default UploadGambarSection