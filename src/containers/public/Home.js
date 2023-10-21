import React, { useEffect } from 'react'
import { Slider, Section, NewRelea } from '../../components'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Home = () => {
    const { chill, popularArtist, top100, loveFile, mood } = useSelector(state => state.app)

    return (
        <div className='overflow-y-auto w-full'>

            <Slider />
            <Section data={chill} />
            <Section data={loveFile} />
            <NewRelea />
            <Section data={mood} />
            <Section data={popularArtist} />
            <Section data={top100} />
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home