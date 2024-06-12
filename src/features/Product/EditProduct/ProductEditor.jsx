import { Box } from '@chakra-ui/react';
import axios from 'axios';
import ImageUploader from 'quill-image-uploader';
import { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

Quill.register('modules/imageUploader', ImageUploader);
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

const ProductEditor = ({ value, handleEditor }) => {
  const inputRef = useRef(null);
  return (
    <Box
      w='full'
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
      }}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <ReactQuill
        ref={inputRef}
        theme='bubble'
        value={value}
        onChange={handleEditor}
        modules={modules}
        formats={formats}
        placeholder='Nhập nội dung....'
      />
    </Box>
  );
};

export default ProductEditor;
