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
import { useStudents } from '../../../../hooks/subscriptions'

export interface FilterState {
  name?: string
  email?: string
  cpf?: string
  schoolClassID?: string
}

export type HandleAddFilter = ({
  key,
  value,
}: {
  key: 'name' | 'cpf' | 'email' | 'schoolClassID'
  value: string
}) => void

export function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState<FilterState>({})

  const { changePage, list, page } = useStudents()

  const location = useLocation()
  const navigate = useNavigate()

  const formatSearchKey = (val: string) => {
    return val === 'name'
      ? 'nome'
      : val === 'email'
      ? 'e-mail'
      : val === 'schoolClassID'
      ? 'turma'
      : 'cpf'
  }

  // const formatsearchValue = ({ key, val }: { key: string; val: string }) => {
  // if (key === 'paymentStatus') {
  //   return val === 'active'
  //     ? 'Confirmado'
  //     : val === 'canceled'
  //     ? 'Cancelado'
  //     : 'Sem informação ainda'
  // }
  // return val
  // }

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

      if (key === 'name') {
        setSearch({ ...search, name: value })
      }

      if (key === 'cpf') {
        setSearch({ ...search, cpf: value })
      }

      if (key === 'email') {
        setSearch({ ...search, email: value })
      }

      if (key === 'schoolClassID') {
        setSearch({ ...search, schoolClassID: value })
      }
    },
    [search],
  )

  const handleDeleteFilter = useCallback(
    (key: string) => {
      if (
        key === 'name' ||
        key === 'cpf' ||
        key === 'email' ||
        key === 'schoolClassID'
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
              Você está visualizando os filtros aplicados na lista de doações.
            </Text>
            <Menu>
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
              <MenuList>
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
                {/* <PaymentStatusFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('schoolClassID')}
                /> */}
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
                        {/* {`${formatSearchKey(value[0])}: ${formatsearchValue({
                          key: value[0],
                          val: value[1],
                        })}`} */}
                        {`${formatSearchKey(value[0])}: ${value[1]}`}
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
                onClose()
                handleClearSearch()
              }}
              mr={4}
              isDisabled={Object.keys(search).length <= 0}
            />
            <Button
              bgVariant="green"
              text="Salvar"
              onClick={() => {
                onClose()
                handleSearch()
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
