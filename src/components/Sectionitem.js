import React, { memo, useState , useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../ultis/icons';

const {AiOutlineHeart , BsFillPlayFill,BsThreeDots } = icons
const Sectionitem = ({link , title, data, thumbnailM, sortDescription, artistsNames}) => {
    const navigate = useNavigate()
    const imageRef = useRef()
    const [isHover, setIsHover] = useState(false)
    const handleHover = () => {
        setIsHover(true)
        console.log(imageRef.current)
        imageRef.current?.classList?.remove('animate-scale-down-image');
        imageRef.current?.classList?.add('animate-scale-up-image');
    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current?.classList?.add('animate-scale-down-image');
        imageRef.current?.classList?.remove('animate-scale-up-image');
    }
  return (
     <div
                    
                        onClick={() => {

                            navigate(link?.split('.')[0])

                        }}
                        className='flex flex-col gap-2 flex-auto justify-start w-1/5 text-sm cursor-pointer'
                    >
                        <div onMouseEnter={handleHover}
                         onMouseLeave={handleLeave}
                          className='w-full relative overflow-hidden rounded-lg'>
                           {isHover &&  <div className='absolute top-0 bottom-0 z-40 left-0 right-0 bg-overlay-30 rounded-lg text-white items-center flex justify-center gap-3'>
                            <span> <AiOutlineHeart size={24}/> </span>
                            <span className='p-1 border border-white rounded-full'> <BsFillPlayFill size={35}/></span>
                            <span> <BsThreeDots size={24}/></span>
                            </div>}
                        <img ref={imageRef} src={thumbnailM} alt='avatar' className='w-full h-auto rounded-lg' />
                        </div>
                        
                        <span className='flex flex-col'>
                            <span className='font-semibold'>{title?.length >= 28 ? `${title?.slice(0, 28)}...` : title}</span>
                            {data?.sectionId === 'h100'
                                ? <span>{artistsNames}</span>
                                : <span>{sortDescription?.length >= 40
                                    ? `${sortDescription?.slice(0, 40)}...`
                                    : sortDescription}</span>}

                        </span>
                    </div>
  )
}

export default memo(Sectionitem)