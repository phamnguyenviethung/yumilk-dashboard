import { Input } from '@chakra-ui/react';

const Search = ({ handleSearch }) => {
  return <Input onChange={handleSearch} placeholder='Search by name' />;
};

export default Search;
