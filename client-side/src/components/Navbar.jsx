import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import Settings from './Settings';

import Help from './Help';
import Plans from './Plans';
import Credits from './Credits';
import { Dropdown, Space, Menu } from 'antd';
import { faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import {
    SettingOutlined,
    FileTextOutlined,
    InfoCircleOutlined,
    WalletOutlined,
    CrownOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';

import { useGlobalState, useGlobalDispatch } from '../Globalstates';

const Navbar = () => {
    const [settingsFlag, setSettingsFlag] = useState(false);

    const [supportFlag, setHelpFlag] = useState(false);
    const [plansFlag, setPlansFlag] = useState(false);
    const [creditsFlag, setCreditsFlag] = useState(false);

    const { isSmallScreen, isSmallScreenExtraSmall, isUserLoggedIn } =
        useGlobalState();
    const { setIsSmallScreen, setIsSmallScreenExtraSmall, setIsUserLoggedIn } =
        useGlobalDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
            setIsSmallScreenExtraSmall(window.innerWidth <= 640);
        };

        handleResize(); // Check screen size on initial render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsUserLoggedIn(false);
    };

    const items = [
        {
            key: 'edit-profile',
            label: (
                <div>
                    <Button type='text' className='w-full text-[#645e5e]'>
                        <FontAwesomeIcon icon={faUserEdit} />
                        Edit profile
                    </Button>
                </div>
            ),
        },
        {
            key: 'logout',
            label: (
                <div className='w-full'>
                    <Button
                        type='text'
                        className='w-full text-[#645e5e] '
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Log out
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className='p-4 flex justify-center items-center w-full min-w-[150px] '>
            {settingsFlag && (
                <Settings setSettingsFlag={setSettingsFlag}></Settings>
            )}

            {supportFlag && <Help setHelpFlag={setHelpFlag}></Help>}
            {plansFlag && <Plans setPlansFlag={setPlansFlag}></Plans>}
            {creditsFlag && <Credits setCreditsFlag={setCreditsFlag}></Credits>}

            <div className='flex gap-4 flex-wrap items-center justify-center w-full'>
                <Button
                    className='text-xl text-[#645e5e] font-semibold'
                    type='text'
                    onClick={() => {
                        setCreditsFlag(true);
                    }}
                >
                    {isSmallScreen ? (
                        <div className='flex items-center justify-center  my-1  '>
                            <WalletOutlined width={20} />
                        </div>
                    ) : (
                        'Credits'
                    )}
                </Button>
                <Button
                    className='text-xl text-[#645e5e] font-semibold'
                    type='text'
                    onClick={() => {
                        setHelpFlag(true);
                    }}
                >
                    {isSmallScreen ? (
                        <div className='flex items-center justify-center  my-1  '>
                            <QuestionCircleOutlined width={20} />
                        </div>
                    ) : (
                        'Help'
                    )}
                </Button>
                <Button
                    className='text-xl text-[#645e5e] font-semibold'
                    type='text'
                    onClick={() => {
                        setPlansFlag(true);
                    }}
                >
                    {isSmallScreen ? (
                        <div className='flex items-center justify-center  my-1  '>
                            <CrownOutlined width={20} />
                        </div>
                    ) : (
                        'Plans'
                    )}
                </Button>
                <Button
                    className='text-xl text-[#645e5e] font-semibold'
                    type='text'
                    onClick={() => {
                        setSettingsFlag(true);
                    }}
                >
                    {isSmallScreen ? (
                        <div className='flex items-center justify-center  '>
                            <SettingOutlined width={20} />
                        </div>
                    ) : (
                        'Settings'
                    )}
                </Button>
            </div>

            <Dropdown
                menu={{
                    items,
                }}
                placement='bottomRight'
                arrow
            >
                <div className='flex items-center justify-center p-0'>
                    <FontAwesomeIcon
                        icon={faUser}
                        className='text-2xl text-[#645e5e]  mx-4 '
                    />
                </div>
            </Dropdown>
        </div>
    );
};

export default Navbar;
