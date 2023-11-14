import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  FormControl,
  NumberInput as ChakraNumberInput,
  InputGroup,
  InputRightElement,
  Tooltip,
  InputLeftElement,
  NumberInputProps,
  NumberInputField,
  Text,
  FormHelperText,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { FieldError } from 'react-hook-form'

interface CurrencyInputBaseProps extends NumberInputProps {
  placeholder: string
  error: FieldError | undefined
  isInvalid?: boolean
}

const CurrencyInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CurrencyInputBaseProps
> = (
  {
    placeholder,
    // children,
    error = null,
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
      <InputGroup>
        <InputLeftElement pointerEvents="none" width="fit-content" h="100%">
          R$
        </InputLeftElement>
        <ChakraNumberInput
          variant="flushed"
          precision={2}
          //   flex="1"
          _focus={{ borderColor: 'yellow.400' }}
          _focusVisible={{ borderColor: 'none' }}
          ref={ref}
          {...rest}
        >
          <NumberInputField
            pl={6}
            _focus={{ borderColor: 'yellow.400' }}
            _focusVisible={{ borderColor: 'none' }}
          />
        </ChakraNumberInput>

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
      <FormHelperText fontSize="xs">
        Utilize &quot;.&quot; para separação dos decimais. Por exemplo
        &quot;25.90&quot;
      </FormHelperText>
    </FormControl>
  )
}

export const CurrencyInput = forwardRef(CurrencyInputBase)
