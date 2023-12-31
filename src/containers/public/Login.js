import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../../ultis/path'
const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lấy thông tin đăng nhập từ người dùng
        const loginData = {
            email: email,
            password: password,
        };

        // Lấy thông tin đăng ký đã lưu trữ từ localStorage
        const storedRegistrationData = localStorage.getItem('registrationData');

        if (storedRegistrationData) {
            const registrationData = JSON.parse(storedRegistrationData);

            // So sánh thông tin đăng nhập với thông tin đăng ký từ localStorage
            if (loginData.email === registrationData.email && loginData.password === registrationData.password) {
                localStorage.setItem('isLoggedIn', true);
                navigate(path.HOME)
            }
        } else {
            console.log('Không tìm thấy thông tin đăng ký trong localStorage.');

        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
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
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}

export default Login