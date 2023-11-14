import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { useCourses } from '../../../../../hooks/courses'
import { Button } from '../../../../../components/Button'
import { Input } from '../../../../../components/Input'
import { Textarea } from '../../../../../components/TextArea'
import { IconButton } from '../../../../../components/IconButton'

const createSelectiveStageFormSchema = Yup.object().shape({
  when: Yup.string().required('A data do estágio é obrigatório'),
  resultsDate: Yup.string().nullable(),
  description: Yup.string().required('A descrição da etapa é obrigatória'),
})

type FormValues = {
  when: string
  resultsDate: undefined | null | string
  description: string
}

export function CreateSelectiveStage({
  courseId,
  courseTitle,
}: {
  courseId: string | undefined
  courseTitle: string
}) {
  const { addSelectiveStage } = useCourses()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isResultsDateUndefined, setIsResultsDateUndefined] = useState(false)
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const { register, formState, handleSubmit, setValue } = useForm<FormValues>({
    resolver: yupResolver(createSelectiveStageFormSchema),
  })

  const { errors } = formState

  const handleCreateSelectiveStage = useCallback(
    async (data: FormValues) => {
      const formData = Object.assign({
        when: data.when,
        description: data.description,
      })

      if (data.resultsDate !== null) {
        formData.resultsDate = data.resultsDate
      }

      await addSelectiveStage({ id: courseId, data: formData })
      onClose()
    },
    [addSelectiveStage, onClose, courseId],
  )

  const changeIsResultsDateUndefined = useCallback(async () => {
    setIsResultsDateUndefined(!isResultsDateUndefined)
    if (!isResultsDateUndefined === true) {
      setValue('resultsDate', null)
    } else {
      setValue('resultsDate', new Date().toISOString().split('T')[0])
    }
  }, [isResultsDateUndefined, setValue])

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="green"
          text="Adicionar etapa"
          leftIcon={<Plus size={24} color="#F7FAFC" weight="regular" />}
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="green"
          icon={<Plus size={12} color="#F7FAFC" weight="regular" />}
          aria-label="Adicionar etapa"
          onClick={onOpen}
          style={{ flexShrink: '0' }}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleCreateSelectiveStage)}
        >
          <ModalHeader>Adicionar etapa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você está adicionando uma etapa do processo seletivo para{' '}
              {courseTitle}!
            </Text>
            <VStack w="100%" spacing={4} pt={8}>
              <Input
                placeholder="Quando acontecerá esta etapa?"
                {...register('when')}
                error={errors.when}
              />
              <Input
                placeholder="Quando sairão os resultados desta etapa?"
                {...register('resultsDate')}
                error={errors.resultsDate}
                type="date"
                isDisabled={isResultsDateUndefined}
              />
              <FormControl display="flex" alignItems="center" size="sm">
                <Switch
                  id="date-undefined"
                  mr={2}
                  isChecked={isResultsDateUndefined}
                  onChange={changeIsResultsDateUndefined}
                />
                <FormLabel htmlFor="date-undefined" mb="0">
                  Data ainda não definida
                </FormLabel>
              </FormControl>
              <Textarea
                placeholder="Descrição"
                {...register('description')}
                error={errors.description}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant="green"
              text="Salvar"
              mr={4}
              type="submit"
              isLoading={formState.isSubmitting}
            />
            <Button bgVariant="ghost" text="Cancelar" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
