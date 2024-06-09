import TopSection from "../TopSection"
import { useMemo, useState } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import React from "react"
import { FormDataType, UserAuth } from "../../context/AuthContext"

type PlacesAutoCompleteType = {
    setSelected: React.Dispatch<React.SetStateAction<LatLngType | null>>
    placeholder: string
    isAkad: boolean
}

type LatLngType = {
    lat: number
    lng: number
}

const RinPer7LokasiPage = () => {
    const [addReception, setAddReception] = useState<boolean>(false)
    const locAd = `*Lokasi terhubung dengan Google Maps, jika lokasi tidak ditemukan, kamu bisa masukkan lintang dan bujur:`

    return (
        <>
            <TopSection title="Lokasi Pernikahan" tagline="Masukkan lokasi akad dan resepsi pernikahan kamu." locAd={locAd} />
            {
                !addReception && <AddReception />
            }
            {
                addReception &&

                <div className='form_container'>
                    <input placeholder="Cari lokasi akad" type="text" />
                    <input placeholder="Cari lokasi resepsi" type="text" />
                </div>
            }
            {/* {isLoaded && <Map/>} */}
        </>
    )
}

const AddReception = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        libraries: ["places"]
    })
    //For Marker Point Map - Not implemented yet
    const [selected, setSelected] = useState<LatLngType | null>(null)
    return (
        <div className='form_container'>
            <div className="title">
                <h1 className="reception_title">Akad</h1>
            </div>
            <div className="title">
                {
                    isLoaded && <PlacesAutoComplete setSelected={setSelected} placeholder="Cari lokasi akad" isAkad={true} />
                }
            </div>

            {/* <input placeholder="Cari lokasi akad" type="text" value={lokasiAkad} onChange={e => updateRincianPernikahan({ lokasiAkad: e.target.value })} /> */}
            <div className="title">
                <h1 className="reception_title">Resepsi</h1>
            </div>
            <div className="title">
                {
                    isLoaded && <PlacesAutoComplete setSelected={setSelected} placeholder="Cari lokasi resepsi" isAkad={false} />
                }
            </div>
            {/* <input placeholder="Cari lokasi resepsi" type="text" value={lokasiResepsi} onChange={e => updateRincianPernikahan({ lokasiResepsi: e.target.value })} /> */}
            {/* <input placeholder="Cari lokasi resepsi ke-2" type="text" /> */}
        </div>
    )
}

const PlacesAutoComplete = ({ setSelected, placeholder, isAkad }: PlacesAutoCompleteType) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete()
    const { setData } = UserAuth()
    function updateData(field: Partial<FormDataType>) {
        setData(prev => {
            return { ...prev, ...field }
        })
    }
    const propKey = isAkad ? "lokasiAkad" : "lokasiResepsi"
    const handleSelect = async (address: string) => {
        try {
            setValue(address, false)
            updateData({ [propKey]: address })
            clearSuggestions()

            const results = await getGeocode({ address })
            console.log({ results })
            const { lat, lng } = await getLatLng(results[0])
            setSelected({ lat, lng })
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="place_input">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder={placeholder}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} style={{ fontFamily: 'Inter' }} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
export default RinPer7LokasiPage