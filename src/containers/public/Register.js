import React, { useState } from 'react'

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Tạo đối tượng lưu thông tin đăng ký
        const registrationData = {
            fullName: fullName,
            email: email,
            password: password,
        };

        // Lưu thông tin đăng ký vào localStorage
        localStorage.setItem('registrationData', JSON.stringify(registrationData));

        console.log('Thông tin đăng ký đã được lưu vào localStorage.');
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-main-500"
                        value={fullName}
                        onChange={handleFullNameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-main-500"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-main-500"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-main-500 text-white p-3 rounded-md hover:bg-main-600"
                >
                    Đăng ký
                </button>
            </form>
        </div>
    )
}

export default Register