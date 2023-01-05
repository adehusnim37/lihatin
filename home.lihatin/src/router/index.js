import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Wave from '../components/Wave';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import Detail from '../pages/Detail';
import Login from '../pages/Login';

import * as Middleware from '../middleware'

import Register from '../pages/Register';
import { Toaster } from 'react-hot-toast';

function ReactRouter(props) {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route element={<Middleware.Authenticated />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route path="/detail/:short" element={<Detail />} />
                <Route path="/edit/:short" element={<Edit />} />

                <Route element={<Middleware.Guest />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
            <Wave />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </BrowserRouter>
    );
}

export default ReactRouter;