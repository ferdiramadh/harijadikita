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
    onImageChange: (value: string | ArrayBuffer | null | undefined) => void
    sectionFolder?: string
    photoUrl?: string | ArrayBuffer | null | undefined
    updateDeleteImageField: () => void
    multiple?: boolean
}

type ImageType = {
    id: number
    name: string
    fileImage: any
}

const UploadGambarSection = ({ titleLable, onImageChange, sectionFolder, photoUrl = "", updateDeleteImageField, multiple = false }: UploadImageType) => {
    console.log(sectionFolder)
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState<ImageType[]>([])
    const [imageUrl, setImageUrl] = useState(photoUrl)
    const [imageUrls, setImageUrls] = useState<ImageType[]>([])
    const [urls, setUrls] = useState<string[]>([]);
    // const [fileName, setFileName] = useState('')
    // const storageRef = ref(storage, `${sectionFolder}/Images/${user.uid}${multiple}`)
    const [progress, setProgress] = useState(0);
    const [downloadURLs, setDownloadURLs] = useState<any>([])
    const buttonText = image.length > 1 ? "unggah semua" : "unggah"
    function setRef(id?: number) {
        return ref(storage, `${sectionFolder}/Images/${user.uid}${"numberId" + id?.toString()}`)
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

    const deleteImage = async () => {
        console.log(photoUrl)
        let text = "Gambar akan dihapus. Anda yakin?"
        if (window.confirm(text) == true) {
            await deleteObject(setRef()).then((snapshot) => {
                setImageUrl("")
                updateDeleteImageField()
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

            reader.onload = function (e) {
                let img = e.target?.result
                setImage((prev) => [...prev, {
                    id: i + 1,
                    name: file.name,
                    fileImage: img
                }])
                // const item = {
                //     id: i + 1,
                //     name: file.name,
                //     fileImage: img
                // }
                // data.push(item)

            }
            // console.log(data)
            reader.readAsDataURL(file)
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
        setImage((prevItems) => prevItems.filter((item) => item.id !== id))
    }
    const handleUpload = async () => {
        for (let i = 0; i < image.length; i++) {
            const storageRef = setRef(image[i].id);
            const result = await uploadString(storageRef, image[i].fileImage, 'data_url')
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref)
                })
                .then((downloadURL) => {

                    console.log(downloadURL)
                    console.log(`${image[i].name} success`)
                    removeItem(image[i].id)
                    setImageUrls((prev) => [...prev, {
                        id: image[i].id,
                        name: image[i].name,
                        fileImage: downloadURL
                    }])
                })
                .catch((error) => {
                    console.log(`${image[i].name} ${error.message}`)
                })
            console.log(result)
        }

        // if (image.length === 0) return alert("Please select images");

        // const promises: any = [];

        // image.forEach((img) => {
        //     // const test =  uploadImage(img.fileImage, img.id)
        //     // console.log(test)
        //     // promises.push(test)
        //     const storageRef = setRef(img.id);
        //     const uploadTask = uploadString(storageRef, img.fileImage);
        //     // uploadTask.then((snapshot) => {
        //     //     const downloadURL = getDownloadURL(snapshot.ref);
        //     //     console.log(downloadURL)
        //     //     promises.push(downloadURL)
        //     // }).catch((error) => console.log(error))
        //     // try {

        //     // } catch (error) {

        //     // }
        //     // const uploadTask = uploadBytesResumable(storageRef, img.fileImage);

        //     // promises.push(
        //     //     new Promise((resolve, reject) => {
        //     //         async () => {
        //     //             const downloadURL = await getDownloadURL(snapshot.ref);
        //     //             console.log({downloadURL})
        //     //             resolve(downloadURL);
        //     //         }

        //     //     })
        //     // );
        // });

        // Promise.all(promises)
        //     .then((urls) => {
        //         setDownloadURLs(urls);
        //         alert("All images uploaded successfully!");
        //     })
        //     .catch((error) => console.error("Error uploading images: ", error));
    }
    const cancel = (id: number) => {
        removeItem(id)
        // setFileName("")
    }
    const removeMatchingItems = () => {
        setImage((prevItems) =>
            prevItems.filter((item) =>
                !imageUrls.some((removeItem) => removeItem.id === item.id)
            )
        );
    };

    useEffect(() => {
        if (imageUrl) {
            onImageChange(imageUrl)
        }

    }, [imageUrl])

    useEffect(() => {
        if (imageUrls) {
            // removeMatchingItems()
        }

    }, [imageUrls])
    useEffect(() => {
        if (downloadURLs) {
            console.log(downloadURLs)
        }

    }, [downloadURLs])
    return (
        <>
            <label className="label_input">{titleLable}</label>
            {
                imageUrls ?
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
                        return (
                            <UploadParts key={i} imgUrl={item.fileImage} />
                        )
                    })
                    :
                    <label className="label_input">Upload untuk mengubah gambar</label>
            }
            {
                (image.length == 0) && photoUrl == "" &&
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
                image.length > 0 ?
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
                    image.map((item, i) => {
                        // console.log(typeof item.fileImage)
                        return (
                            <Unggah key={i} item={item} cancel={cancel} setRef={setRef} setImageUrls={setImageUrls} />
                        )
                    })
                    :
                    null
            }
            {/* {
                image.length > 0 && <button onClick={() => uploadImage(image[0].fileImage,image[0].id)} className="uploadBtn" >{buttonText}</button>
            } */}
            {
                image.length > 0 && <button onClick={handleUpload} className="uploadBtn" >{buttonText}</button>
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
    const uploadImageTest = async (val: string | ArrayBuffer | null | undefined, id: number) => {
        setLoading(true)
        try {
            uploadString(setRef(id), `${val}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {
                console.log(downloadURL)
                // setImageUrl(downloadURL)
                // setImage([])
                // setFileName('')
                setLoading(false)
                if (downloadURL) {
                    setImageUrls((prev) => [...prev, {
                        id,
                        name,
                        fileImage: downloadURL
                    }])
                    alert('Gambar berhasil diunggah.')
                    return downloadURL
                }
                return
            })
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    return (
        <div style={{ marginTop: 20, width: '100%', flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {
                loading ? <p>Menunggah gambar...</p>
                    :
                    <>
                        <p>Nama file: </p>
                        <p>{name.length > 10 ? name.slice(0, 12) + "..." : name}</p>
                        <div style={{ marginLeft: 10, width: '50%', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <button onClick={() => uploadImageTest(fileImage, id)} className="uploadBtn" >unggah</button> */}
                            <button onClick={() => cancel(id)} className="removeBtn">batal</button>
                        </div>
                    </>
            }
        </div>
    )
}
type UploadPartsType = {
    imgUrl: any
}

const UploadParts = ({ imgUrl }: UploadPartsType) => {

    return (
        <div style={{ marginTop: 10 }}>
            <img
                src={imgUrl} style={{ width: '100%' }}
                alt={'titleLable'} />
            {/* <div className="editSection">
                <div className="buttons">
                    <button className="deleteBtn" onClick={() => null}>Hapus</button>
                    <div className="editWrapper">
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
                    </div>

                </div>

            </div> */}
        </div>
    )
}

export default UploadGambarSection