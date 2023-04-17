import React from 'react';
import './home.css';
import AppLayout from "../../Layouts/AdminLayout";
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;

export default function Home() {
  return (
    <AppLayout >
        <div  style={{
          paddingLeft: 80,
          paddingRight: 80,
          marginTop: 31,
          marginBottom: 24
        }}>
          <div style={{display : 'flex' ,justifyContent:'space-between' }}>
            <Space direction='vertical'>
               <Text style={{color : 'black',fontWeight : 500 , fontSize : 18}}> AIt's time to go shopping! Use your points to get some great merchandise!</Text>
               <Link style={{fontSize : 14}} href="https://ant.design" target="_blank">see how points work</Link>
            </Space>
           
            <div className='total-point'>
              <p style={{ color : '#213E7C' , fontSize : 18}}> Total Points: <span style={{fontWeight : 500 }}>4800</span></p>
            </div>
          </div>
        </div>
    </AppLayout>
    
  )
}
