import { useEffect, useMemo, useRef, useState } from "react"
import { MusicType } from "../../../redux/state/desainundangan/desainUndanganSlice"
import DesainUndanganItem from "./DesainUndanganItem"
import music from "../../../assets/sounds/Christina_Perri_A_Thousand_Years.mp3"
import musicTwo from "../../../assets/sounds/Michael_Learns_To_Rock - Paint_My Love.mp3"
import SearchableDropdown from "../../join/SearchableDropdown"
import { useAudio } from "../../../hooks/Audio/useAudio"

type MusikItemType = {
    musikItemData: Partial<MusicType>
    setMusikItemData: React.Dispatch<React.SetStateAction<Partial<MusicType>>>
}

const MusikItem = ({ musikItemData, setMusikItemData }: MusikItemType) => {
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
            children={<Content musikItemData={musikItemData} setMusikItemData={setMusikItemData} />}
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
const Content = ({ musikItemData, setMusikItemData }: MusikItemType) => {
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
        console.log(value)
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

    }, [isPlaying])
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
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={musikItemData?.spotifyMusicSelection} onChange={spotifyMusic} />
                <p>Pakai musik dari Spotify</p>
            </div>
            {
                musikItemData?.spotifyMusicSelection &&
                <>
                    <label className="label_input">Musik via tautan Spotify</label>
                    <input type="text" placeholder="Masukkan link Spotify" />
                </>

            }
            <div className="radioBtnWrapper">
                <input className='radioBtn' type="radio" checked={musikItemData?.userMusicSelection} onChange={userMusic} />
                <p>Pakai musik kamu sendiri</p>
            </div>
        </div>
    )
}

export default MusikItem