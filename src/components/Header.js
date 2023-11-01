import React, { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { Search } from './'




const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons

const Header = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    useEffect(() => {
        if (storedIsLoggedIn) {
            setIsMenuVisible(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsMenuVisible(false);
    }
    console.log(storedIsLoggedIn)
    console.log(isMenuVisible)
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-6 text-gray-400'>
                    <span><HiArrowNarrowLeft size={24} /></span>
                    <span><HiArrowNarrowRight size={24} /></span>
                </div>
                <div className='w-1/2'>
                    <Search />
                </div>
            </div>
            <div>
                <div className='flex flex-col'>
                    <div className='w-[40px] relative'>
                        <img
                            src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.85/static/media/user-default.3ff115bb.png'
                            className='rounded-full cursor-pointer'
                            onClick={() => setIsMenuVisible(!isMenuVisible)}
                        />
                        {isMenuVisible && (
                            <div className='items-center justify-center flex rounded-md bg-main-500 absolute w-[350px] h-[170px] right-0 top-12 mt-2 z-50'>
                                <ul className=''>
                                    {storedIsLoggedIn ? (
                                        // Nếu đã đăng nhập, hiển thị "Đăng Xuất" và "Xem Tài Khoản"
                                        <>
                                            <li className='cursor-pointer justify-center flex rounded-full bg-main-300 mb-8 w-[320px] p-3'>
                                                <a href='http://localhost:3000/user'>Xem Thông Tin</a>
                                            </li>
                                            <li onClick={handleLogout} className='cursor-pointer justify-center w-[320px] rounded-full bg-main-300  p-3 flex'>
                                                Đăng Xuất
                                            </li>

                                        </>
                                    ) : (
                                        // Nếu chưa đăng nhập, hiển thị "Đăng Nhập" và "Đăng Ký"
                                        <>
                                            <li className='cursor-pointer justify-center w-[320px] rounded-full bg-main-300 mb-8 p-3 flex'>
                                                <a href='http://localhost:3000/login'>Đăng Nhập</a>
                                            </li>
                                            <li className='cursor-pointer justify-center flex rounded-full bg-main-300 w-[320px] p-3'>
                                                <a href='http://localhost:3000/register'>Đăng Ký</a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header


