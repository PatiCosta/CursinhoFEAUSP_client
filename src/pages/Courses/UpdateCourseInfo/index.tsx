import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useCourses } from '../../../hooks/courses'
import { useForm } from 'react-hook-form'
import { UpdateCourseInfoFormValues } from './UpdateCourseInfoFormValues.t'
import { updateCourseInfoSchema } from './updateCourseInfoSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { Button } from '../../../components/Button'
import { PencilSimpleLine } from '@phosphor-icons/react'
import { Input } from '../../../components/Input'
import { Textarea } from '../../../components/TextArea'
import { CurrencyInput } from '../../../components/CurrencyInput'
import { Course } from '../../../interfaces/Course.interface'
import { IconButton } from '../../../components/IconButton'

interface UpdateCourseInfoProps {
  id: string | undefined
  course: Course
}

export function UpdateCourseInfo({ id, course }: UpdateCourseInfoProps) {
  const { update } = useCourses()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const formMethods = useForm<UpdateCourseInfoFormValues>({
    resolver: yupResolver(updateCourseInfoSchema),
    defaultValues: {
      title: course.title,
      informations: {
        classContent: course.informations.classContent,
        color: course.informations.color,
        dateSchedule: course.informations.dateSchedule,
        description: course.informations.description,
        hourSchedule: course.informations.hourSchedule,
        observations: course.informations.observations,
        whoCanParticipate: course.informations.whoCanParticipate,
      },
      subscriptions: {
        price: course.subscriptions.price.toString(),
        status: course.subscriptions.status,
        subscriptionSchedule: course.subscriptions.subscriptionSchedule,
      },
    },
  })

  const {
    formState,
    handleSubmit,
    register,
    clearErrors,
    setValue,
    getValues,
  } = formMethods

  const { errors } = formState

  const handleUpdateCourse = useCallback(
    async (data: UpdateCourseInfoFormValues) => {
      const formData = Object.assign({
        title: data.title,
        informations: {
          ...data.informations,
          observations:
            data.informations.observations !== ''
              ? data.informations.observations
              : 'Não há observações',
        },
        subscriptions: {
          ...data.subscriptions,
          price: Number(data.subscriptions.price) * 100,
        },
      })

      await update({ data: formData, id })
      onClose()
    },
    [update, onClose, id],
  )

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="blue"
          text="Editar informações"
          leftIcon={
            <PencilSimpleLine size={24} color="#F7FAFC" weight="regular" />
          }
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="blue"
          icon={<PencilSimpleLine size={16} color="#F7FAFC" weight="regular" />}
          aria-label="Editar informações"
          onClick={onOpen}
        />
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'full', lg: 'xl' }}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleUpdateCourse)}>
          <ModalHeader>Adicionar etapa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você está editando as informações cadastradas em {course.title}!
            </Text>
            <VStack w="100%" spacing={4} pt={8}>
              <Input
                placeholder="Título"
                {...register('title')}
                error={errors.title}
              />
              <Input
                placeholder="Dias da semana que terão aula"
                {...register('informations.dateSchedule')}
                error={errors.informations?.dateSchedule}
              />
              <Input
                type="color"
                w="36px"
                variant="unstyled"
                h="36px"
                mt={2}
                placeholder="Cor do curso"
                {...register('informations.color')}
                error={errors.informations?.color}
              />
              <Input
                placeholder="Horário da aula"
                {...register('informations.hourSchedule')}
                error={errors.informations?.hourSchedule}
              />
              <Input
                placeholder="Conteúdo do curso"
                {...register('informations.classContent')}
                error={errors.informations?.classContent}
              />
              <Input
                placeholder="Quem pode participar deste curso?"
                {...register('informations.whoCanParticipate')}
                error={errors.informations?.whoCanParticipate}
              />
              <Textarea
                placeholder="Descrição geral do curso"
                {...register('informations.description')}
                error={errors.informations?.description}
              />
              <Textarea
                placeholder="Observações"
                {...register('informations.observations')}
                error={errors.informations?.observations}
              />
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
                    <Radio value="Aberto">Aberto</Radio>
                    <Radio value="Fechado">Fechado</Radio>
                    <Radio value="Em breve">Em breve</Radio>
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
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant="ghost"
              text="Cancelar"
              onClick={onClose}
              mr={4}
            />
            <Button
              bgVariant="green"
              text="Salvar"
              type="submit"
              isLoading={formState.isSubmitting}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
