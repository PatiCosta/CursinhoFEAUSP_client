import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../../components/Input'
import { CourseFormValues } from '../../CourseFormValues.t'
import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CurrencyInput } from '../../../../../components/CurrencyInput'

export function CourseSubscriptionsForm() {
  const { formState, register, setValue, getValues, clearErrors } =
    useFormContext<CourseFormValues>()

  const { errors } = formState

  return (
    <>
      <Box
        py={2}
        alignSelf="start"
        color="gray.700"
        display={{ base: 'block', lg: 'none' }}
      >
        <Text fontSize="xl" fontWeight="bold">
          2º passo
        </Text>
        <Text fontWeight="light">Inscrições</Text>
      </Box>
      <FormControl isInvalid={!!errors.subscriptions?.status}>
        <Text
          fontSize={12}
          color="gray.500"
          fontWeight="light"
          letterSpacing={0.5}
          mb={-1}
        >
          Status das inscrições
        </Text>
        <RadioGroup
          onChange={(value) => {
            clearErrors('subscriptions.status')
            setValue('subscriptions.status', value)
          }}
          value={getValues('subscriptions.status')}
          mt={4}
        >
          <Stack direction="row">
            <Radio value="Aberto" size={{ base: 'sm', lg: 'md' }}>
              Aberto
            </Radio>
            <Radio value="Fechado" size={{ base: 'sm', lg: 'md' }}>
              Fechado
            </Radio>
            <Radio value="Em breve" size={{ base: 'sm', lg: 'md' }}>
              Em breve
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Input
        placeholder="Período das inscrições"
        {...register('subscriptions.subscriptionSchedule')}
        error={errors.subscriptions?.subscriptionSchedule}
      />
      <CurrencyInput
        placeholder="Valor das inscrições"
        onChange={(valueString: string) => {
          clearErrors('subscriptions.price')
          setValue('subscriptions.price', valueString)
        }}
        value={getValues('subscriptions.price')}
        error={errors.subscriptions?.price}
      />
    </>
  )
}
