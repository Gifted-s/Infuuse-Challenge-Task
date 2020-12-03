import React from 'react'

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
    
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <span>{text}</span>,
    } 
  ];

  export default columns