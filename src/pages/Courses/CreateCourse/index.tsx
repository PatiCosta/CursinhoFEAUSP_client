import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useSteps,
} from '@chakra-ui/react'
import { Plus, WarningCircle } from '@phosphor-icons/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useCourses } from '../../../hooks/courses'
import { Button } from '../../../components/Button'
import { createCourseFormSchema } from './createCourseSchema'
import { StepperButtons } from './components/StepperButtons'
import { CourseFormValues } from './CourseFormValues.t'
import { CourseInfoForm } from './components/CourseInfoForm'
import { CourseSubscriptionsForm } from './components/CourseSubscriptionsForm'
import { SelectiveStagesForm } from './components/SelectiveStagesForm'
import { DocumentsForm } from './components/DocumentsForm'
import { IconButton } from '../../../components/IconButton'

export function CreateCourse() {
  const { create } = useCourses()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const formMethods = useForm<CourseFormValues>({
    resolver: yupResolver(createCourseFormSchema),
  })

  const { formState, handleSubmit } = formMethods

  const { errors } = formState

  const steps = [
    {
      title: '1º passo',
      description: 'Informações gerais',
      isInvalid: !!errors.title || !!errors.status || !!errors.informations,
    },
    {
      title: '2º passo',
      description: 'Inscrições',
      isInvalid: !!errors.subscriptions,
    },
    {
      title: '3º passo',
      description: 'Etapas do processo seletivo',
      isInvalid: !!errors.selectiveStages,
    },
    {
      title: '4º passo',
      description: 'Documentos',
      isInvalid: !!errors.documents,
    },
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleCreateCourse = useCallback(
    async (data: CourseFormValues) => {
      const formData = Object.assign({
        title: data.title,
        status: data.status === true ? 'active' : 'inactive',
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
        selectiveStages: data.selectiveStages.map((stage) => {
          if (stage.resultsDate !== undefined) {
            const [year, month, day] = stage.resultsDate.split('-')

            return {
              ...stage,
              resultsDate: new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
              ),
            }
          }

          return {
            ...stage,
          }
        }),
        documents: data.documents,
      })

      await create(formData)
      onClose()
    },
    [create, onClose],
  )

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="green"
          text="Adicionar turma"
          leftIcon={<Plus size={24} color="#F7FAFC" weight="regular" />}
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="green"
          icon={<Plus size={24} color="#F7FAFC" weight="regular" />}
          aria-label="Adicionar turma"
          onClick={onOpen}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'full', lg: '6xl' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo curso</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as="form"
            onSubmit={handleSubmit(handleCreateCourse)}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Stepper
              size={{ base: 'sm', lg: 'md' }}
              index={activeStep}
              colorScheme="yellow"
            >
              {steps.map((step, index) => (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <Flex alignItems={'center'} gap={2}>
                      {isLg && <StepTitle>{step.title}</StepTitle>}
                      {step.isInvalid && (
                        <WarningCircle
                          size={16}
                          color="#f56565"
                          weight="duotone"
                        />
                      )}
                    </Flex>

                    {isLg && (
                      <StepDescription>{step.description}</StepDescription>
                    )}
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <VStack
              w="100%"
              spacing={6}
              pt={8}
              flex="1"
              px={{ base: 2, lg: 12 }}
            >
              {activeStep === 0 ? (
                <FormProvider {...formMethods}>
                  <CourseInfoForm />
                </FormProvider>
              ) : activeStep === 1 ? (
                <FormProvider {...formMethods}>
                  <CourseSubscriptionsForm />
                </FormProvider>
              ) : activeStep === 2 ? (
                <FormProvider {...formMethods}>
                  <SelectiveStagesForm />
                </FormProvider>
              ) : (
                <FormProvider {...formMethods}>
                  <DocumentsForm />
                </FormProvider>
              )}
            </VStack>
            <ModalFooter paddingInlineEnd={0}>
              <StepperButtons
                activeStep={activeStep}
                changeActiveStep={setActiveStep}
                isFormSubmitting={formState.isSubmitting}
                totalSteps={steps.length}
              />
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
