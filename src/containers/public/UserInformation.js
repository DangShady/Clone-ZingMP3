import React from 'react'

const UserInformation = () => {

    const storedUserData = localStorage.getItem('registrationData');

    // Kiểm tra xem có thông tin người dùng đã được lưu trong localStorage hay không
    if (storedUserData) {
        // Nếu có thông tin người dùng, chuyển chuỗi JSON thành đối tượng JavaScript
        const userData = JSON.parse(storedUserData);

        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Thông tin người dùng</h2>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                        Họ và tên
                    </label>
                    <p className="text-lg py-2 pl-3 border rounded-md focus:ring focus:ring-main-500">
                        {userData.fullName}
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <p className="text-lg py-2 pl-3 border rounded-md focus:ring focus:ring-main-500">
                        {userData.email}
                    </p>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Mật khẩu
                    </label>
                    <p className="text-lg py-2 pl-3 border rounded-md focus:ring focus:ring-main-500">
                        {userData.password}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Thông tin người dùng</h2>
                <p className="text-center text-gray-600">Không có thông tin người dùng được tìm thấy.</p>
            </div>
        );
    }
}

export default UserInformation