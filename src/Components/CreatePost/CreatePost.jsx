


import PropTypes from 'prop-types';
import { Modal,FileInput ,TextInput, Textarea, Button,Group } from '@mantine/core';
import { useState } from 'react';


CreatePost.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func,
    setUserData: PropTypes.func,
    userData: PropTypes.object

  };

export default function CreatePost({opened,close,userData,setUserData}){

    const [file, setFile] = useState(null);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    function handleClick(){
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', file);
        fetch(`http://localhost:3000/${userData._id}/post`, {
            method: 'POST',
            body: formData,
          })
        .then(response => response.json())
        .then(data => {
        // push to user data then setuserdata
        close();
        setUserData(data);
        

        })
        .catch(error => {
        console.error('Error', error);
        // Handle the error
        });

    }
    return (

        <Modal opened={opened} onClose={close} title="Create a post">
            <div>
            <FileInput
                placeholder="Pick image"
                label="image"
                accept='image/jpeg,image/png'
                onChange={setFile}
            />

            <TextInput placeholder="title" label="title" onChange={(e)=>setTitle(e.target.value)} />

            <Textarea
                placeholder="content"
                label="content"
                onChange={(e)=>setContent(e.target.value)}
            />
            <br />
            <Group>
                <Button onClick={handleClick}>
                    Post
                </Button>

            </Group>



            </div>
            


            
        </Modal>
    );
}