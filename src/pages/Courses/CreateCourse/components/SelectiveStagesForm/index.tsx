import { useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from '../../../../../components/Input'
import { CourseFormValues } from '../../CourseFormValues.t'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Plus, X } from '@phosphor-icons/react'
import { Textarea } from '../../../../../components/TextArea'
import { useCallback, useEffect, useState } from 'react'

export function SelectiveStagesForm() {
  const { formState, register, control, setValue } =
    useFormContext<CourseFormValues>()
  const [isResultsDateUndefined, setIsResultsDateUndefined] = useState(false)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'selectiveStages',
  })

  const { errors } = formState

  useEffect(() => {
    if (fields.length === 0) {
      append({
        when: '',
        description: '',
        resultsDate: '',
      })
    }
  }, [append, fields])

  const changeIsResultsDateUndefined = useCallback(
    async (index: number) => {
      setIsResultsDateUndefined(!isResultsDateUndefined)
      if (!isResultsDateUndefined === true) {
        setValue(`selectiveStages.${index}.resultsDate`, undefined)
      } else {
        setValue(
          `selectiveStages.${index}.resultsDate`,
          new Date().toISOString().split('T')[0],
        )
      }
    },
    [isResultsDateUndefined, setValue],
  )

  return (
    <>
      {fields.map((field, index) => (
        <Box alignSelf="start" key={field.id} w="100%">
          <Flex alignItems="center" gap={2} mb={4}>
            <IconButton
              aria-label="delete-stage"
              icon={<X size={16} color="#4A5568" weight="regular" />}
              variant="outline"
              size="sm"
              onClick={() => index !== 0 && remove(index)}
              isDisabled={index === 0}
            />
            <Text
              fontSize={{ base: 20, lg: 24 }}
              color="gray.700"
              fontWeight="semibold"
            >
              Etapa {index + 1}
            </Text>
          </Flex>
          <Input
            placeholder="Quando acontecerá esta etapa? (Caso ainda não exista uma data estipulada, colocar “Data não definida”)"
            {...register(`selectiveStages.${index}.when`)}
            error={errors.selectiveStages?.[index]?.when}
          />
          <Flex
            alignItems="center"
            gap={{ base: 0, lg: 4 }}
            direction={{ base: 'column', lg: 'row' }}
            my={8}
          >
            <Input
              placeholder="Quando sairão os resultados desta etapa?"
              {...register(`selectiveStages.${index}.resultsDate`)}
              error={errors.selectiveStages?.[index]?.resultsDate}
              type="date"
              size={{ base: 'sm', lg: 'md' }}
              isDisabled={isResultsDateUndefined}
              mb={4}
            />
            <FormControl display="flex" alignItems="center" size="sm">
              <Switch
                id="date-undefined"
                mr={2}
                isChecked={isResultsDateUndefined}
                onChange={() => changeIsResultsDateUndefined(index)}
              />
              <FormLabel
                htmlFor="date-undefined"
                mb="0"
                fontSize={{ base: 'xs', lg: 'md' }}
              >
                Data dos resultados ainda não definida
              </FormLabel>
            </FormControl>
          </Flex>
          <Textarea
            placeholder="Descrição geral"
            {...register(`selectiveStages.${index}.description`)}
            error={errors.selectiveStages?.[index]?.description}
          />
        </Box>
      ))}
      <Button
        leftIcon={<Plus size={24} color="#4A5568" weight="regular" />}
        colorScheme="gray"
        variant="outline"
        alignSelf="start"
        color="gray.700"
        onClick={() =>
          append({
            when: '',
            description: '',
            resultsDate: '',
          })
        }
        size={{ base: 'sm', lg: 'md' }}
      >
        adicionar etapa
      </Button>
    </>
  )
}
