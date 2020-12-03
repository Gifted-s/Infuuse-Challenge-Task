import React, { useState } from 'react'
import { handleSignIn, handleSignUp } from '../../apis/auth'
import { addData, getData, getImageData, handleAddImage } from '../../apis/data-api'
export const AppContextProvider = React.createContext()
const AppContext = function (props) {
    const previousUser = JSON.parse(localStorage.getItem('coinplanner-user')) || {}
    const [user, setUser] = useState(previousUser)
    
    async function signIn({ email, password }) {

        const signedInUser = await handleSignIn(email, password)
       return signedInUser 
    }

    async function handleCreateData( name, age, date ) {

        const dataResponse = await addData(name,age,date)
       return dataResponse
    }

    async function handleGetData() {

        const dataResponse = await getData()
       return dataResponse
    }

    async function handleGetImageData() {

        const dataResponse = await getImageData()
       return dataResponse
    }
    async function handleAddImageData(imageData) {

        const dataResponse = await handleAddImage(imageData)
       return dataResponse
    }

    async function signUp({ email, username, password }) {

        const signedUpUser = await handleSignUp(email, username, password)
        return signedUpUser


    }
    async function signOut() {
        localStorage.clear('infuuse-user')
    }


    return (
        <AppContextProvider.Provider value={{ user, signIn, signUp, signOut,setUser, handleCreateData, handleGetData, handleGetImageData, handleAddImageData}}>
            {props.children}
        </AppContextProvider.Provider>
    )
}

export default AppContext











































