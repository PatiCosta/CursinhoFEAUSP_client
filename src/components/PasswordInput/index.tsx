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
        fontSize={12}
        color="gray.500"
        fontWeight="light"
        letterSpacing={0.5}
        mb={-1}
      >
        {placeholder}
      </Text>
      <InputGroup>
        <ChakraInput
          name={name}
          id={name}
          variant="flushed"
          _focus={{ borderColor: 'yellow.400' }}
          _focusVisible={{ borderColor: 'none' }}
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
