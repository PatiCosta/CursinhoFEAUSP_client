import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (value: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bgColor="yellow.400"
        color="gray.50"
        isDisabled
        _disabled={{
          bgColor: 'yellow.400',
          cursor: 'default',
        }}
        _hover={{
          bgColor: 'yellow.400',
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.200"
      _hover={{
        bg: 'gray.300',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
