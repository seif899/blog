import { createStyles, Card, Image, Text, AspectRatio, Modal,ActionIcon,Flex,Container ,BackgroundImage, Center, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';

CardComponent.propTypes = {
  userId: PropTypes.string,
  postId: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  setUserData: PropTypes.func
};

const useStyles = createStyles((theme) => ({
    card: {
      transition: 'transform 150ms ease, box-shadow 150ms ease',
  
      '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: theme.shadows.md,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 600,
    },
  }));

export default function CardComponent({userId,postId,title,content,image,date,setUserData}) {
    const [opened, { open, close }] = useDisclosure(false);

    const { classes } = useStyles();


    function deletePost(){
      fetch(`/${userId}/${postId}/delete`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(err => console.log(err));
      
    }

    
    return (
      <>
      <Modal
        opened={opened}
        onClose={close}
        
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
      
        <Container size="80rem" px={0}>
          <h1>{title}</h1>
        
      

          <p>{content}</p>
            
          
          <Flex
            mih={50}
            gap="xs"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <ActionIcon variant="filled" color='red' size='xl'><IconTrash size="2rem" onClick={deletePost}/></ActionIcon>
          </Flex>
        </Container>
        
      </Modal>
        
      <Card key={title} p="md" radius="md" component="a" className={classes.card} onClick={open}>
      <AspectRatio ratio={1920 / 1080}>
          <Image src={`/images/${image}`} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
          {date}
      </Text>
      <Text className={classes.title} mt={5}>
          {title}
      </Text>
      </Card>
      </>
    );
}

