import React, { useContext, useState, useEffect } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import swal from 'sweetalert'
import {  Table,Modal, Button,  notification, Spin } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { AppContextProvider } from '../../context/AppContext/AppContext';
import columns from './TableConfig';
import Graph from './Graphs';
function Overview() {
    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState('');
    const [age, setAge] = useState(0)
    const [data, setData] = useState([])
    const [showBar, setShowBar] = useState(false)
    const [stateChanged , setStateChanged] = useState(false)
    const { user, handleCreateData, handleGetData } = useContext(AppContextProvider)
    useEffect(()=>{
     retreiveData()
    }, [stateChanged])
    function retreiveData(){
       return handleGetData().then(data=>{
            setData(data)
            return setShowBar(true)
        })
    }
    if (!user.email) {
        window.location = '/'
    }
   
    const showModal = () => {
        setModalVisible(true)
    };
    const handleCancel = () => {
        setModalVisible(false)
    };

    const allData = data.map((user, index) => {

        return {
            key: index.toString(),
            name: user.name,
            age: user.age,
            date: user.date,


        }
    })
   
    const handleAddData = async () => {
        if(!name){
           return notification.error({
                message:'Error',
                description:"Please enter name"
         })
        }
       else if(!age || age<=0){
            return notification.error({
                 message:'Error',
                 description:"Please enter age, age cannot be zero or lesser "
          })
         }
       setShowBar(false)
       const added  =   await handleCreateData(name,age,new Date(Date.now()).toDateString() )
         if(added){
            setName('')
            setAge(0)
            handleCancel()
            retreiveData()
            swal("Data Added", "", 'success')
            return 
         }
        return swal("Data wasn't added due to some erros Added", "", 'error')
    }

    return (
        <Dashboard>
            < div style={{ height: '100vh' }} className="container-fluid py-4 bg-sec">

                <div className="col-md-12">
                    {data.length===0 && <Spin size="large"/>}
                    <div className="row">

                        <div className="col-md-12 add_data ">
                            <div onClick={() => showModal()} className="btn btn-primary add_btn">
                                Add Data <PlusOutlined />
                            </div>
                        </div>
                        <h4 className="my-3 font-weight-bold">Retrieval of Data</h4>
                        <div style={{ backgroundColor: 'white', overFlowX:'scroll' }} className="col-md-12  offset-md-0 pb-4 dashboard_cont">
                            <Table columns={columns} dataSource={allData} />
                        </div>
                    </div>
                      { showBar> 0  && <Graph data={data}/>}
                    
                </div>

                <Modal
                    visible={modalVisible}
                    title="Add a Data"
                    onOk={handleAddData}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleAddData}>
                            Add Data
                         </Button>,
                    ]}
                >
                    <form  className="form col-md-12 add_data_form">
                        <div className="row each_input auth">
                            < div className="col-md-12">
                                <label >Enter Name</label>
                                <br />
                                < input type="text" onChange={(e) => { setName(e.target.value)}} placeholder="Enter name" />
                               
                            </div>
                        </div>


                        <div className="row each_input auth">

                            < div className="col-md-12">
                                <label >Enter Age</label> <br />
                                < input onChange={(e) => { setAge(e.target.value);}} placeholder="Enter age" type="number" />
                               
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Overview
