import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  Textarea as ChakraTextarea,
  InputGroup,
  InputRightElement,
  Tooltip,
  FormHelperText,
  Text,
  TextareaProps,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { FieldError } from 'react-hook-form'

interface TextareaBaseProps extends TextareaProps {
  name: string
  placeholder: string
  error: FieldError | undefined
  hasLeftElement?: boolean
  leftElementChildren?: ReactNode
  hasHelperText?: boolean
  helperText?: string
  isInvalid?: boolean
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaBaseProps
> = (
  { name, placeholder, error = null, hasHelperText, helperText, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Text
        fontSize={12}
        color="gray.500"
        fontWeight="light"
        letterSpacing={0.5}
        mb={-1}
      >
        {placeholder}
      </Text>
      <InputGroup>
        <ChakraTextarea
          name={name}
          id={name}
          variant="flushed"
          _focus={{ borderColor: 'yellow.400' }}
          _focusVisible={{ borderColor: 'none' }}
          ref={ref}
          {...rest}
        />

        {!!error && (
          <InputRightElement h="100%" color="red.500">
            <Tooltip
              hasArrow
              label={error.message}
              bg="red.500"
              color="white"
              placement="right"
            >
              <WarningIcon />
            </Tooltip>
          </InputRightElement>
        )}
      </InputGroup>
      {!!hasHelperText && <FormHelperText mt={0}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export const Textarea = forwardRef(TextareaBase)
