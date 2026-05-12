import {
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Button as ChakraButton,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Highlight,
} from '@chakra-ui/react'
import { CaretDown, MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isEmptyObject } from '../../../../utils/isEmptyObject'
import { Button } from '../../../../components/Button'
import { NameFilter } from './NameFilter'
import { EmailFilter } from './EmailFilter'
import { CpfFilter } from './CpfFilter'
import { PaymentStatusFilter } from './PaymentStatusFilter'
import { SchoolClassFilter } from './SchoolClassFilter'
import { useStudents } from '../../../../hooks/subscriptions'
import { useCourses } from '../../../../hooks/courses'

export interface FilterState {
  name?: string
  email?: string
  cpf?: string
  schoolClassID?: string
  paymentStatus?: string // Adicionado
}

export type HandleAddFilter = ({
  key,
  value,
}: {
  key: 'name' | 'cpf' | 'email' | 'schoolClassID' | 'paymentStatus' // Adicionado
  value: string
}) => void

export function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState<FilterState>({})

  const { changePage, list, page } = useStudents()
  const { courses } = useCourses()

  const location = useLocation()
  const navigate = useNavigate()

  const formatSearchKey = (val: string) => {
    return val === 'name'
      ? 'nome'
      : val === 'email'
      ? 'e-mail'
      : val === 'schoolClassID'
      ? 'turma'
      : val === 'paymentStatus'
      ? 'status' // Adicionado
      : 'cpf'
  }

  // Função descomentada e atualizada
  const formatsearchValue = ({ key, val }: { key: string; val: string }) => {
    if (key === 'paymentStatus') {
      switch (val) {
        case 'active':
          return 'Ativo (Assinatura)'
        case 'CONCLUIDA':
          return 'Confirmado'
        case 'PENDENTE':
          return 'Pendente'
        case 'canceled':
          return 'Cancelado'
        default:
          return val
      }
    }
    if (key === 'schoolClassID') {
      const turma = courses.find((c) => c.id === val)
      return turma ? turma.title : val
    }
    return val
  }

  const isFilterDisabled = (key: string) => {
    return Object.entries(search).some((entry) => entry[0] === key)
  }

  useEffect(() => {
    if (location.search !== '') {
      const query = Object.fromEntries(new URLSearchParams(location.search))
      list(query)
      setSearch(query)
    } else {
      list()
    }
  }, [list, page, location.search])

  const handleSearch = useCallback(() => {
    if (isEmptyObject(search)) {
      return
    }

    const searchString = '?' + new URLSearchParams(search as any).toString()

    navigate(
      { search: searchString },
      { replace: true, state: { isActive: true } },
    )
    changePage(1)
  }, [search, changePage, navigate])

  const handleAddFilter = useCallback<HandleAddFilter>(
    ({ key, value }) => {
      if (
        Object.keys(search).length !== 0 &&
        Object.keys(search).find((searchKey) => searchKey === key) !== undefined
      ) {
        return
      }

      setSearch((prev) => ({ ...prev, [key]: value }))
    },
    [search],
  )

  const handleDeleteFilter = useCallback(
    (key: string) => {
      if (
        key === 'name' ||
        key === 'cpf' ||
        key === 'email' ||
        key === 'schoolClassID' ||
        key === 'paymentStatus' // Adicionado
      ) {
        const entries = Object.entries(search)
        const filteredEntries = entries.filter((entry) => entry[0] !== key)

        const newSearch = Object.fromEntries(filteredEntries)

        setSearch(newSearch)
      }
    },
    [search],
  )

  const handleClearSearch = useCallback(() => {
    navigate({ search: '' }, { replace: true, state: { isActive: true } })
    setSearch({})
  }, [navigate])

  return (
    <>
      <Button
        bgVariant="blue"
        text="Ver filtros"
        leftIcon={<MagnifyingGlass size={20} color="#EDF2F7" weight="light" />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              Você está visualizando os filtros aplicados na lista de inscrições.
            </Text>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={ChakraButton}
                colorScheme="teal"
                rightIcon={
                  <CaretDown size={20} color="#EDF2F7" weight="light" />
                }
                mt={4}
                leftIcon={<Plus size={20} color="#EDF2F7" weight="light" />}
              >
                Adicionar filtro
              </MenuButton>
              <MenuList maxH="420px" overflowY="auto">
                <NameFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('name')}
                />

                <EmailFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('email')}
                />
                <CpfFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('cpf')}
                />
                <PaymentStatusFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('paymentStatus')}
                />
                <SchoolClassFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('schoolClassID')}
                />
              </MenuList>
            </Menu>
            <Flex direction="column" alignItems="start" gap={2} mt={8}>
              {Object.keys(search).length <= 0 ? (
                <Text fontSize={16} fontWeight="bold" color="gray.700">
                  Ainda não foi aplicado nenhum filtro
                </Text>
              ) : (
                Object.entries(search).map((value) => (
                  <Tag
                    key={value[0]}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                    size="lg"
                  >
                    <TagLabel>
                      <Highlight
                        query={formatSearchKey(value[0])}
                        styles={{
                          fontWeight: 'bold',
                          color: 'gray.50',
                          textTransform: 'uppercase',
                        }}
                      >
                        {`${formatSearchKey(value[0])}: ${formatsearchValue({
                          key: value[0],
                          val: value[1],
                        })}`}
                      </Highlight>
                    </TagLabel>
                    <TagCloseButton
                      onClick={() => handleDeleteFilter(value[0])}
                    />
                  </Tag>
                ))
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bgVariant="ghost"
              text="Limpar filtros"
              onClick={() => {
                handleClearSearch()
                onClose()
              }}
              mr={4}
              isDisabled={Object.keys(search).length <= 0}
            />
            <Button
              bgVariant="green"
              text="Salvar"
              onClick={() => {
                handleSearch()
                onClose()
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}