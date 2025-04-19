import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MusicType } from "../../../redux/state/desainundangan/desainUndanganSlice"
import DesainUndanganItem from "./DesainUndanganItem"
import music from "../../../assets/sounds/Christina_Perri_A_Thousand_Years.mp3"
import musicTwo from "../../../assets/sounds/Michael_Learns_To_Rock - Paint_My Love.mp3"
import SearchableDropdown from "../../join/SearchableDropdown"
import { useAudio } from "../../../hooks/Audio/useAudio"
import { useDropzone } from "react-dropzone"
import { storage } from "../../../firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { UserAuth } from "../../../context/AuthContext"
import { DesainUndanganAuth } from "../../../context/DesainUndanganContext"

type MusikItemType = {
    musikItemData: Partial<MusicType>
    setMusikItemData: React.Dispatch<React.SetStateAction<Partial<MusicType>>>
}

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
    const audio = new Audio(val);
    audio.loop = true;
    audio.autoplay = false;
    return audio
}

// const audio = new Audio(music);
// audio.loop = true;
// audio.autoplay = false;

// const playMusic = () => {
//   audio.play();
// };

// const pauseMusic = () => {
//   audio.pause();
// };
const Content = () => {
    const { musikItemData, setMusikItemData } = DesainUndanganAuth()
    const songList = [
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
    const [value, setValue] = useState()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [firebaseSong, setFirebaseSong] = useState<string>("")
    // let firebaseSong = "https://firebasestorage.googleapis.com/v0/b/harijadikita-f1f3e.appspot.com/o/Music%2FSongs%2FqJUmPdwJxYYtv06bBXu5kmj0xVq1?alt=media&token=f5fa248e-621d-4848-bf89-569e7d6c0cec"
    let userSong = useRef(new Audio(firebaseSong));
    const testMusic = useMemo(() => {
        const au = audioSelection(value == "A Thousand Years" ? music : musicTwo)
        return au
    }, [value])

    const playMusic = () => {
        testMusic.play();
    };

    const pauseMusic = () => {
        testMusic.pause();
    };
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


    useEffect(() => {
        if (value) {
            console.log(value)
            setMusikItemData(prev => {
                return {
                    ...prev,
                    chosenSong: value == "A Thousand Years" ? 1 : 2
                }
            })
        }
        if (isPlaying) {
            console.log('play')
            playMusic();
            return;
        }
        if (!isPlaying) {
            console.log('stop')
            pauseMusic();
            return
        }
    }, [isPlaying, value])
    const { user } = UserAuth()
    const [loading, setLoading] = useState(false)
    const [songFile, setSongFile] = useState<string | ArrayBuffer | null | undefined>()
    const [fileName, setFileName] = useState('')
    const storageRef = ref(storage, `${"Music"}/Songs/${user.uid}`)

    const uploadSong = async () => {
        setLoading(true)
        try {
            uploadString(storageRef, `${songFile}`, 'data_url').then((snapshot) => {
                return getDownloadURL(snapshot.ref)
            }).then(downloadURL => {
                console.log(downloadURL)
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
            console.log(file)
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
                        options={songList}
                        label="name"
                        id="id"
                        selectedVal={value}
                        handleChange={(val: any) => setValue(val)}
                        isRinPerPage={true}
                        objectName="Lagu"
                    />
                    <button
                        className="playBtn"
                        onClick={() => {
                            setIsPlaying(!isPlaying);

                        }}
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>
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