import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    chill: {},
    popularArtist: {},
    top100: {},
    loveFile: {},
    mood: {},
    newRelease: {},
    weekChart: [],
    remix: {},
    albumHot: {},

}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                popularArtist: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                loveFile: action.homeData?.find(item => item.sectionId === 'hEditorTheme2') || {},
                mood: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                remix: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                albumHot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
            }

        default:
            return state
    }
}

export default appReducer