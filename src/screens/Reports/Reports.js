import React, { useContext, useState, useEffect } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import firebase from 'firebase'

import {notification, Spin , Progress} from 'antd';
import { AppContextProvider } from '../../context/AppContext/AppContext';
function Reports() {
    const [stateChaged, setStateChanged] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imageData, setImageData] = useState([])
    const { user, handleGetImageData, handleAddImageData } = useContext(AppContextProvider)
    if (!user.email) {
        window.location = '/'
    }
    useEffect(() => {
        retreiveData()
    }, [stateChaged])
    function retreiveData() {
        return handleGetImageData().then(data => {
            setImageData(data)
        })
    }

    const handleFireBaseUpload = e => {
        setIsUploading(true)
        const imageAsFile = e.target.files[0]
        const storage = firebase.storage()
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed',
            (snapShot) => {
                setProgress(Math.floor((snapShot.bytesTransferred/snapShot.totalBytes) * 100))
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        handleAddImageData({
                           name: imageAsFile.name,
                            url: fireBaseUrl
                        })
                            .then(() => {
                                notification.success({
                                    message: 'Operation Successful',
                                    description: 'Image data was uploaded Successfully'
                                })
                                
                                setIsUploading(false)
                                return retreiveData()
                            })
                            .catch(err => {
                                return notification.error({
                                    message: 'Operation failed',
                                    description: 'Image data upload failed please retry or check network connection'
                                })
                            })
        
                    })
            })
    }

    return (
        <Dashboard>
            < div  className="container-fluid py-4 bg-sec">
              {imageData.length ===0 && <Spin size="large"/>}
                <div className="col-md-12 ">
                    < div className="row justify-content-end d-flex">
                        <form>
                       {isUploading && <Progress strokeColor={'#069114'} strokeWidth={10} percent={progress} />} 
                            <input
                                type="file"
                                onChange={handleFireBaseUpload}
                            />
                        </form>
                    </div>
                </div>

                <div className="row">
                    {imageData.map((data, index) => {
                        return (
                            <div className="col-md-3 card_cont" key={index}>
                                <div className="card">
                                    <div>
                                        <img className="card_img" src={data.url} alt="reportimage" />
                                    </div>
                                    <div className="card_body">
                                        <h5>{data.name}</h5>
                                    </div>
                                </div>
                            </div>
                        )

                    })}

                </div>
            </div>
        </Dashboard>
    )
}

export default Reports
