import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import PropTypes from 'prop-types';

Signin.propTypes = {
  setIsSignIn: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
  setUserData: PropTypes.func
};

export default function Signin({setIsSignIn,setIsLoggedIn,setUserData}) {
  const [mailValue, setMailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  function handleClick(){
    if (passwordValue && mailValue){
      const data = {
        email: mailValue,
        password: passwordValue
      };
      
      fetch("/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          setIsLoggedIn(true);
          setUserData(result);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }
    

  }
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={()=>setIsSignIn(false)}>
          sign up
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required  value={mailValue} onChange={(e)=>setMailValue(e.target.value)}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" value={passwordValue}  onChange={(e)=>setPasswordValue(e.target.value)}/>

        <Button fullWidth mt="xl" onClick={handleClick}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}