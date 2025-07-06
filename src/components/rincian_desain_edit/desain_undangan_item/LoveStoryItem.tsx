import { useState } from 'react'
import { DesainUndanganAuth } from '../../../context/DesainUndanganContext'
import { StoryType } from '../../../redux/state/desainundangan/desainUndanganSlice'
import DesainUndanganItem from './DesainUndanganItem'
import UploadGambarSection from './UploadGambarSection'

const INITIATE_DATA = {
    id: 1,
    title: "",
    story: "",
    storyImage: {
        id: 0,
        imageUrl: ""
    }
}
type StoryItemProps = StoryType & {
    data: StoryType[],
    setData: (data: StoryType[]) => void
    handleInputChange: (newData: StoryType[]) => void
}

const LoveStoryItem = () => {
    const { loveStoryItemData, setLoveStoryItemData } = DesainUndanganAuth()
    const onToggle = () => {
        setLoveStoryItemData(prev => {
            return {
                ...prev,
                isActive: !prev?.isActive
            }
        })
    }
    return (
        <DesainUndanganItem
            title="Love story"
            children={<Content />}
            toggleVal={loveStoryItemData?.isActive}
            onToggle={onToggle}
        />
    )
}

const Content = () => {
    const { loveStoryItemData, setLoveStoryItemData } = DesainUndanganAuth()
    const stories = Array.isArray(loveStoryItemData?.stories) ? loveStoryItemData.stories : []
    const [data, setData] = useState(stories?.length > 0 ? stories : [INITIATE_DATA])
    // Sync context with local state when data changes
    const handleDataChange = (newData: StoryType[]) => {
        setData(newData)
        setLoveStoryItemData(prev => ({
            ...prev,
            stories: newData
        }))
    }
    const handleInputChange = (newData: StoryType[]) => {
        setData(newData)
        setLoveStoryItemData(prev => ({
            ...prev,
            stories: newData
        }))
    }
    const handleAddStory = () => {
        // Find the max id and increment, or use 1 if empty
        const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1
        const newStory = {
            id: newId,
            title: "",
            story: "",
            storyImage: {
                id: 0,
                imageUrl: ""
            }
        }
        const newData = [...data, newStory]
        setData(newData)
        setLoveStoryItemData(prev => ({
            ...prev,
            stories: newData
        }))
    }
    return (
        <div className="content_wrapper">
            {
                data.map((item, i) => (
                    <StoryItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        story={item.story}
                        storyImage={item.storyImage}
                        data={data}
                        setData={handleDataChange}
                        handleInputChange={handleInputChange}
                    />
                ))
            }
            <button
                type="button"
                id="submitBtn"
                className="add_story_btn"
                onClick={handleAddStory}
            >
                Tambah cerita
            </button>
        </div>
    )
}
const StoryItem = ({ id, title, story, storyImage, data, setData, handleInputChange }: StoryItemProps) => {
    const { setLoveStoryItemData } = DesainUndanganAuth()
    const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, story: e.target.value } : item
        )
        setData(newData)
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, title: e.target.value } : item
        )
        handleInputChange(newData)
    }
    const onImageChange = (imageUrl: string) => {
        const newData = data.map(item =>
            item.id === id
                ? { ...item, storyImage: { ...item.storyImage, imageUrl } }
                : item
        )
        setData(newData)
    }
    const updateDeleteImageField = (deletedId: number | undefined) => {
        setLoveStoryItemData(prevItems => ({
            ...prevItems,
            stories: prevItems?.stories?.filter(item => item.id !== deletedId)
        }))
    }

    return (
        <>
            <label className="label_input">Judul</label>
            <input
                type="text"
                placeholder="Bertemu saat kuliah"
                value={title}
                onChange={handleTitleChange} />
            <label className="label_input">Cerita</label>
            <textarea id="w3review"
                name="w3review"
                rows={6}
                cols={50}
                className='large_input_area'
                value={story}
                onChange={handleStoryChange} />
            <UploadGambarSection
                titleLable="Gambar atau Foto (opsional)"
                onImageChange={onImageChange}
                sectionFolder="LoveStory"
                photoUrl={storyImage?.imageUrl}
                updateDeleteImageField={updateDeleteImageField}
            />
        </>
    )
}
export default LoveStoryItem