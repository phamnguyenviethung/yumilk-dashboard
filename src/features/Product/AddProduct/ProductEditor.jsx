import { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ImageUploader from 'quill-image-uploader';
import { useUploadImageMutation } from '@/apis/image';

Quill.register('modules/imageUploader', ImageUploader);

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
const ProductEditor = () => {
  const quillRef = useRef(null);
  const [value, setValue] = useState('');
  const [uploadImage] = useUploadImageMutation();

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
    // imageUploader: {
    //   upload: async file => {
    //     try {
    //       const formData = new FormData();
    //       formData.append('image', file);
    //       formData.append('title', 'file');
    //       formData.append('description', 'file');

    //       const res = await uploadImage(formData);
    //       if (res.error) throw res.error.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // },
  };

  return (
    <ReactQuill
      theme='bubble'
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
};

export default ProductEditor;
