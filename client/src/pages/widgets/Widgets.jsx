import React from 'react';
import { Fundamentals } from './news/Fundamentals';
import TickerTape from './ticker/TickerTape';

const Widgets = () => {
    return (
        <div className='max-w-full w-full h-screen'>
            <Fundamentals />
            <TickerTape />
        </div>
    );
}

export default Widgets