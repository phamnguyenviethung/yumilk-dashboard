import { useCreatePostMutation, useUpdatePostMutation } from '@/apis/postApi';
import InputField from '@/components/Fields/Input';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { FastField, Form, Formik } from 'formik';
import ImageUploader from 'quill-image-uploader';
import { useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ChangePostThumbnail from './ChangePostThumbnail';

Quill.register('modules/imageUploader', ImageUploader);

const PostEditForm = ({ data, isAdd }) => {
  const inputRef = useRef(null);
  const [createPostAPI, { isLoading }] = useCreatePostMutation();
  const [updatePostAPI, { isLoading: updateLoading }] = useUpdatePostMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const [thumbnail, setThumbnail] = useState(
    !isAdd && data?.thumbnail ? data.thumbnail : 'https://placehold.co/300'
  );

  const initialValues = {
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    thumbnail,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const onSubmit = async (values, actions) => {
    try {
      const run = isAdd ? createPostAPI : updatePostAPI;
      const res = await run({
        ...values,
        metaTitle: values.title,
        metaDescription: values.title,
        thumbnail,
      });
      if (res.error) throw res.error.data;
      actions.resetForm();
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1500,
        position: 'top-right',
        isClosable: true,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 2000,
        position: 'top-right',
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
                Authorization: `Client-ID ${
                  import.meta.env.VITE_IMGUR_CLIENTID
                }`,
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
      <ChangePostThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
      <Formik
        initialValues={isAdd ? initialValues : data}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values, handleSubmit }) => (
          <Form>
            <FastField
              component={InputField}
              placeholder='Tiêu đề'
              label='Tiêu đề'
              name='title'
              required={true}
            />
            <FormControl isInvalid={errors.content && touched.content} mt={4}>
              <FormLabel htmlFor='content'>Nội dung</FormLabel>
              <Box
                w='full'
                minH='800px'
                border='1px solid'
                borderColor='gray.600'
                borderRadius='6px'
              >
                <ReactQuill
                  ref={inputRef}
                  theme='bubble'
                  value={values.content}
                  onChange={value => setFieldValue('content', value)}
                  modules={modules}
                  formats={formats}
                  placeholder='Nhập nội dung'
                />
              </Box>
            </FormControl>

            <Button
              mt={4}
              colorScheme='pink'
              isLoading={isLoading || updateLoading}
              type='submit'
              onClick={handleSubmit}
            >
              {isAdd ? 'Tạo' : 'Cập nhật'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PostEditForm;
