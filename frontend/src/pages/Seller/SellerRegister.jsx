import React, { useState } from 'react'
import axios from "../../services/axiosInstance.js"
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [formData, setFormData] = useState({
        name: "", email: "", password: ""
    })
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    //console.log(formData,otp)

    // functions for handling data
    function handleRegister(e) {
        e.preventDefault()
        axios.post("/seller/register", { ...formData })
            .then(res => {
                alert(res.data.message)
                navigate("/login")
            })
            .catch(err => {
                console.log(err.response)
                alert(err.response.message)
                navigate("/seller/login")
            })

    }

    function handleChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleSentOtp(e) {
        e.preventDefault()
        axios.post("/seller/send-otp", { email: formData.email })
            .then(res => {
                if (res.status == 201) {
                    alert(res.data.message)
                    setOtpSent(true)
                }
            })
            .catch(err => console.log(err))
    }

    function handleVerifyOtp(e) {
        e.preventDefault()
        axios.post("/seller/verify-otp", { email: formData.email, otp })
            .then(res => {
                alert(res.data.message)
                setEmailVerified(true)
                setLoading(false)

            })
            .catch(err => console.log(err))
    }

    return (
        <div
            className='container mt-5'
        >
            <div
                className='row justify-content-center align-items-center'
            >
                <form
                    className='col-12 col-md-6'
                    onSubmit={handleRegister}
                >
                    <h2>Register Seller</h2>

                    <input
                        className='form-control mb-3'
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                        onChange={handleChange}
                    />
                    <div
                        className='d-flex justify-around mb-3'
                    >
                        <input
                            className='form-control flex-shrink-1'
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            onChange={handleChange}
                        />
                        <button className='btn btn-warning flex-shrink-0 ms-2'
                            onClick={handleSentOtp} disabled={emailVerified}
                        >
                            Send otp
                        </button>

                    </div>
                    {
                        otpSent ?
                            <div
                                className='d-flex justify-around mb-3'
                            >

                                <input
                                    className='form-control flex-shrink-1'
                                    type='number'
                                    name='otp'
                                    placeholder='Enter your OTP'
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button className='btn btn-warning flex-shrink-0 ms-2'
                                    onClick={handleVerifyOtp}
                                    disabled={emailVerified}
                                >
                                    Verify Otp
                                </button>
                            </div>
                            :
                            null
                    }
                    <input
                        className='form-control mb-3'
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        disabled={!emailVerified}
                    />
                    <button
                        className='btn btn-success'
                        disabled={!emailVerified}
                    >
                        Register
                    </button>
                </form>

            </div>

        </div>
    )
}
