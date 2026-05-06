import { Box, Flex, IconButton, Stack, StackProps, Text } from '@chakra-ui/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { PaginationItem } from './PaginationItem'

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

interface PaginationProps extends StackProps {
  totalCountOfRegisters: number
  currentPage: number
  onPageChange: (page: number) => void
  registersPerPage: number
  loading?: boolean
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage,
  loading = false,
  ...rest
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)
  const offset = (currentPage - 1) * registersPerPage

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []

  return (
    <Stack direction="row" justify="space-between" align="center" spacing="4" w="100%" {...rest}>
      {loading ? (
        <Text fontSize="sm" color="gray.400">Carregando...</Text>
      ) : (
        <Text fontSize="sm" color="gray.500">
          <Box as="span" fontWeight="semibold" color="gray.700">{offset + 1}</Box>
          {' – '}
          <Box as="span" fontWeight="semibold" color="gray.700">
            {offset + registersPerPage < totalCountOfRegisters
              ? offset + registersPerPage
              : totalCountOfRegisters}
          </Box>
          {' de '}
          <Box as="span" fontWeight="semibold" color="gray.700">{totalCountOfRegisters}</Box>
        </Text>
      )}

      <Flex align="center" gap={1}>
        <IconButton
          aria-label="Página anterior"
          icon={<CaretLeft size={14} weight="bold" />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          isDisabled={currentPage === 1 || loading}
          onClick={() => onPageChange(currentPage - 1)}
          borderRadius="md"
        />

        <Stack direction="row" spacing="1">
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 2 + siblingsCount && (
                <Text color="gray.400" width="8" textAlign="center" lineHeight="32px" fontSize="sm">
                  ...
                </Text>
              )}
            </>
          )}

          {previousPages.map((page) => (
            <PaginationItem onPageChange={onPageChange} number={page} key={page} />
          ))}

          <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} />

          {nextPages.map((page) => (
            <PaginationItem onPageChange={onPageChange} number={page} key={page} />
          ))}

          {currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 1 + siblingsCount < lastPage && (
                <Text color="gray.400" width="8" textAlign="center" lineHeight="32px" fontSize="sm">
                  ...
                </Text>
              )}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}
        </Stack>

        <IconButton
          aria-label="Próxima página"
          icon={<CaretRight size={14} weight="bold" />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          isDisabled={currentPage === lastPage || loading}
          onClick={() => onPageChange(currentPage + 1)}
          borderRadius="md"
        />
      </Flex>
    </Stack>
  )
}
