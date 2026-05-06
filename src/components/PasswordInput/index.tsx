import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState,
} from 'react'
import {
  FormControl,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  FormHelperText,
  //   InputLeftAddon,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { FieldError } from 'react-hook-form'

interface InputBaseProps extends InputProps {
  name: string
  placeholder: string
  error: FieldError | undefined
  hasLeftElement?: boolean
  leftElementChildren?: ReactNode
  isInvalid?: boolean
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  { name, placeholder, error = null, isInvalid, ...rest },
  ref,
) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl isInvalid={!!error || isInvalid}>
      <Text
        fontSize={11}
        color="gray.400"
        fontWeight="semibold"
        letterSpacing={0.8}
        textTransform="uppercase"
        mb={1}
      >
        {placeholder}
      </Text>
      <InputGroup>
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
          type={show ? 'text' : 'password'}
          {...rest}
        />

        <InputRightElement cursor="pointer" onClick={handleClick}>
          {show ? (
            <Eye size={20} color="#A0AEC0" weight="light" />
          ) : (
            <EyeSlash size={20} color="#A0AEC0" weight="light" />
          )}
        </InputRightElement>
      </InputGroup>
      {!!error && (
        <FormHelperText mt={1} color="red.500" fontSize="xs">
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export const PasswordInput = forwardRef(InputBase)
