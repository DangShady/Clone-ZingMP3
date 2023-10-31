import React from 'react'
import { Slider, Section, NewRelea } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Home = () => {
    const { chill, popularArtist, top100, loveFile, mood, weekChart, remix, albumHot } = useSelector(state => state.app)

    return (
        <div className='overflow-y-auto w-full'>

            <Slider />
            <Section data={chill} />
            <Section data={remix} />
            <NewRelea />
            <Section data={loveFile} />
            <Section data={mood} />
            <Section data={popularArtist} />
            <Section data={top100} />
            <Section data={albumHot} />
            <div className='flex items-center px-[43px] w-full mt-12'>
                {weekChart?.map(item => (
                    <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4'>
                        <img src={item.cover} alt='cover' className='w-full object-cover rounded-md' />
                    </Link>
                ))}
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home