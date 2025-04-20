import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import DesainUndanganItem from "./DesainUndanganItem"
import music from "../../../assets/sounds/Christina_Perri_A_Thousand_Years.mp3"
import musicTwo from "../../../assets/sounds/Michael_Learns_To_Rock - Paint_My Love.mp3"
import SearchableDropdown from "../../join/SearchableDropdown"
import { useDropzone } from "react-dropzone"
import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { UserAuth } from "../../../context/AuthContext"
import { DesainUndanganAuth } from "../../../context/DesainUndanganContext"

const SONGLIST = [
    {
        id: 1,
        song: music,
        name: "A Thousand Years"
    },
    {
        id: 2,
        song: musicTwo,
        name: "Paint of My Life"
    }
]

const MusikItem = () => {

    const { musikItemData, setMusikItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setMusikItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }

    return (
        <DesainUndanganItem
            title="Musik"
            children={<Content />}
            onToggle={onToggle}
            toggleVal={musikItemData?.isActive}
        />
    )
}

const audioSelection = (val: string) => {
    const audio = new Audio(val)
    audio.loop = true
    audio.autoplay = false
    return audio
}

const Content = () => {

    const { musikItemData, setMusikItemData } = DesainUndanganAuth()
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [songFile, setSongFile] = useState<string | ArrayBuffer | null | undefined>()
    const [fileName, setFileName] = useState('')
    const storageRef = ref(storage, `${"Music"}/Songs/${user.uid}`)
    const [value, setValue] = useState()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [firebaseSong, setFirebaseSong] = useState<string>("")
    let userSong = useRef(new Audio(firebaseSong))
    const selectedSong = useMemo(() => {
        const au = audioSelection(value == "A Thousand Years" ? music : musicTwo)
        return au
    }, [value])

    const playMusic = () => {
        selectedSong.play()
    }

    const pauseMusic = () => {
        selectedSong.pause()
    }
    const ourMusic = () => {
        setMusikItemData(prev => {
            return {
                ...prev,
                ourMusicSelection: true,
                spotifyMusicSelection: false,
                userMusicSelection: false
            }
        })
    }
    const spotifyMusic = () => {
        setMusikItemData(prev => {
            return {
                ...prev,
                ourMusicSelection: false,
                spotifyMusicSelection: true,
                userMusicSelection: false
            }
        })
    }
    const userMusic = () => {
        setMusikItemData(prev => {
            return {
                ...prev,
                ourMusicSelection: false,
                spotifyMusicSelection: false,
                userMusicSelection: true
            }
        })
    }

    const uploadSong = async () => {
        setLoading(true)
        try {
            uploadString(storageRef, `${songFile}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {
                setFirebaseSong(downloadURL)
                setFileName('')
                setSongFile('')
                setLoading(false)
                if (downloadURL) {
                    alert('File berhasil diunggah.')
                    return downloadURL
                }
                return
            })
        } catch (error) {
            setLoading(false)
            alert(error)
        }
    }
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.map((file) => {
            setFileName(file.name)
            const reader = new FileReader()

            reader.onload = function (e) {
                let song = e.target?.result
                setSongFile(song)
            }

            reader.readAsDataURL(file)
            return file
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive, } = useDropzone({
        onDrop,
        accept: {
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
            "audio/webm": [".webm"],
            "audio/flac": [".flac"],
            "audio/x-m4a": [".m4a"],
        },
        multiple: false,
        onDropRejected: (val) => {
            const error = val[0].errors
            alert(error[0].message)
        }
    })


    useEffect(() => {
        if (value) {
            setMusikItemData(prev => {
                return {
                    ...prev,
                    chosenSong: value == "A Thousand Years" ? 1 : 2
                }
            })
        }
        if (isPlaying) {
            playMusic()
            return
        }
        if (!isPlaying) {
            pauseMusic()
            return
        }
    }, [isPlaying, value])

    return (
        <div className="content_wrapper">
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={musikItemData?.ourMusicSelection} onChange={ourMusic} />
                <p>Pilih musik pilihan dari harijadikita</p>
            </div>
            {
                musikItemData?.ourMusicSelection &&
                <>
                    <SearchableDropdown
                        options={SONGLIST}
                        label="name"
                        id="id"
                        selectedVal={value}
                        handleChange={(val: any) => setValue(val)}
                        isRinPerPage={true}
                        objectName="Lagu"
                    />
                    {
                        value
                        &&
                        <button
                            className="playBtn"
                            onClick={() => {
                                setIsPlaying(!isPlaying)

                            }}
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    }

                </>

            }
            {/* <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={musikItemData?.spotifyMusicSelection} onChange={spotifyMusic} />
                <p>Pakai musik dari Spotify</p>
            </div>
            {
                musikItemData?.spotifyMusicSelection &&
                <>
                    <label className="label_input">Musik via tautan Spotify</label>
                    <input type="text" placeholder="Masukkan link Spotify" />
                </>

            } */}
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={musikItemData?.userMusicSelection} onChange={userMusic} />
                <p>Pakai musik kamu sendiri</p>
            </div>
            {
                musikItemData?.userMusicSelection &&
                <>
                    <p>{fileName.length > 10 ? fileName.slice(0, 20) + "..." : fileName}</p>
                    <div className="editSection">
                        <div className="buttons">

                            {
                                fileName ?
                                    <button
                                        // className="deleteBtn"
                                        onClick={uploadSong}
                                        disabled={loading}
                                    >{loading ? "Mengunggah.." : "Upload"}</button> :
                                    <div className="editWrapper">
                                        <div {...getRootProps()} className="drag_drop">
                                            <label className="custom-file-upload">
                                                <input {...getInputProps()}
                                                    type="file"
                                                    className="drag_drop_input"
                                                    accept="image/jpg, image/png, image/jpeg"
                                                />
                                                Pilih file
                                            </label>
                                        </div>
                                    </div>
                            }



                        </div>

                    </div>
                    <audio src={firebaseSong} ref={userSong} loop />
                    {
                        firebaseSong
                        &&
                        <>
                            <button className="deleteBtn" onClick={() => userSong.current.play()}>Play</button>
                            <button className="deleteBtn" onClick={() => userSong.current.pause()}>Pause</button>
                        </>}
                </>

            }

        </div>
    )
}

export default MusikItem