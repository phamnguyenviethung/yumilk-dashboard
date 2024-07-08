import EyeIcon from '@/assets/Icon/eye';
import EyeHideIcon from '@/assets/Icon/eyehide';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
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
    <FormControl isInvalid={showError} isRequired={required} w='full'>
      {label && (
        <FormLabel
          htmlFor={name}
          fontSize={{
            base: '0.75rem',
            lg: '1rem',
          }}
        >
          {label}
        </FormLabel>
      )}

      <InputGroup w='full'>
        <Input
          w='full'
          _hover={{
            borderColor: 'pink.400',
            outline: 0,
          }}
          _focusVisible={{}}
          _focus={{
            outline: 0,
          }}
          border='1px solid'
          borderColor='gray.600'
          {...props}
          id={name}
          {...field}
          type={showPassword ? 'text' : type}
          disabled={disabled}
          placeholder={placeholder}
          size={{
            base: 'md',
            lg: 'lg',
          }}
        />
        {type === 'password' && (
          <InputRightElement
            width={['3.8rem', '4rem', '4.5rem']}
            top={{
              base: '2px',
              lg: '5px',
            }}
          >
            <Button
              h={{
                base: '1.25rem',
                lg: '1.75rem',
              }}
              size='sm'
              onClick={handleShowPassword}
            >
              {showPassword ? <Icon as={EyeHideIcon} /> : <Icon as={EyeIcon} />}
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
