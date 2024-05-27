import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

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

// InputField.defaultProps = {
//   type: 'text',
//   label: '',
//   placeholder: '',
//   disabled: false,
//   required: false,
//   helper: '',
// };

function InputField(props) {
  const { field, form, type, label, placeholder, disabled, required, helper } =
    props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <FormControl isInvalid={showError} isRequired={required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Input
        {...props}
        id={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        _focus={{
          outline: 0,
        }}
      />
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
