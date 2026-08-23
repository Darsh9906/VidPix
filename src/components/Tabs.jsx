import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabs } from '../redux/features/searchSlice';

const Tabs = () => {
  const tabs = ['photos', 'videos', 'gif'];

  const dispatch = useDispatch();

  const activeTab = useSelector(
    (state) => state.search.activeTab
  );

  return (
    <div className="flex gap-3 px-5 py-7 sm:px-8">
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => dispatch(setActiveTabs(tab))}
            className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              uppercase
              transition
              active:scale-95
              ${
                active
                  ? 'bg-green-700 text-white ring-2 ring-white'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;