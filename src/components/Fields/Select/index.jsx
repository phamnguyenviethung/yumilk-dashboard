import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

SelectField.propTypes = {
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

function SelectField(props) {
  const { field, form, label, placeholder, disabled, required, helper } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <FormControl isInvalid={showError} isRequired={required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Select
        {...props}
        id={name}
        colorScheme='pink'
        disabled={disabled}
        placeholder={placeholder}
        _hover={{
          borderColor: 'pink.400',
          outline: 0,
        }}
        _focusVisible={{}}
        _focus={{
          outline: 0,
        }}
        size={{
          base: 'md',
          lg: 'lg',
        }}
      >
        {props?.options?.map(opt => {
          return (
            <option value={opt.value} key={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </Select>
      {helper && <FormHelperText>{helper}</FormHelperText>}
      {showError && (
        <FormErrorMessage fontSize={['12px', '14px']} my={2}>
          {errors[name]}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export default SelectField;
