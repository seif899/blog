import { IconPlus } from '@tabler/icons-react';
import './AddButton.css';
import { useDisclosure } from '@mantine/hooks';
import PropTypes from 'prop-types';
import CreatePost from '../CreatePost/CreatePost';

AddButton.propTypes = {
    setUserData: PropTypes.func,
    userData: PropTypes.object

  };

export default function AddButton({userData,setUserData}) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <CreatePost opened={opened} close={close} userData={userData} setUserData={setUserData}/>
            
            <button className="circular-button" onClick={open} >
            <IconPlus />
            </button>
        </>
        
    );
}

