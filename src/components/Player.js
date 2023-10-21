import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import { toast } from 'react-toastify'
import moment from 'moment'
import { LoadingSong } from './'


const { AiOutlineHeart, AiFillHeart, BsThreeDots, MdSkipNext, MdSkipPrevious, CiRepeat, BsPauseFill, BsFillPlayFill, CiShuffle, LuRepeat1, BsMusicNoteList, LiaVolumeUpSolid, LiaVolumeOffSolid, LiaVolumeDownSolid } = icons
var intervalId
const Player = ({ setIsShowRightSidebar }) => {
    // const audioEl = useRef(new Audio())
    const [audio, setAudio] = useState(new Audio())
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [curSecont, setCurSecont] = useState(0)
    const [isShufle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(0)
    const [isLoadedSoure, setIsLoadedSoure] = useState(true)
    const [volume, setVolume] = useState(100)
    const thumbRef = useRef()
    const trackRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadedSoure(false)
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadedSoure(true)
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSecont(0)
                thumbRef.current.style.cssText = `right: 100`
            }
        }

        fetchDetailSong()
    }, [curSongId])


    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        if (isPlaying) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecont(Math.round(audio.currentTime))
            }, 200)
        }
    }, [audio])

    useEffect(() => {
        const handleEnded = () => {
            if (isShufle) {
                handleShuffle()
            } else if (isRepeat) {
                isRepeat === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShufle, isRepeat])

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume])

    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleAnimationProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        let percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration / 100
        setCurSecont(Math.round(percent * songInfo.duration / 100))
    }

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index

            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index

            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {

        const randomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatOne = () => {
        audio.play()
    }


    return (
        <div className='bg-main-400 px-5 h-full flex'>
            <div className='w-[30%] flex-auto flex gap-3 items-center'>
                <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex items-center justify-center gap-4 flex-col py-2'>
                <div className='flex gap-8 justify-center items-center'>
                    <span className={`${isShufle && 'text-purple-600'}`} title='Bật phát ngẫu nhiên'
                        onClick={() => setIsShuffle(prev => !prev)}><CiShuffle size={24} /></span>
                    <span onClick={handlePrevSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipPrevious size={24} /></span>
                    <span
                        className='p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >
                        {!isLoadedSoure ? <LoadingSong /> : isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}

                    </span>
                    <span onClick={handleNextSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipNext size={24} /></span>
                    <span className={`${isRepeat && 'text-purple-600'} `} title='Bật phát lại tất cả'
                        onClick={() => setIsRepeat(prev => prev === 2 ? 0 : prev + 1)}
                    >
                        {isRepeat === 1 ? <LuRepeat1 size={24} /> : <CiRepeat size={24} />}</span>

                </div>
                <div className='w-full flex items-center justify-center gap-3 text-xs'>
                    <span className=''>{moment.utc(curSecont * 1000).format('mm:ss')}</span>
                    <div ref={trackRef} className='bg-[rgba(0,0,0,0.1)] hover:h-[8px] relative h-[3px] w-3/5 rounded-l-full rounded-r-full cursor-pointer' onClick={handleAnimationProgressBar}>
                        <div ref={thumbRef} id='thumb-progress' className='bg-[#0e8080] absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-aut flex items-center justify-end gap-4'>
                <div className='flex gap-2 items-center'>
                    <span onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}>
                        {+volume >= 50 ? <LiaVolumeUpSolid size={25} /> : +volume === 0 ? <LiaVolumeOffSolid size={25} /> : <LiaVolumeDownSolid size={25} />}
                    </span>
                    <input type='range' step={1} min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
                <span onClick={() => setIsShowRightSidebar(prev => !prev)} className='p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100'><BsMusicNoteList size={24} /></span>
            </div>
        </div >
    )
}

export default Player