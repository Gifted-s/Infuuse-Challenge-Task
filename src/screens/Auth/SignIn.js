import React, { useState, useContext } from 'react'
import { notification } from 'antd'
import {
    CheckCircleFilled,
} from '@ant-design/icons';
import { AppContextProvider } from '../../context/AppContext/AppContext';
function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [noPassword, setNoPassword] = useState(false);
    const [noEmail, setNoEmail] = useState(false)
    const { signIn, setUser} = useContext(AppContextProvider)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setNoEmail(true)
            notification.error({
                message: 'Error',
                description:
                    'Please enter your email',
            });

            return
        }

        else if (!password) {
            setNoPassword(true)
            notification.error({
                message: 'Error',
                description:
                    'Please enter your password',
            });
            return
        }

        else {
             
           const response =  await signIn({email, password})
            if(response.error){
                 return notification.error({
                    message:'Failed',
                    description:response.error
             })
            
            }
            setUser(response)
            localStorage.setItem('coinplanner-user', JSON.stringify(response))
            return props.history.push({ pathname: '/dashboard', state: { user: response } })
           
        }

    }

    return (
        <div >

            <h2 style={{ fontWeight: 'bold', color: 'blue' }} className="my-3 pt-3 text-center">Infuuse</h2>
            <form style={{ border: "1px solid rgba(0,0,0,0.1)" }} onSubmit={handleSubmit} className="form col-md-4 offset-md-4 auth_cont">
                <h3 className="text-center">Sign in to your account</h3>

                < div className="row each_input auth">
                    < div className="col-md-12">
                        <label >Enter Email</label>
                        <br />
                        < input type="text" onChange={(e) => { setEmail(e.target.value); setNoEmail(false) }} placeholder="Enter your email" />
                        <div>
                            {noEmail && <small className="text-danger">Enter Email</small>}
                        </div>
                    </div>
                </div>


                < div className="row each_input auth">

                    < div className="col-md-12">
                        <label >Enter Password </label> <br />
                        < input onChange={(e) => { setPassword(e.target.value); setNoPassword(false) }} placeholder="Please enter your password" type="password" />
                        <div>
                            {noPassword && <small className="text-danger">Enter Password</small>}
                        </div>
                    </div>
                </div>

                < div style={{ display: 'flex', justifyContent: 'center' }} className="row each_input">
                    <div className="col-md-7 offset-md-0">
                        <button type="submit" className="custom_btn btn">
                            Login <CheckCircleFilled style={{ marginLeft: 10, fontSize: 20 }} />
                        </button>
                    </div>

                </div>

                <p className="pl-5 my-4 justfy-content-between "><>Don't have an account? <span style={{ cursor: 'pointer' }} className="text-primary" onClick={() => props.history.push('/auth/signup')}>Sign Up</span></> </p>


            </form>
        </div>

    )
}

export default SignIn