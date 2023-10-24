import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Player, SidebarLeft, SidebarRight, Header } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    return (
        <div className='w-full relative h-screen flex flex-col bg-[#CED9D9]'>
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] h-full flex-none border border-blue-500'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto border flex flex-col border-red-500'>
                    <div className='h-[70px] flex-none px-[59px] flex items-center'>
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && <div className='w-[299px] hidden 1600:flex flex-none border border-green-500 animate-slide-left'>
                    <SidebarRight />
                </div>}
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    )
}

export default Public