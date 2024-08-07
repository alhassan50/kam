'use client'

import { selectisSideBarOpened } from "@/app/redux/slices/sideBarSlice";
import { useSelector } from "react-redux";

export const EmptySideBar = () => {
    const isSideBarOpened = useSelector(selectisSideBarOpened);

    return (
        <div className={`${isSideBarOpened ? 'w-[250px]' : 'w-[0px] lg:w-[85px]'} h-[calc(100vh-53px)] width-transition hidden lg:block`}></div>
    );
};

export default EmptySideBar