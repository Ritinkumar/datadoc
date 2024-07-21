import React, { useState } from 'react';
import Main from './Main';
import LoginAndSignup from './LoginAndSignup';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';

const Registration = () => {
    const { isUserLoggedIn } = useGlobalState();

    return (
        <div>
            {isUserLoggedIn ? <Main></Main> : <LoginAndSignup></LoginAndSignup>}
        </div>
    );
};

export default Registration;
