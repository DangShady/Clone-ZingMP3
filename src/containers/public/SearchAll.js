import React from 'react'
import { useSelector } from 'react-redux'
import { hanleNumber } from '../../ultis/fn'
import { Songitem, List, Sectionitem } from '../../components'

const SearchAll = () => {

    const { searchData } = useSelector(state => state.music)
    console.log(searchData)
    return (
        <div className='w-full flex flex-col px-[60px] gap-[60px]'>
            <div>
                <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
                <div className='flex gap-8'>
                    {searchData?.top && <div className='p-[10px] cursor-pointer flex-1 bg-main-200 rounded-md flex gap-8 items-center'>
                        <img src={searchData.top.thumbnail} alt='avatar' className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && `rounded-full`}`} />
                        <div className='flex flex-col text-xs'>
                            <span className='mb-[6px]'>{searchData.top.objectType === 'artist' ? 'nghệ sĩ' : ''}</span>
                            <span className='text-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>
                            {searchData.top.objectType === 'artist' && <span>{hanleNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>}
                        </div>
                    </div>}
                    {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
                        <div className='flex-1 bg-main-200 flex items-center rounded-md'>
                            <Songitem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                sid={item.encodeId}
                                title={item.title}
                                artists={item.artistsNames}
                                size='w-[84px] h-[84px] rounded-md'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Bài Hát</h3>
                <div className='flex gap-8'>
                    <div className='flex justify-between flex-wrap w-full'>
                        {searchData?.songs?.map((item, index) => (
                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`}>
                                <List songData={item} isHideAlbum />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>PLAYLIST/ALBUM</h3>
                <div className='flex gap-8'>
                    <div className='flex items-start justify-between gap-[28px]'>
                        {searchData?.playlists?.filter((i, index) => index <= 4)?.map((item) => (
                            <Sectionitem
                                key={item.encodeId}
                                title={item.title}
                                link={item.link}
                                sortDescription={item.sortDescription}
                                thumbnailM={item.thumbnailM} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAll