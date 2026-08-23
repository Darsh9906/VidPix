import React from 'react';
import { setActiveTabs } from '../redux/features/searchSlice';
import { useSelector, useDispatch } from 'react-redux';

const Tabs = () => {
  const tabs = ['photos', 'videos', 'gif'];

  const dispatch = useDispatch();

  const activeTab = useSelector(
    (state) => state.search.activeTab
  );

  return (
    <div className="flex gap-7 px-8 py-7">
      {tabs.map((elem) => (
        <button
          key={elem}
          onClick={() => dispatch(setActiveTabs(elem))}
          className={`cursor-pointer rounded-full px-5 py-2 uppercase transition active:scale-95 ${
            activeTab === elem
              ? 'bg-green-800'
              : 'bg-[#212121d8] hover:bg-green-800'
          }`}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default Tabs;