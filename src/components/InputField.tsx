import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { FC, InputHTMLAttributes } from 'react';

type IProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

const InputField: FC<IProps> = ({ label, textarea, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {!textarea ? (
        <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
      ) : (
        <Textarea {...field} {...props} id={field.name} placeholder={props.placeholder} />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
