import { Box, Grid, Text } from '@chakra-ui/react'
import { Input } from '../../../../../components/Input'
import { Textarea } from '../../../../../components/TextArea'
import { useFormContext } from 'react-hook-form'
import { Switch } from '../../../../../components/Switch'
import { CourseFormValues } from '../../CourseFormValues.t'

export function CourseInfoForm() {
  const { formState, register } = useFormContext<CourseFormValues>()

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
          1º passo
        </Text>
        <Text fontWeight="light">Informações gerais</Text>
      </Box>
      <Grid
        templateColumns={{ base: '1fr', lg: '1.4fr .6fr' }}
        gap={4}
        w="100%"
      >
        <Input
          placeholder="Título"
          {...register('title')}
          error={errors.title}
        />
        <Switch
          error={errors.status}
          {...register('status')}
          placeholder="Habilitar este curso no site?"
        />
      </Grid>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 100px 1fr 1fr' }}
        gap={4}
        w="100%"
      >
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
      </Grid>
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
    </>
  )
}
