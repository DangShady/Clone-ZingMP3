import React, { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux'
import { Songitem } from './'
import { apiGetDetaiPlaylist } from '../apis'
import { Scrollbars } from 'react-custom-scrollbars-2';

const { ImBin } = icons
const SidebarRight = () => {

    const [isRecent, setIsRecent] = useState(false)
    const [playlist, setPlaylist] = useState()
    const { curSongData, curAlbumId, isPlaying } = useSelector(state => state.music)

    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetaiPlaylist(curAlbumId)
        console.log(response)
        if (response.data?.err === 0) setPlaylist(response.data.data?.song?.items)
    }
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist()
    }, [curAlbumId, isPlaying])


    return (
        <div className='flex flex-col text-xs w-full h-full'>
            <div className='h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'>
                <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
                    <span onClick={() => setIsRecent(prev => !prev)} className={`py-[5px] ${!isRecent && `bg-main-100`} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}>Danh sách phát</span>
                    <span onClick={() => setIsRecent(prev => !prev)} className={`py-[5px]  ${isRecent && `bg-main-100`} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}>Nghe gần đây</span>
                </div>
                <span className='p-2 rounded-full cursor-pointer hover:bg-main-100'><ImBin size={14} /></span>
            </div>
            <div className='w-full flex-col flex-auto flex px-2 text-white'>
                <Scrollbars autoHide style={{ height: '100%', width: '100%' }}>
                    <Songitem
                        thumbnail={curSongData?.thumbnail}
                        title={curSongData?.title}
                        artists={curSongData?.artistsNames}
                        sid={curSongData?.encodeId}
                        order='items-center  bg-main-500'
                        size='h-[40px] w-[40px] '
                        percent
                    />
                    <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
                        <span className=' text-sm font-bold'>Tự động phát</span>

                        <span className='opacity-70 text-xs'>Gợi ý từ nội dung đang phát</span>
                    </div>
                    {playlist && <div className='flex flex-auto flex-col'>

                        {playlist?.map(item => (
                            <Songitem
                                key={item.encodeId}
                                thumbnail={item?.thumbnail}
                                title={item?.title}
                                artists={item?.artistsNames}
                                sid={item?.encodeId}
                                order='text-black items-center'
                                size='h-[40px] w-[40px] '
                                percent
                            />
                        ))}
                    </div>}
                </Scrollbars>
            </div>
        </div>
    )
}

export default SidebarRight