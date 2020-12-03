import React, { useState, useContext } from 'react'
import { notification } from 'antd'
import {
    CheckCircleFilled,
} from '@ant-design/icons';
import { AppContextProvider } from '../../context/AppContext/AppContext';


function SignUp(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [noPassword, setNoPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [noUserName, setNoUserName] = useState(false)
    const [noRetype, setNoRetype] = useState(false)
    const [retype, setRetype] = useState('')
    const [noEmail, setNoEmail] = useState(false)
    const { signUp} = useContext(AppContextProvider)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setNoEmail(true)
            notification.error({
                message: 'Error',
                description:
                    'Please enter your email ',
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

        else if (!userName) {
            setNoUserName(true)
            notification.error({
                message: 'Error',
                description:
                    'Please enter a user name',
            });
            return
        }



        else if (!retype) {
            setNoRetype(true)
            notification.error({
                message: 'Error',
                description:
                    'Please retype password for validation'
            });
            return
        }
        else if (password !== retype) {

            notification.error({
                message: 'Error',
                description:
                    'Password does not match',
            });
            return
        }
        else if (password.length < 6) {

            notification.error({
                message: 'Error',
                description:
                    'Password must have at least 6 characters',
            });
            return
        }

        else {
           const res=  await signUp({ email, username: userName, password })
            if (res.error) {
            return notification.error({
                    message: 'Failed',
                    description: res.error
                }) 
            }
            notification.success({
                message: 'Email Registerd',
                description: 'You can now signin'
            }) 
                return props.history.push({ pathname: '/auth/signin', state: { user : res} })
            
           

        }

    }

    return (
        <div >

            <h2 style={{ fontWeight: 'bold', color: 'blue' }} className="my-3 pt-3 text-center">Infuuse</h2>

            <form style={{ border: "1px solid rgba(0,0,0,0.1)" }} onSubmit={handleSubmit} className="form col-md-4 offset-md-4 auth_cont">

                <h4 className="text-center">Sigup to have an account</h4>

                < div className="row each_input auth">
                    < div className="col-md-12">
                        <label >Enter a Username</label>
                        <br />
                        < input type="text" onChange={(e) => { setUserName(e.target.value); setNoUserName(false) }} placeholder="Enter a user name" />
                        <div>
                            {noUserName && <small className="text-danger">Enter a user name </small>}
                        </div>
                    </div>
                </div>

                < div className="row each_input auth">
                    < div className="col-md-12">
                        <label >Enter Email </label>
                        <br />
                        < input type="email" onChange={(e) => { setEmail(e.target.value); setNoEmail(false) }} placeholder="Enter your email" />
                        <div>
                            {noEmail && <small className="text-danger">Enter emaill</small>}
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
                < div className="row each_input auth">

                    < div className="col-md-12">
                        <label >Retype Password </label> <br />
                        < input onChange={(e) => { setRetype(e.target.value); setNoRetype(false) }} placeholder="Please retype your password" type="password" />
                        <div>
                            {noRetype && <small className="text-danger">Retype your password here</small>}
                        </div>
                    </div>
                </div>
                < div style={{ display: 'flex', justifyContent: 'center', padding: '20px 40px 10px 40px' }} className="row each_input">
                    <p>By submiting this form, you agree to all terms and policy by Infuuse</p>

                </div>


                < div style={{ display: 'flex', justifyContent: 'center' }} className="row each_input">
                    <div className="col-md-7 offset-md-0">
                        <button type="submit" className="custom_btn btn">
                            Register <CheckCircleFilled style={{ marginLeft: 10, fontSize: 20 }} />
                        </button>
                    </div>

                </div>

                <p className="pl-5 my-4 justfy-content-between "><>Already have an account? <span style={{ cursor: 'pointer' }} className="text-primary"  onClick={() => props.history.push('/auth/signin')}>Sign In</span></> </p>


            </form>
        </div>

    )
}

export default SignUp