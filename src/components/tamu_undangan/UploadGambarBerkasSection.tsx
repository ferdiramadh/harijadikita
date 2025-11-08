import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'

type UploadGambarBerkasSectionType = {
    section: string
    formatFile: string
}

export default function UploadGambarBerkasSection({ section, formatFile }: UploadGambarBerkasSectionType) {
    const onDrop = useCallback((acceptedFiles: File[]) => {

        acceptedFiles.forEach((file, i) => {
            const reader = new FileReader()
            reader.onload = function (e: ProgressEvent<FileReader>) {
                // if (e.target?.result instanceof ArrayBuffer) {
                //     const bytes = new Uint8Array(e.target.result)
                //     setPickImageFile((prev) => [
                //         ...prev,
                //         {
                //             id: Date.now() + i, // Use unique id
                //             name: file.name,
                //             imageUrl: bytes,
                //             progress: 0,
                //         },
                //     ])
                // }
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
    return (
        <div className='upload-gambar-berkas-container'>
            <h1>Upload <span className='bold'>{section}</span> untuk WhatsApp Broadcast</h1>
            <div {...getRootProps()} className="drag_drop">
                <FiUploadCloud size={40} color="#667085" />
                <p>Pilih berkas atau tarik dan lepas di sini</p>
                <p>{formatFile}</p>
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
}
