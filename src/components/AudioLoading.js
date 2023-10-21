import React, { memo } from 'react'
import { Audio } from 'react-loader-spinner'

const AudioLoading = () => {
    return (
        <Audio
            height="30"
            width="30"
            color="#E7ECEC"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default memo(AudioLoading)