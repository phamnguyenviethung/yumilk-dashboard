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
import axios from 'axios';
import ImageUploader from 'quill-image-uploader';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useRef } from 'react';

Quill.register('modules/imageUploader', ImageUploader);

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

    const inputRef = useRef(null);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
        imageUploader: {
            upload: async file => {
                try {
                    const formData = new FormData();
                    formData.append('image', file);
                    formData.append('title', 'file');
                    formData.append('description', 'file');

                    const res = await axios.post(
                        import.meta.env.VITE_API_ENDPOINT + '/api/image',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENTID}`,
                            },
                        }
                    );
                    return res.data.data.link;
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];


    return (
        <Box p={5}>
            <Heading as="h2" size="lg" mb={5}>Create Post</Heading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                        <FormControl isInvalid={errors.title && touched.title}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Field as={Input} id="title" name="title" type="text" />
                            <ErrorMessage name="title" component={FormErrorMessage} />
                        </FormControl>
                        <FormControl isInvalid={errors.content && touched.content} mt={4}>
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <Box w='full' minH='200px' border='1px solid' borderColor='gray.600' borderRadius='6px'>
                                <ReactQuill
                                    ref={inputRef}
                                    theme="bubble"
                                    value={values.content}
                                    onChange={value => setFieldValue('content', value)}
                                    modules={modules}
                                    formats={formats}
                                    placeholder='Enter content...'
                                />
                            </Box>
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