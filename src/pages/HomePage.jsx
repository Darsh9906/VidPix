import React from 'react'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useSelector } from 'react-redux'
import ExploreFeed from '../components/ExploreFeed'

const HomePage = () => {

    const { query } = useSelector((store) => store.search)


    return (
        <div>

            <SearchBar />


            {query === '' ? (<ExploreFeed />
            ) : (
                <>
                    <Tabs />
                    <ResultGrid />
                </>
            )}

        </div>
    )
}

export default HomePage