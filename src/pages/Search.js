import React, {useEffect, useContext} from 'react'
import Layout from '../components/Layout/Layout'
import { useLocation } from  'react-router-dom';
import { fetchSearchData} from '../apis';
import { Store } from '../store/'
import VideoGrid from '../components/VideoGrid/VideoGrid'
import VideoGridItem from '../components/VideoGrid/VideoGridItem/VideoGridItem'

const Search = () => {
    const { globalState, setGlobalState } = useContext(Store);
    const location = useLocation();
    const setSearchResult = async() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        if(query) {
            await fetchSearchData(query).then((res) => {
                setGlobalState({type: 'SET_SEARCHED', payload: {searched: res.data.items}})
            })
        }
    }
    useEffect(() => {
        setSearchResult();
    },[location.search])
    return (
        <Layout>
            <VideoGrid>
                {
                    globalState.searched ? globalState.searched.map((searched)=> {
                        return (
                            <VideoGridItem
                                id={searched.id.videoId}
                                key={searched.id.videoId}
                                src={searched.snippet.thumbnails.medium.url}
                                title={searched.snippet.title}
                            />
                        )
                    }) : <span>no data</span>
                }
            </VideoGrid>
        </Layout>
    )
} 

export default Search
