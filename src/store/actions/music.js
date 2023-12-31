import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})
export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})
export const setPlayList = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})
export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})
export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})
export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response.data.data
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}