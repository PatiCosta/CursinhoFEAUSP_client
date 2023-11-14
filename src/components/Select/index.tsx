import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  FormHelperText,
  Select as ChakraSelect,
  SelectProps,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface SelectBaseProps extends SelectProps {
  name: string
  selectedValue?: string
  placeholder?: string
  children: ReactNode
  error: FieldError | undefined
  hasHelperText?: boolean
  helperText?: string
}

const SelectBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectBaseProps
> = (
  { placeholder, children, error = null, hasHelperText, helperText, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraSelect
        placeholder={placeholder}
        variant="flushed"
        size="md"
        fontSize="md"
        flex="1"
        ref={ref}
        bgColor="white"
        borderColor="gray.200"
        border="1px solid"
        _focus={{
          bgColor: 'gray.100',
        }}
        _hover={{
          bgColor: 'gray.100',
        }}
        {...rest}
      >
        {children}
      </ChakraSelect>
      {!!hasHelperText && <FormHelperText mt={0}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
