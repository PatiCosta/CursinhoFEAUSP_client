import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface InputBaseProps extends InputProps {
  name: string
  placeholder: string
  //   children: ReactNode
  error: FieldError | undefined
  hasLeftElement?: boolean
  leftElementChildren?: ReactNode
  hasHelperText?: boolean
  helperText?: string
  isInvalid?: boolean
  //   hasAddOn?: boolean
  //   addOnChildren?: ReactNode
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  {
    name,
    placeholder,
    // children,
    error = null,
    hasLeftElement,
    leftElementChildren,
    hasHelperText,
    helperText,
    // isInvalid,
    // hasAddOn,
    // addOnChildren,
    ...rest
  },
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
      <InputGroup
      // _focusWithin={{
      //   borderColor: 'blue.500',
      // }}
      // transition="all .2s ease"
      >
        {hasLeftElement && (
          <InputLeftElement
            color="gray.400"
            pointerEvents="none"
            width="fit-content"
            h="fit-content"
            left={2}
            fontSize="xs"
          >
            {leftElementChildren}
          </InputLeftElement>
        )}
        {/* {hasAddOn && (
          <InputLeftAddon
            h="auto"
            paddingInlineStart={2}
            paddingInlineEnd={2}
            bgColor="white"
            borderRight="none"
            color="gray.700"
          >
            {addOnChildren}
          </InputLeftAddon>
        )} */}
        <ChakraInput
          name={name}
          id={name}
          variant="outline"
          borderColor="gray.200"
          borderRadius="lg"
          bg="white"
          fontSize="sm"
          _hover={{ borderColor: 'gray.300' }}
          _focus={{ borderColor: 'brand.blue', boxShadow: '0 0 0 1px #2a255a' }}
          _focusVisible={{ outline: 'none' }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && (
        <FormErrorMessage fontSize="xs" mt={1}>
          {error.message}
        </FormErrorMessage>
      )}
      {!!hasHelperText && <FormHelperText mt={0}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
