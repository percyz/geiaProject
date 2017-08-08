import React from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

export const MainLayout = ({content}) => (
    <div className="main-layout">
        {content}
        <Footer />
    </div>
)
