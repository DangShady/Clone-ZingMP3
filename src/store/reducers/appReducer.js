import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    chill: {},
    popularArtist: {},
    top100: {},
    loveFile: {},
    mood: {},
    newRelease: {}

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
            }

        default:
            return state
    }
}

export default appReducer