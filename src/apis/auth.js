import firebase from 'firebase'
const db = firebase.firestore()
export async function handleSignUp(email, username, password) {
    const userExist = await db.collection(process.env.REACT_APP_USER_COLLECTION).doc(email).get()
    if (userExist.data()) {
        return {
            error: "User already Exist"
        }
    }
    await db.collection(process.env.REACT_APP_USER_COLLECTION).doc(email).set({ email, username, password })
    return {
        email, username
    }
}


export async function handleSignIn(email, password) {
    const userExist = await db.collection(process.env.REACT_APP_USER_COLLECTION).doc(email).get()
    if (!userExist.data()) {
        return {
            error: "User does not exist"
        }
    }
    else if (userExist.data().password === password) {
        return {
            email: userExist.data().email,
            username: userExist.data().username
        }
    }
    else return {
        error: "Password is incorrect"
    }
}




