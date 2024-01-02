import * as api from "../api";


export const fetchAllChannel = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllChannel();
        dispatch({ type: 'FETCH_CHANNELS', payload: data })
    } catch (error) {
        console.error('Error fetching channels:', error.message);
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        }
    }
}
export const updateChannelDate = (id, updateData) => async (dispatch) => {
    try {
        const { data } = await api.updateChannelData(id, updateData);
        dispatch({ type: 'UPDATE_DATA', payload: data })
    } catch (error) {
        console.log(error)
    }
}