import React from 'react';
import { useGetPostListQuery, useCreatePostMutation } from '@/apis/postApi';
import { Box, Spinner, Alert, AlertIcon, Text, Button } from '@chakra-ui/react';
import PostTable from '@/features/Post/PostTable';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
    const { data: posts, error, isLoading } = useGetPostListQuery();

    const navigate = useNavigate();
    const handleCreatePost = () => {
        navigate('/manage/post/create');
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt="20">
                <Spinner />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                Unable to fetch posts. Please try again later.
            </Alert>
        );
    }

    return (
        <Box p={5}>
            <Text fontSize="2xl" mb={4}>Post List</Text>
            <PostTable data={posts} />
            <Button colorScheme="teal" mt={4} onClick={handleCreatePost}>Create Post</Button>
        </Box>
    );
};

export default PostList;