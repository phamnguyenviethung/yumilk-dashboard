import { Button, Center, Container, Image } from '@chakra-ui/react';
import notfound from '@/assets/notfound.png';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <Container h='100vh' maxW='container.xl'>
      <Center h='full' flexDirection='column'>
        <Image src={notfound} boxSize={['20rem', '25rem', '30rem']} mb={2} />
        <Link to='/'>
          <Button colorScheme='pink' size='lg'>
            Back Home
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default NotFound;
