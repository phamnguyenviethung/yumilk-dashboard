import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useGetPostListQuery, useUpdatePostMutation } from '@/apis/postApi';
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

const PostContentEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const { data: posts } = useGetPostListQuery();
    const [updatePost, { isLoading }] = useUpdatePostMutation(id);
    const toast = useToast();
    const inputRef = useRef(null);

    useEffect(() => {
        if (posts) {
            const post = posts.items.find(post => post.id === id);
            setPost(post);
        }
    }
        , [posts, id]);

    if (!post) {
        return <p>Post not found</p>;
    }

    const initialValues = {
        title: post.title,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        metaTitle: Yup.string().required('Meta title is required'),
        metaDescription: Yup.string().required('Meta description is required'),
    });

    const onSubmit = async (values, actions) => {
        try {
            await updatePost({ postId: id, data: values }).unwrap();
            // Show success toast
            toast({
                title: 'Post updated.',
                description: "Your post has been successfully updated.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
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
                title: 'Error',
                description: 'An error occurred. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

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
            <Heading as="h2" size="lg" mb={5}>
                Edit Post
            </Heading>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Field as={Input} id="title" name="title" placeholder="Title" />
                            <ErrorMessage name="title" component={FormErrorMessage} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <Box w='full'
                                minH='200px'
                                border='1px solid'
                                borderColor='gray.600'
                                borderRadius='6px'
                                _hover={{
                                    borderColor: 'pink.400',
                                    outline: 0,
                                }}
                                _focus={{
                                    outline: 0,
                                }} onClick={() => inputRef.current.focus()}>
                                <ReactQuill
                                    ref={inputRef}
                                    theme="bubble"
                                    value={values.content}
                                    onChange={(content, delta, source, editor) => {
                                        setFieldValue('content', editor.getHTML());
                                    }}
                                    modules={modules}
                                    formats={formats}
                                    placeholder='Nhập nội dung....'
                                />
                            </Box>
                            <ErrorMessage name="content" component={FormErrorMessage} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor="metaTitle">Meta Title</FormLabel>
                            <Field as={Input} id="metaTitle" name="metaTitle" placeholder="Meta Title" />
                            <ErrorMessage name="metaTitle" component={FormErrorMessage} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor="metaDescription">Meta Description</FormLabel>
                            <Field as={Textarea} id="metaDescription" name="metaDescription" placeholder="Meta Description" />
                            <ErrorMessage name="metaDescription" component={FormErrorMessage} />
                        </FormControl>

                        <Button mt={4} colorScheme="blue" isLoading={isLoading} type="submit">
                            Update Post
                        </Button>
                    </Form>
                )}
            </Formik>
            <Button mt={4} colorScheme="teal" onClick={() => navigate(-1)}>Back</Button>
        </Box>
    );
};

export default PostContentEditor;