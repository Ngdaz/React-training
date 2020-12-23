import React from 'react';

import Directory from '../../components/directory/directory.component'

import './homepage.style.scss';

const HomePage = (props) => (

    <div className='homepage'>  
    {/* render directory component */}
        <Directory/>
    </div>
    
)

export default HomePage