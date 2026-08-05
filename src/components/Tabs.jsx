import React from 'react'
import { setActiveTabs } from '../redux/features/searchSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Tabs = () => {

    const tabs = ['photos', 'videos', 'gif']

    const dispatch = useDispatch();

    const activeTab = useSelector((state)=>state.search.activeTab)

    return (
        <div className='flex gap-7 px-8 py-7'>
            {tabs.map((elem, idx) => {
                return (
                    <button
                        onClick={() => {
                            dispatch(setActiveTabs(elem))
                        }}
                        className={`${(activeTab==elem?'bg-green-900 ':'bg-gray-700 hover:bg-green-900')} transition px-5 py-2 rounded uppercase cursor-pointer active:scale-95`}
                        key={idx}>
                        {elem}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs