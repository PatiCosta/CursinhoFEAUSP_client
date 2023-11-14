import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  Switch as ChakraSwitch,
  InputGroup,
  InputRightElement,
  Tooltip,
  SwitchProps,
  FormLabel,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { FieldError } from 'react-hook-form'

interface SwitchBaseProps extends SwitchProps {
  name: string
  placeholder: string
  error: FieldError | undefined
  hasLeftElement?: boolean
  leftElementChildren?: ReactNode
  hasHelperText?: boolean
  helperText?: string
  isInvalid?: boolean
}

const SwitchBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SwitchBaseProps
> = ({ name, placeholder, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error} w="100%">
      <FormLabel htmlFor={name} mb={2} fontSize="sm" fontWeight="light" mr={2}>
        {placeholder}
      </FormLabel>
      <InputGroup>
        <ChakraSwitch
          id={name}
          _focus={{ borderColor: 'yellow.400' }}
          _focusVisible={{ borderColor: 'none' }}
          ref={ref}
          size="md"
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
    </FormControl>
  )
}

export const Switch = forwardRef(SwitchBase)
