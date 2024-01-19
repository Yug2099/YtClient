// reducers/dashboard.js
const initialState = {
    userVideos: null,
    // Add other relevant state properties for the dashboard
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_VIDEOS':
            return {
                ...state,
                userVideos: action.payload,
            };
        // Add other cases as needed
        default:
            return state;
    }
};

export default dashboardReducer;
// actions/dashboard.js
export const fetchUserVideosSuccess = (videos) => ({
    type: 'FETCH_USER_VIDEOS',
    payload: videos,
});

// Add other actions as needed
