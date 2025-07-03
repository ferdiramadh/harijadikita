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
    photoId?: string | number | undefined
}

type ImageType = {
    id: number
    name: string
    imageUrl: any
    progress?: number
}
function setRef(sectionFolder: string, userId: string, id?: number) {
    return ref(storage, `${sectionFolder}/Images/${userId}${"numberId" + id?.toString()}`)
}
const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder = "", photoUrl, updateDeleteImageField, multiple = false, photoId }: UploadImageType) => {

    const initiateData = {
        id: photoId ? photoId : 0,
        name: "test",
        imageUrl: photoUrl
    }
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [pickImageFile, setPickImageFile] = useState<ImageType[]>([])
    const [imageUrls, setImageUrls] = useState(Array.isArray(photoUrl) ? photoUrl : [initiateData])
    const buttonText = pickImageFile.length > 1 ? "unggah semua" : "unggah"
    const [updateImage, setUpdateImage] = useState<ImageType[]>([])
    const [updateImageUrl, setUpdateImageUrl] = useState<ImageType[]>([])
    const deleteImage = async (id: number) => {
        let text = "Gambar akan dihapus. Anda yakin?"
        if (window.confirm(text) == true) {
            await deleteObject(setRef(sectionFolder, user.uid, id)).then((snapshot) => {

                if (sectionFolder !== "Gallery") {
                    setImageUrls([])
                    setUpdateImageUrl([])
                    updateDeleteImageField()
                } else {
                    setImageUrls((prevItems) =>
                        prevItems.filter(item => item.id !== id)
                    )
                    setUpdateImageUrl((prevItems) =>
                        prevItems.filter(item => item.id !== id)
                    )
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
        // Calculate how many more images can be uploaded
        const maxImages = 10
        const currentCount = imageUrls.length + pickImageFile.length
        const availableSlots = maxImages - currentCount

        if (acceptedFiles.length > availableSlots) {
            alert(`Maksimal ${maxImages} gambar. Anda hanya bisa menambah ${availableSlots} gambar lagi.`)
            return
        }

        acceptedFiles.forEach((file, i) => {
            const reader = new FileReader()
            reader.onload = function (e: ProgressEvent<FileReader>) {
                if (e.target?.result instanceof ArrayBuffer) {
                    const bytes = new Uint8Array(e.target.result)
                    setPickImageFile((prev) => [
                        ...prev,
                        {
                            id: Date.now() + i, // Use unique id
                            name: file.name,
                            imageUrl: bytes,
                            progress: 0,
                        },
                    ])
                }
            }
            reader.readAsArrayBuffer(file)
        })
    }, [imageUrls, pickImageFile])

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
    const prom = (uploadedImages: ImageType[], titleText: string, imageFile: ImageType[], setImageFile: (value: React.SetStateAction<ImageType[]>) => void, setFirebaseUrl: (value: React.SetStateAction<any[]>) => void) => {
        const promises = imageFile.map((img) => {
            const storageRef = setRef(sectionFolder, user.uid, img.id)
            const uploadTask = uploadBytesResumable(storageRef, img.imageUrl)

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        setImageFile((prev) => {
                            const updatedItems = prev.map((item) => {
                                if (item.id === img.id) {
                                    return { ...item, progress: progress }
                                }
                                return item
                            })
                            return updatedItems
                        })
                    },
                    (error) => {
                        alert(error)
                        reject(error)
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        uploadedImages.push({
                            id: img.id,
                            name: img.name,
                            imageUrl: downloadURL,
                        })
                        removeItem(img.id)
                        resolve(downloadURL)
                    }
                )
            })
        })
        Promise.all(promises)
            .then(() => {
                setLoading(false)
                setImageFile([]) // Allow new uploads after success
                // Append all new images in order
                if (sectionFolder == "Gallery") {
                    setFirebaseUrl((prev) => [...prev, ...uploadedImages])
                } else {
                    setFirebaseUrl(uploadedImages)
                }

                alert(`${titleText} berhasil diunggah.`)
            })
            .catch((error) => {
                setLoading(false)
                alert(error.message)
            })
    }
 
    const handleUpload = async () => {
        const titleText = pickImageFile.length > 1 ? "Semua gambar" : "Gambar"
        setLoading(true)
        let uploadedImages: ImageType[] = []
        if (updateImage[0]?.id) {
            prom(uploadedImages, titleText, updateImage, setUpdateImage, setUpdateImageUrl)
        } else {
            prom(uploadedImages, titleText, pickImageFile, setPickImageFile, setImageUrls)
        }

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
                    onImageChange(imageUrls[i]?.imageUrl, imageUrls[i]?.id)
                }
            } else {
                onImageChange(imageUrls)
            }

            removeMatchingItems()
        }
        if (updateImageUrl[0]?.id) {
            if (sectionFolder == "Gallery") {
                setImageUrls(prevItems =>
                    prevItems.map(item => (item.id === updateImageUrl[0]?.id ? updateImageUrl[0] : item))
                );
            }
            else {
                setImageUrls(updateImageUrl)
            }
        }
    }, [imageUrls, updateImageUrl])

    return (
        <>
            {
                // Gallery: allow upload until 10 images
                sectionFolder === "Gallery"
                    ? (imageUrls.length + pickImageFile.length < 10) && (
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
                    )
                    // Non-Gallery: allow upload only if no image and no file picked
                    : ((imageUrls[0]?.imageUrl == "" || imageUrls.length === 0) && pickImageFile.length === 0) && (
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
            {
                pickImageFile.length > 0 ?
                    pickImageFile.map((item, i) => (
                        <Unggah key={i} item={item} cancel={removeItem} loading={loading} />
                    ))
                    : null
            }
            {
                pickImageFile.length > 0 && <button onClick={handleUpload} className="uploadBtn" >{buttonText}</button>
            }
            {
                (imageUrls.length > 0) && imageUrls[0]?.imageUrl !== "" ?
                    imageUrls
                        .filter(Boolean)
                        .map((item, i) => {
                            const altImage = sectionFolder === "Gallery" ? `Gambar ke-${i + 1}` : titleLable
                            const editImage = item.id == updateImage[0]?.id ? updateImage : []
                            const load = item.id == updateImage[0]?.id ? loading : false
                            if (item.imageUrl)
                                return (
                                    <UploadParts
                                        key={i}
                                        id={item.id}
                                        imgUrl={item.imageUrl}
                                        deleteImage={deleteImage}
                                        altImage={altImage}
                                        updateImage={editImage}
                                        setUpdateImage={setUpdateImage}
                                        updateImageUrl={updateImageUrl}
                                        handleUpload={handleUpload}
                                        loading={load}
                                    />
                                )
                        })
                    :
                    null
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
    altImage: string
    updateImageUrl: ImageType[]
    updateImage: ImageType[]
    setUpdateImage: React.Dispatch<React.SetStateAction<ImageType[]>>
    handleUpload: () => Promise<void>
    loading: boolean
}

const UploadParts = ({ id, imgUrl, deleteImage, altImage, updateImage, setUpdateImage, updateImageUrl, handleUpload, loading }: UploadPartsType) => {

    const isUploadedImage = imgUrl.includes("https://firebasestorage.googleapis.com")
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file, i) => {
            const reader = new FileReader()
            reader.onload = function (e: ProgressEvent<FileReader>) {
                if (e.target?.result instanceof ArrayBuffer) {
                    const bytes = new Uint8Array(e.target.result)
                    setUpdateImage((prev) => [
                        {
                            id: id, // Use unique id
                            name: file.name,
                            imageUrl: bytes,
                            progress: 0,
                        },
                    ])
                }
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: false,
        onDropRejected: (val) => {
            const error = val[0].errors
            alert(error[0].message)
        }
    })
    const handleDelete = () => {
        if (isUploadedImage && updateImage.length == 0) {
            deleteImage(id)
        } else {
            setUpdateImage([])
        }
    }
    const removeItem = (id: number) => {
        setUpdateImage((prevItems) => prevItems.filter((item) => item.id !== id))
    }
    // const handleUpload = async () => {
    //     const titleText = updateImage.length > 1 ? "Semua gambar" : "Gambar"
    //     setLoading(true)
    //     let uploadedImages: ImageType[] = []
    //     const promises = updateImage.map((img) => {
    //         const storageRef = setRef(sectionFolder, userId, img.id)
    //         const uploadTask = uploadBytesResumable(storageRef, img.imageUrl)

    //         return new Promise((resolve, reject) => {
    //             uploadTask.on(
    //                 "state_changed",
    //                 (snapshot) => {
    //                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                     setUpdateImage((prev) => {
    //                         const updatedItems = prev.map((item) => {
    //                             if (item.id === img.id) {
    //                                 return { ...item, progress: progress }
    //                             }
    //                             return item
    //                         })
    //                         return updatedItems
    //                     })
    //                 },
    //                 (error) => {
    //                     alert(error)
    //                     reject(error)
    //                 },
    //                 async () => {
    //                     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    //                     uploadedImages.push({
    //                         id: img.id,
    //                         name: img.name,
    //                         imageUrl: downloadURL,
    //                     })
    //                     removeItem(img.id)
    //                     resolve(downloadURL)
    //                 }
    //             )
    //         })
    //     })
    //     Promise.all(promises)
    //         .then(() => {
    //             setLoading(false)
    //             setUpdateImageUrl(uploadedImages)
    //             alert(`${titleText} berhasil diunggah.`)
    //         })
    //         .catch((error) => {
    //             setLoading(false)
    //             alert(error.message)
    //         })
    // }
    return (
        <div style={{
            flex: 1,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8f9fa',
        }}>
            <label className="label_input">{altImage}</label>
            <div style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                flexDirection: updateImage[0]?.imageUrl ? "row" : 'column',
            }}>
                <img
                    src={imgUrl} style={{ width: updateImage[0]?.imageUrl ? "40%" : '100%', marginTop: 10, alignSelf: "flex-start" }}
                    alt={altImage} />

                {
                    updateImage[0]?.imageUrl && !updateImageUrl[0]?.imageUrl ?
                        <>
                            <div className="updateArrow" />
                            <img
                                src={URL.createObjectURL(new Blob([updateImage[0].imageUrl]))} style={{ width: '40%', marginTop: 10, alignSelf: "flex-start" }}
                                alt={altImage} />
                        </>
                        :
                        null
                }
                {/* {
                    updateImageUrl[0]?.imageUrl ?
                        <>
                            <img
                                src={updateImageUrl[0].imageUrl} style={{ width: '100%', marginTop: 10, alignSelf: "flex-start" }}
                                alt={altImage} />
                        </>
                        :
                        null
                } */}
                {/* <img
                    src={updateImage[0]?.imageUrl} style={{ width: '40%', marginTop: 10, alignSelf: "flex-start" }}
                    alt={altImage} /> */}
            </div>
            {
                !updateImage[0]?.imageUrl &&

                <div className="editSection">
                    <div {...getRootProps()} className="buttons">
                        <label className="custom-file-upload">
                            <input {...getInputProps()}
                                type="file"
                                className="drag_drop_input"
                                accept="image/jpg, image/png, image/jpeg"
                            />
                            Edit
                        </label>
                    </div>
                    <div className="buttons">
                        <button className="deleteBtn" onClick={handleDelete}>Hapus</button>
                    </div>
                </div>
            }
            {/* {
                loading ?
                    <>
                        <p>Menunggah gambar...</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${updateImage[0]?.progress}%` }}></div>
                        </div>
                    </>
                    :
                    null
            }
            {
                updateImage[0]?.id ?
                    <>
                        <p>Nama file: </p>
                        <p>{updateImage[0]?.name.length > 10 ? updateImage[0]?.name.slice(0, 12) + "..." : updateImage[0]?.name}</p>
                        <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleDelete} className="removeBtn">batal</button>
                        </div>
                    </>
                    :
                    null
            } */}
            {
                updateImage[0]?.id && <Unggah item={updateImage[0]} cancel={removeItem} loading={loading} />
            }
            {
                updateImage.length > 0 && <button onClick={handleUpload} className="uploadBtn" >Unggah</button>
            }
        </div>
    )
}

export default UploadGambarSection