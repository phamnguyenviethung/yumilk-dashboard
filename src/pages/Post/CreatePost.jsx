import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '@/apis/postApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormErrorMessage,
    Box,
    Heading,
    useToast
} from '@chakra-ui/react';

const CreatePost = () => {
    const initialValues = {
        title: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        metaTitle: Yup.string().required('Meta title is required'),
        metaDescription: Yup.string().required('Meta description is required'),
    });

    const [createPost, { isLoading }] = useCreatePostMutation();
    const navigate = useNavigate(); // Use useNavigate hook
    const toast = useToast(); // Use useToast hook

    const onSubmit = async (values, actions) => {
        try {
            await createPost(values).unwrap();
            actions.resetForm();
            // Show success toast
            toast({
                title: 'Post created.',
                description: "Your post has been successfully created.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            // Navigate back or to another page
            navigate(-1); // Go back to the previous page
        } catch (error) {
            if (error.status === 400 && error.data && error.data.errors) {
                Object.keys(error.data.errors).forEach(key => {
                    const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
                    const errorMessage = error.data.errors[key].join(' ');
                    actions.setFieldError(fieldName, errorMessage);
                });
            }
            // Show error toast
            toast({
                title: 'Error creating post.',
                description: "There was an error creating your post.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5}>
            <Heading as="h2" size="lg" mb={5}>Create Post</Heading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <FormControl isInvalid={errors.title && touched.title}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Field as={Input} id="title" name="title" type="text" />
                            <ErrorMessage name="title" component={FormErrorMessage} />
                        </FormControl>
                        <FormControl isInvalid={errors.content && touched.content} mt={4}>
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <Field as={Textarea} id="content" name="content" />
                            <ErrorMessage name="content" component={FormErrorMessage} />
                        </FormControl>
                        <FormControl isInvalid={errors.metaTitle && touched.metaTitle} mt={4}>
                            <FormLabel htmlFor="metaTitle">Meta Title</FormLabel>
                            <Field as={Input} id="metaTitle" name="metaTitle" type="text" />
                            <ErrorMessage name="metaTitle" component={FormErrorMessage} />
                        </FormControl>
                        <FormControl isInvalid={errors.metaDescription && touched.metaDescription} mt={4}>
                            <FormLabel htmlFor="metaDescription">Meta Description</FormLabel>
                            <Field as={Input} id="metaDescription" name="metaDescription" type="text" />
                            <ErrorMessage name="metaDescription" component={FormErrorMessage} />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" isLoading={isLoading} type="submit">
                            Create Post
                        </Button>
                    </Form>
                )}
            </Formik>
            <Button colorScheme="gray" mr={3} onClick={() => navigate(-1)}>Back</Button>
            <Button colorScheme="red" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
    );
};

export default CreatePost;