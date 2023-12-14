import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const Loader = () => {
    return (
        <div className='loader'>
            <TypeAnimation
                sequence={[
                    'Loading...',
                    1000,
                    'Exploring the Digital Frontier',
                    1000,
                    'Unraveling Tech Mysteries',
                    1000,
                    'Innovation in Every Byte',
                    1000,
                    'Connecting Tech Enthusiasts',
                    1000,
                    'Discovering Tomorrow’s Tech Today',
                    1000,
                    'Coding Adventures Await',
                    1000,
                    'Stay Tuned for Tech Wonders',
                    1000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
            />
        </div>
    )
}

export default Loader
