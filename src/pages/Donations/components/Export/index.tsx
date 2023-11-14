import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Button } from '../../../../components/Button'
import { FileXls } from '@phosphor-icons/react'
import { IconButton } from '../../../../components/IconButton'
import { useEffect, useState } from 'react'
import { useDonations } from '../../../../hooks/donations'

export interface FilterState {
  name?: string
  email?: string
  cpf?: string
  paymentStatus?: string
  initValue?: string
  endValue?: string
}

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
    return val === 'active'
      ? 'Confirmado'
      : val === 'canceled'
      ? 'Cancelado'
      : 'Sem informação ainda'
  }
  return val
}

export function Export() {
  const { excelExport } = useDonations()
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState<FilterState>({})
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (location.search !== '') {
      const query = Object.fromEntries(new URLSearchParams(location.search))
      setSearch(query)
    } else {
      setSearch({})
    }
  }, [location.search])

  return (
    <>
      {isLg ? (
        <Button
          bgVariant="green"
          text="Exportar"
          leftIcon={<FileXls size={24} color="#F7FAFC" weight="regular" />}
          onClick={onOpen}
        />
      ) : (
        <IconButton
          bgVariant="green"
          icon={
            <FileXls
              size={16}
              color="#F7FAFC"
              weight="regular"
              style={{ flexShrink: '0' }}
              onClick={onOpen}
            />
          }
          aria-label="Exportar"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered={!isLg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar em excel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={16}>
              {Object.keys(search).length <= 0
                ? 'Você ainda não selecionou nenhum filtro. Por favor selecione os filtros desejados para poder exportar.'
                : 'Você irá exportar em excel a lista de doações com os filtros abaixo:'}
            </Text>
            <Flex direction="column" alignItems="start" gap={2} mt={8}>
              {Object.keys(search).length > 0 &&
                Object.entries(search).map((value) => (
                  <Flex key={value[0]} gap={2}>
                    <Text
                      textTransform="uppercase"
                      fontWeight="bold"
                      color="gray.700"
                      letterSpacing="0.2px"
                      fontSize="14px"
                    >{`${formatSearchKey(value[0])}:`}</Text>
                    <Text fontSize="14px">{`${formatsearchValue({
                      key: value[0],
                      val: value[1],
                    })}`}</Text>
                  </Flex>
                ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            {Object.keys(search).length >= 0 && (
              <Button
                bgVariant="green"
                text="Exportar"
                onClick={() => {
                  setIsExporting(true)
                  excelExport(search)
                  setIsExporting(false)
                }}
                mr={4}
                isLoading={isExporting}
              />
            )}
            <Button
              bgVariant="ghost"
              text="Voltar"
              onClick={() => {
                onClose()
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
