import { SimpleGrid,Container} from "@mantine/core";

import Card from "../Card/Card";
import PropTypes from 'prop-types';
import './Grid.css';



Grid.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func
};

export default function Grid({userData,setUserData}){

  const cards = userData.posts.map((post,index) => (<Card key={index} userId={userData._id} postId={post._id} title={post.title} content={post.content} image={post.image} date={post.date} setUserData={setUserData}/>))
  return (
    cards[0] ? 
      <Container py="xl" size="100rem">
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm' ,cols: 1}]}>
          {cards}
        </SimpleGrid>
      </Container>
    : <div className="no-posts-container"><p className="no-posts">NO POSTS YET</p></div>

  );
}