import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  mb: PropTypes.number,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helper: PropTypes.string,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled, required, helper } =
    props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <FormControl isInvalid={showError} isRequired={required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup>
        <Input
          {...props}
          id={name}
          {...field}
          type={showPassword ? 'text' : type}
          disabled={disabled}
          placeholder={placeholder}
          border='1px solid'
          borderColor='gray.600'
          _hover={{
            borderColor: 'pink.400',
            outline: 0,
          }}
          _focusVisible={{}}
          _focus={{
            outline: 0,
          }}
        />
        {type === 'password' && (
          <InputRightElement width={['4rem', '4.5rem']} top='5px'>
            <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>

      {helper && <FormHelperText>{helper}</FormHelperText>}
      {showError && (
        <FormErrorMessage fontSize={['12px', '14px']} my={2}>
          {errors[name]}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export default InputField;
