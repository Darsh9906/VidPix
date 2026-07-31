import React from 'react'
import { setActiveTabs } from '../redux/features/searchSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Tabs = () => {

    const tabs = ['photos', 'videos', 'gif']

    const dispatch = useDispatch();

    const activeTab = useSelector((state)=>state.search.activeTab)

    return (
        <div className='flex gap-10 p-10'>
            {tabs.map((elem, idx) => {
                return (
                    <button
                        onClick={() => {
                            dispatch(setActiveTabs(elem))
                        }}
                        className={`${(activeTab==elem?'bg-blue-700':'bg-gray-500')} transition px-5 py-2 rounded uppercase cursor-pointer active:scale-95`}
                        key={idx}>
                        {elem}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs