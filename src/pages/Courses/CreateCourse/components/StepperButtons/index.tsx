import { Button } from '../../../../../components/Button'

interface StepperButtonsProps {
  activeStep: number
  totalSteps: number
  changeActiveStep: (activeStep: number) => void
  isFormSubmitting: boolean
}

export function StepperButtons({
  activeStep,
  totalSteps,
  changeActiveStep,
  isFormSubmitting,
}: StepperButtonsProps) {
  return (
    <>
      {activeStep !== 0 && (
        <Button
          bgVariant="blue"
          text="← Anterior"
          onClick={() => changeActiveStep(activeStep - 1)}
          mr={4}
        />
      )}
      {activeStep !== totalSteps - 1 && (
        <Button
          bgVariant="blue"
          text="Próximo →"
          onClick={() => changeActiveStep(activeStep + 1)}
        />
      )}
      {activeStep === totalSteps - 1 && (
        <Button
          bgVariant="green"
          text="Salvar"
          type="submit"
          isLoading={isFormSubmitting}
        />
      )}
    </>
  )
}
