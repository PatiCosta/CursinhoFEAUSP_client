import { Box, Button, Stack, StackProps, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
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
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <Stack
      direction="row"
      justify="space-between"
      align="center"
      spacing="6"
      w="100%"
      {...rest}
    >
      {loading ? (
        <strong>carregando...</strong>
      ) : (
        <Box>
          <strong>{offset + 1}</strong> -{' '}
          <strong>
            {offset + registersPerPage < totalCountOfRegisters
              ? offset + registersPerPage
              : totalCountOfRegisters}
          </strong>{' '}
          de <strong>{totalCountOfRegisters}</strong>
        </Box>
      )}
      {loading ? (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          bgColor="yellow.400"
          color="gray.50"
          isLoading
        />
      ) : (
        <Stack direction="row" spacing="2">
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 2 + siblingsCount && (
                <Text color="gray.700" width="8" textAlign="center">
                  ...
                </Text>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  number={page}
                  key={page}
                />
              )
            })}

          <PaginationItem
            onPageChange={onPageChange}
            isCurrent
            number={currentPage}
          />

          {nextPages.length > 0 &&
            nextPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  number={page}
                  key={page}
                />
              )
            })}

          {currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 1 + siblingsCount < lastPage && (
                <Text color="gray.700" width="8" textAlign="center">
                  ...
                </Text>
              )}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}
        </Stack>
      )}
    </Stack>
  )
}
