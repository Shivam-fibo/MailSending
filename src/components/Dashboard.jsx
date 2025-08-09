import React, { useContext } from 'react';
import Layout from './Layout';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const navigate = useNavigate()
const {isAuthorized} = useContext(Context)

if(!isAuthorized){
    toast.error("Please Login First")
    navigate("/login")
}
  return <Layout />;
};

export default Dashboard;
