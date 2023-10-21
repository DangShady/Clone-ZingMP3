import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Songitem } from './'
const NewRelea = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActived, setIsActived] = useState(0)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (newRelease) {
            if (isActived === 0) {
                setSongs(newRelease?.items?.vPop || []);
            } else {
                setSongs(newRelease?.items?.others || []);
            }
        }
    }, [isActived, newRelease]);

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
                <span className='text-xs'>
                    TẤT CẢ
                </span>
            </div>
            <div className='flex items-center gap-5 text-xs'>
                <button type='button'
                    onClick={() => setIsActived(0)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-100 bg-transparent ${isActived === 0 && 'bg-red-400 text-white'}`}>
                    VIỆT NAM
                </button>

                <button type='button'
                    onClick={() => setIsActived(1)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-500 bg-transparent ${isActived === 1 && 'bg-red-400 text-white'}`}>
                    QUỐC TẾ
                </button>

            </div>
            <div className='flex flex-wrap w-full'>
                {songs.slice(0, 12).map(item => (
                    <Songitem key={item.encodeId}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        artists={item.artistsNames}
                        releaseDate={item.releaseDate}
                        sid={item.encodeId}
                    />
                ))}
            </div>
        </div>

    )
}

export default NewRelea