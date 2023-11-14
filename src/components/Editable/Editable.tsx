import {
  ButtonGroup,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  useEditableControls,
  Editable as ChakraEditable,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { CheckCircle, PencilSimpleLine, XCircle } from '@phosphor-icons/react'
import { useState } from 'react'

interface EditableProps {
  value: string
  onSave: (value: string) => void
  loading: boolean
}

export function Editable({ value, onSave, loading }: EditableProps) {
  const [editableValue, setEditableValue] = useState(value)

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="xs" ml={2}>
        <Button
          {...getSubmitButtonProps()}
          bgColor="transparent"
          size="xs"
          py={0}
          px={0}
        >
          <CheckCircle size={20} color="#718096" weight="light" />
        </Button>
        <Button
          {...getCancelButtonProps()}
          bgColor="transparent"
          size="xs"
          py={0}
          px={0}
        >
          <XCircle size={20} color="#718096" weight="light" />
        </Button>
      </ButtonGroup>
    ) : loading ? (
      <Spinner size="xs" color="gray.700" ml={2} />
    ) : (
      <Flex justifyContent="center" ml={2}>
        <PencilSimpleLine
          size={18}
          color="#718096"
          weight="light"
          {...getEditButtonProps()}
          cursor="pointer"
        />
      </Flex>
    )
  }

  return (
    <ChakraEditable
      textAlign="center"
      defaultValue={editableValue}
      isPreviewFocusable={false}
      display="flex"
      alignItems="center"
      onSubmit={() => {
        onSave(editableValue)
      }}
    >
      <EditablePreview />
      <Input
        as={EditableInput}
        size="xs"
        borderBottom="solid .5px"
        my={0}
        variant="flushed"
        onChange={(e) => setEditableValue(e.target.value)}
      />
      <EditableControls />
    </ChakraEditable>
  )
}
