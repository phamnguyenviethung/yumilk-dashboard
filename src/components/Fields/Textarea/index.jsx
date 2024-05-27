import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';

TextareaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helper: PropTypes.string,
};

// TextareaField.defaultProps = {
//   type: 'text',
//   label: '',
//   placeholder: '',
//   disabled: false,
//   required: false,
//   h: '150px',
//   helper: '',
// };

function TextareaField(props) {
  const { field, form, type, label, placeholder, disabled, required, helper } =
    props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormControl isInvalid={showError} isRequired={required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Textarea
        h='150px'
        {...props}
        id={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
      />
      {helper && <FormHelperText> {helper}</FormHelperText>}

      {showError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
    </FormControl>
  );
}

export default TextareaField;
