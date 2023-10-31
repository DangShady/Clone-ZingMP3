import React, { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sectionitem from './Sectionitem'
const Section = ({ data }) => {

    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()

    const [maxItemsToShow, setMaxItemsToShow] = useState(window.innerWidth < 840 ? 2 : 3);
    const isScreenSmall = window.innerWidth < 640;

    useEffect(() => {
        const handleResize = () => {
            if (!isScreenSmall) {
                setMaxItemsToShow(window.innerWidth < 840 ? 2 : 3);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isScreenSmall]);
    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{data?.title}</h3>
                <span className='text-xs'>
                    TẤT CẢ
                </span>
            </div>
            <div className='flex items-start  justify-between gap-[28px]'>
                {data?.items?.length > 0 && data.items.filter((item, index) => index <= maxItemsToShow)?.map(item => (
                    <Sectionitem
                        key={item.encodeId}
                        data={item.data}
                        title={item.title}
                        link={item.link}
                        sortDescription={item.sortDescription}
                        thumbnailM={item.thumbnailM}
                    />
                ))}
            </div>


        </div>
    )
}

export default memo(Section)