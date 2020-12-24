import axios from 'axios';
import key from '../key.json';


const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

const params = {
    part: 'snippet',
    maxResult: 40,
    key: key.API_KEY,
    regionCode: 'JP',
    type: 'video',
}

export const fetchPopularData = async () => {
    return await youtube.get('/videos', {
        params: {
            ...params,
            chart: 'mostPopular'
        }
    })
}

export const fetchSelectedData = async (id) => {
    return await youtube.get('videos', {
        params: {
            ...params,
            id
        }
    })
}

export const fetchRelatedData = async (id) => {
    return await youtube.get('/search', {
        params: {
            ...params,
            relatedToVideoId: id
        }
    })
}

export const fetchSearchData = async (query) => {
    return await youtube.get('/search', {
        params: {
            ...params,
            q: query
        }
    })
}