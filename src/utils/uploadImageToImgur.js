import axios from 'axios';

const upload = async formData => {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_ENDPOINT + '/api/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res;
  } catch (error) {
    console.log('Image upload error');
  }
};

export default upload;
