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

const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder, photoUrl, updateDeleteImageField, multiple = false, photoId }: UploadImageType) => {

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
    function setRef(id?: number) {
        return ref(storage, `${sectionFolder}/Images/${user.uid}${"numberId" + id?.toString()}`)
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
    const handleUpload = async () => {
        const titleText = pickImageFile.length > 1 ? "Semua gambar" : "Gambar"
        setLoading(true)
        let uploadedImages: ImageType[] = []
        const promises = pickImageFile.map((img) => {
            const storageRef = setRef(img.id)
            const uploadTask = uploadBytesResumable(storageRef, img.imageUrl)

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        setPickImageFile((prev) => {
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
                setPickImageFile([]) // Allow new uploads after success
                // Append all new images in order
                if (sectionFolder == "Gallery") {
                    setImageUrls((prev) => [...prev, ...uploadedImages])
                } else {
                    setImageUrls(uploadedImages)
                }

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
                    onImageChange(imageUrls[i]?.imageUrl, imageUrls[i]?.id)
                }
            } else {
                onImageChange(imageUrls)
            }

            removeMatchingItems()
        }

    }, [imageUrls])

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
                            if (item.imageUrl)
                                return (
                                    <UploadParts key={i} id={item.id} imgUrl={item.imageUrl} deleteImage={deleteImage} altImage={altImage} />
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
}

const UploadParts = ({ id, imgUrl, deleteImage, altImage }: UploadPartsType) => {

    return (
        <div style={{ marginTop: 10 }}>
            <label className="label_input">{altImage}</label>
            <img
                src={imgUrl} style={{ width: '100%', marginTop: 10 }}
                alt={altImage} />
            <div className="editSection">
                <div className="buttons">
                    <button className="deleteBtn" onClick={() => deleteImage(id)}>Hapus</button>
                </div>

            </div>
        </div>
    )
}

export default UploadGambarSection