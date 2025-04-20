import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadString, deleteObject, StorageReference, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { UserAuth } from "../../../context/AuthContext"
import { updateDataCollection } from "../../../database/Functions"
import { DESAIN_UNDANGAN } from "../../../database/Collections"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { setDesainUndangan } from "../../../redux/state/desainundangan/desainUndanganSlice"
import { error } from "console"

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
}

const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder, photoUrl = [], updateDeleteImageField, multiple = false }: UploadImageType) => {
    const initiateData = {
        id: 1,
        name: "",
        imageUrl: photoUrl ? photoUrl : ""
    }
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [pickImageFile, setPickImageFile] = useState<ImageType[]>([])
    // const [imageUrl, setImageUrl] = useState(Array.isArray(photoUrl) ? photoUrl : [initiateData])
    const [imageUrls, setImageUrls] = useState(Array.isArray(photoUrl) ? photoUrl : [initiateData])
    const [urls, setUrls] = useState<string[]>([]);
    console.log(sectionFolder, "sectionFolder")
    // console.log({ imageUrls })
    console.log(imageUrls[0]?.imageUrl)
    const [progress, setProgress] = useState(0);
    const [downloadURLs, setDownloadURLs] = useState<any>([])
    const buttonText = pickImageFile.length > 1 ? "unggah semua" : "unggah"
    function setRef(id?: number) {
        const photoId = id ? id : 1
        return ref(storage, `${sectionFolder}/Images/${user.uid}${"numberId" + photoId?.toString()}`)
    }
    const uploadImage = async (val: string | ArrayBuffer | null | undefined, id: number) => {
        setLoading(true)
        try {
            uploadString(setRef(id), `${val}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            })
            // .then(downloadURL => {
            //     console.log(downloadURL)
            //     setImageUrl(downloadURL)
            //     setImage([])
            //     // setFileName('')
            //     setLoading(false)
            //     if (downloadURL) {
            //         alert('Gambar berhasil diunggah.')
            //         return downloadURL
            //     }
            //     return
            // })
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }

    const deleteImage = async (id: number) => {
        console.log(photoUrl)
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

                alert('Gambar berhasil dihapus dari data anda.')
            }).catch((error) => {
                alert(error.message)
            })
        } else {
            alert("Dibatalkan")
        }

    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // let data: any = []
        acceptedFiles.map((file, i) => {
            // setFileName(file.name)
            const reader = new FileReader()

            reader.onload = function (e: ProgressEvent<FileReader>) {
                let img = e.target?.result
                if (e.target?.result instanceof ArrayBuffer) {
                    const bytes = new Uint8Array(e.target.result);
                    // console.log(bytes);
                    setPickImageFile((prev) => [...prev, {
                        id: i + 1,
                        name: file.name,
                        imageUrl: bytes
                    }])
                }
                // const bytes = img?.split('base64,')[1];

                // const item = {
                //     id: i + 1,
                //     name: file.name,
                //     imageUrl: img
                // }
                // data.push(item)

            }
            // console.log(data)
            reader.readAsArrayBuffer(file)
            return
        })

        // setImage(data)
    }, [])
    const { getRootProps, getInputProps, isDragActive, } = useDropzone({
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

    // let name = acceptedFiles[0]?.name
    // console.log(fileName)
    const onImageChangeX = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            // setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const removeItem = (id: number) => {
        setPickImageFile((prevItems) => prevItems.filter((item) => item.id !== id))
    }
    const handleUpload = async () => {
        // for (let i = 0; i < image.length; i++) {
        //     const storageRef = setRef(image[i].id);
        //     const result = await uploadString(storageRef, image[i].imageUrl, 'data_url')
        //         .then((snapshot) => {
        //             return getDownloadURL(snapshot.ref)
        //         })
        //         .then((downloadURL) => {

        //             console.log(downloadURL)
        //             console.log(`${image[i].name} success`)
        //             removeItem(image[i].id)
        //             setImageUrls((prev) => [...prev, {
        //                 id: image[i].id,
        //                 name: image[i].name,
        //                 imageUrl: downloadURL
        //             }])
        //         })
        //         .catch((error) => {
        //             console.log(`${image[i].name} ${error.message}`)
        //         })
        //     console.log(result)
        // }

        setLoading(true)
        const promises = pickImageFile.map((img) => {
            const storageRef = setRef(img.id)
            console.log(img.id)
            const uploadTask = uploadBytesResumable(storageRef, img.imageUrl)

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Progress function
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log(`Upload is ${progress}% done`)
                    },
                    (error) => {
                        // Error function
                        console.log(error)
                        reject(error)
                    },
                    async () => {
                        // Complete function
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        console.log({ downloadURL })
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
                alert("Semua gambar berhasil diunggah.")
            })
            .catch((error) => {
                setLoading(false)
                console.error("Error uploading images: ", error)
            })
    }

    const removeMatchingItems = () => {
        setPickImageFile((prevItems) =>
            prevItems.filter((item) =>
                !imageUrls.some((removeItem) => removeItem.id === item.id)
            )
        );
    };

    // useEffect(() => {
    //     if (imageUrl) {
    //         console.log(imageUrl)
    //         onImageChange(imageUrl)
    //     }

    // }, [imageUrl])

    useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            console.log(imageUrls)
            if (sectionFolder !== "Gallery") {
                console.log('bukan gallery')
                console.log(imageUrls)
                for (let i = 0; i < imageUrls.length; i++) {
                    console.log(imageUrls[i].imageUrl)
                }
                onImageChange(imageUrls[0]?.imageUrl, imageUrls[0]?.id)
            } else {
                onImageChange(imageUrls)
            }

            removeMatchingItems()
        }

    }, [imageUrls])
    // useEffect(() => {
    //     if (sectionFolder == "Gallery") {
    //         console.log(imageUrls)
    //     }

    // }, [])

    return (
        <>
            <button onClick={() => {
            console.log(imageUrls)
            console.log(pickImageFile.length > 0)
            console.log(pickImageFile)
            console.log(photoUrl)
            console.log((imageUrls[0]?.imageUrl == "" || imageUrls.length == 0))
        }} className="uploadBtn" >{buttonText}</button>
            {
                (imageUrls.length > 0) || imageUrls[0]?.imageUrl ?
                    // <div style={{ marginTop: 10 }}>
                    //     <img
                    //         src={"https://images.pexels.com/photos/951408/pexels-photo-951408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} style={{ width: '100%' }}
                    //         alt={titleLable} />
                    //     <div className="editSection">
                    //         <div className="buttons">
                    //             <button className="deleteBtn" onClick={deleteImage}>Hapus</button>
                    //             <div className="editWrapper">
                    //                 <div {...getRootProps()} className="drag_drop">
                    //                     <label className="custom-file-upload">
                    //                         <input {...getInputProps()}
                    //                             type="file"
                    //                             className="drag_drop_input"
                    //                             accept="image/jpg, image/png, image/jpeg"
                    //                         />
                    //                         Ubah
                    //                     </label>
                    //                 </div>
                    //             </div>

                    //         </div>

                    //     </div>
                    // </div>
                    imageUrls.map((item, i) => {
                        console.log(item)
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
                    // <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    //     {
                    //         loading ? <p>Menunggah gambar...</p>
                    //             :
                    //             <>
                    //                 <p>Nama file: </p>
                    //                 <p>{fileName.length > 10 ? fileName.slice(0, 10) + "..." : fileName}</p>
                    //                 <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                    //                     <button onClick={uploadImage} className="uploadBtn" >unggah</button>
                    //                     <button onClick={cancel} className="removeBtn">batal</button>
                    //                 </div>
                    //             </>
                    //     }
                    // </div>
                    pickImageFile.map((item, i) => {
                        // console.log(typeof item.imageUrl)
                        return (
                            <Unggah key={i} item={item} cancel={removeItem} setRef={setRef} setImageUrls={setImageUrls} />
                        )
                    })
                    :
                    null
            }
            {/* {
                image.length > 0 && <button onClick={() => uploadImage(image[0].imageUrl,image[0].id)} className="uploadBtn" >{buttonText}</button>
            } */}
            {
                pickImageFile.length > 0 && <button onClick={handleUpload} className="uploadBtn" >{buttonText}</button>
            }
        </>
    )
}

type UnggahType = {
    item: ImageType
    cancel: (id: number) => void
    setRef(id?: number): StorageReference
    setImageUrls: React.Dispatch<React.SetStateAction<ImageType[]>>
}

const Unggah = ({ item, cancel, setRef, setImageUrls }: UnggahType) => {
    const { name, id } = item
    const [loading, setLoading] = useState(false)
    // const uploadImageTest = async (val: string | ArrayBuffer | null | undefined, id: number) => {
    //     setLoading(true)
    //     try {
    //         uploadString(setRef(id), `${val}`, 'data_url').then((snapshot) => {
    //             return getDownloadURL(snapshot.ref)
    //         }).then(downloadURL => {
    //             console.log(downloadURL)
    //             // setImageUrl(downloadURL)
    //             // setImage([])
    //             // setFileName('')
    //             setLoading(false)
    //             if (downloadURL) {
    //                 setImageUrls((prev) => [...prev, {
    //                     id,
    //                     name,
    //                     imageUrl: downloadURL
    //                 }])
    //                 alert('Gambar berhasil diunggah.')
    //                 return downloadURL
    //             }
    //             return
    //         })
    //     } catch (error) {
    //         setLoading(false)
    //         alert(error)
    //     }
    // }
    return (
        <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {
                loading ? <p>Menunggah gambar...</p>
                    :
                    <>
                        <p>Nama file: </p>
                        <p>{name.length > 10 ? name.slice(0, 12) + "..." : name}</p>
                        <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <button onClick={() => uploadImageTest(imageUrl, id)} className="uploadBtn" >unggah</button> */}
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
                    <button className="deleteBtn" onClick={() => {
                        console.log(id)
                        deleteImage(id)
                    }}>Hapus</button>
                    {/* <div className="editWrapper">
                        <div className="drag_drop">
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    className="drag_drop_input"
                                    accept="image/jpg, image/png, image/jpeg"
                                />
                                Ubah
                            </label>
                        </div>
                    </div> */}

                </div>

            </div>
        </div>
    )
}

export default UploadGambarSection