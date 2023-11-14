import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import {
  FormControl,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  Tooltip,
  InputLeftElement,
  FormHelperText,
  //   InputLeftAddon,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
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
          variant="flushed"
          //   size="lg"
          //   pl={2}
          //   flex="1"
          _focus={{ borderColor: 'yellow.400' }}
          _focusVisible={{ borderColor: 'none' }}
          ref={ref}
          //   bgColor="white"
          //   borderColor="gray.200"
          //   border="1px solid"
          //   borderLeft={hasAddOn ? '0px' : 'initial'}
          //   fontSize="md"
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

export const Input = forwardRef(InputBase)
