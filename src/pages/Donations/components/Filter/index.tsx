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
import { useDonations } from '../../../../hooks/donations'
import { isEmptyObject } from '../../../../utils/isEmptyObject'
import { Button } from '../../../../components/Button'
import { NameFilter } from './NameFilter'
import { EmailFilter } from './EmailFilter'
import { CpfFilter } from './CpfFilter'
import { PaymentStatusFilter } from './PaymentStatusFilter'
import { ValueFilter } from './ValueFilter'

export interface FilterState {
  name?: string
  email?: string
  cpf?: string
  paymentStatus?: string
  initValue?: string
  endValue?: string
}

export type HandleAddFilter = ({
  key,
  value,
}: {
  key: 'name' | 'cpf' | 'email' | 'paymentStatus'
  value: string
}) => void

export function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState<FilterState>({})

  const { changePage, list } = useDonations()

  const location = useLocation()
  const navigate = useNavigate()

  const formatSearchKey = (val: string) => {
    return val === 'name'
      ? 'nome'
      : val === 'email'
      ? 'e-mail'
      : val === 'paymentStatus'
      ? 'status de pagamento'
      : val === 'initValue'
      ? 'Valor inicial'
      : val === 'endValue'
      ? 'Valor final'
      : 'cpf'
  }

  const formatsearchValue = ({ key, val }: { key: string; val: string }) => {
    if (key === 'initValue' || key === 'endValue') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(val))
    }

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
    return val
  }

  const isFilterDisabled = (key: string) => {
    return Object.entries(search).some((entry) => entry[0] === key)
  }

  useEffect(() => {
    if (location.search !== '') {
      const query = Object.fromEntries(new URLSearchParams(location.search))
      setSearch(query)
      // Nota: O list(query) foi removido daqui para evitar double fetch se o componente pai já gerencia isso, 
      // mas se for necessário manter a lógica original:
      // list(query)
    } else {
      // list()
      setSearch({})
    }
  }, [location.search])

  const handleSearch = useCallback(() => {
    if (isEmptyObject(search)) {
        // Se busca vazia, limpa
        navigate({ search: '' }, { replace: true })
        list()
        return
    }

    const searchString = '?' + new URLSearchParams(search as any).toString()

    navigate(
      { search: searchString },
      { replace: true, state: { isActive: true } },
    )
    // O useEffect ou o hook useDonations deve reagir à mudança de URL
    // Se não, chamamos list(search) aqui.
    list(search) 
    changePage(1)
  }, [search, changePage, navigate, list])

  const handleAddValueFilter = useCallback(
    ({ initValue, endValue }: { initValue: string; endValue: string }) => {
      setSearch({ ...search, initValue, endValue })
    },
    [search],
  )

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
        const newSearch = { ...search }
        // @ts-ignore
        delete newSearch[key]
        setSearch(newSearch)
    },
    [search],
  )

  const handleClearSearch = useCallback(() => {
    navigate({ search: '' }, { replace: true, state: { isActive: true } })
    setSearch({})
    list({})
  }, [navigate, list])

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
          <ModalHeader>Exportar em excel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              {Object.keys(search).length <= 0
                ? 'Você ainda não selecionou nenhum filtro.'
                : 'Filtros aplicados:'}
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
                {/* O novo componente de filtro */}
                <PaymentStatusFilter
                  handleAddFilter={handleAddFilter}
                  isDisabled={isFilterDisabled('paymentStatus')}
                />
                <ValueFilter
                  handleAddFilter={handleAddValueFilter}
                  isDisabled={
                    isFilterDisabled('initValue') ||
                    isFilterDisabled('endValue')
                  }
                />
              </MenuList>
            </Menu>
            <Flex direction="column" alignItems="start" gap={2} mt={8}>
              {Object.keys(search).length > 0 &&
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
                          val: value[1] as string,
                        })}`}
                      </Highlight>
                    </TagLabel>
                    <TagCloseButton
                      onClick={() => handleDeleteFilter(value[0])}
                    />
                  </Tag>
                ))}
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
              text="Filtrar"
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