import { MenuDivider, MenuItem, MenuOptionGroup, Text } from '@chakra-ui/react'
import { GraduationCap } from '@phosphor-icons/react'
import { useCourses } from '../../../../hooks/courses'

interface SchoolClassFilterProps {
  handleAddFilter: (data: { key: 'schoolClassID'; value: string }) => void
  isDisabled: boolean
}

export function SchoolClassFilter({ handleAddFilter, isDisabled }: SchoolClassFilterProps) {
  const { courses } = useCourses()

  const activeCourses = courses.filter((c) => c.subscriptions?.status === 'Aberto')
  const otherCourses = courses.filter((c) => c.subscriptions?.status !== 'Aberto')

  return (
    <>
      <MenuDivider />
      <MenuOptionGroup title="Filtrar por Turma">
        {courses.length === 0 && (
          <MenuItem isDisabled>
            <Text fontSize="sm" color="gray.400">Carregando turmas...</Text>
          </MenuItem>
        )}

        {activeCourses.map((turma) => (
          <MenuItem
            key={turma.id}
            isDisabled={isDisabled}
            icon={<GraduationCap size={16} color={turma.informations?.color || '#2a255a'} weight="duotone" />}
            onClick={() => handleAddFilter({ key: 'schoolClassID', value: turma.id! })}
          >
            {turma.title}
          </MenuItem>
        ))}

        {otherCourses.length > 0 && activeCourses.length > 0 && <MenuDivider />}

        {otherCourses.map((turma) => (
          <MenuItem
            key={turma.id}
            isDisabled={isDisabled}
            icon={<GraduationCap size={16} color="gray" weight="duotone" />}
            onClick={() => handleAddFilter({ key: 'schoolClassID', value: turma.id! })}
          >
            <Text color="gray.400">{turma.title}</Text>
          </MenuItem>
        ))}
      </MenuOptionGroup>
    </>
  )
}
