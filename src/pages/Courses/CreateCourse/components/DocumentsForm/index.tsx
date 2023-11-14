import { useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from '../../../../../components/Input'
import { CourseFormValues } from '../../CourseFormValues.t'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { Plus, X } from '@phosphor-icons/react'

export function DocumentsForm() {
  const { formState, register, control } = useFormContext<CourseFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  })

  const { errors } = formState

  return (
    <>
      {fields.map((field, index) => (
        <Box alignSelf="start" key={field.id} w="100%">
          <Flex alignItems="center" gap={2} mb={4}>
            <IconButton
              aria-label="delete-document"
              icon={<X size={16} color="#4A5568" weight="regular" />}
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
            />
            <Text
              fontSize={{ base: 20, lg: 24 }}
              color="gray.700"
              fontWeight="semibold"
            >
              Documento
            </Text>
          </Flex>
          <Input
            placeholder="Título"
            {...register(`documents.${index}.title`)}
            error={errors.documents?.[index]?.title}
            mb={4}
          />
          <Input
            placeholder="Link para acessar o documento"
            {...register(`documents.${index}.downloadLink`)}
            error={errors.documents?.[index]?.downloadLink}
            mb={4}
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
            title: '',
            downloadLink: '',
          })
        }
        size={{ base: 'sm', lg: 'md' }}
      >
        adicionar documento
      </Button>
    </>
  )
}
