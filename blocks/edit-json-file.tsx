import { useCallback, useState } from "react";
import { FolderBlockProps } from "@githubnext/blocks";
import {
  Box,
  Button,
  FormControl,
  Checkbox,
  Spinner,
  Flash,
  Text,
} from "@primer/react";

export default function EditJSONFile(props: FolderBlockProps) {
  const {
    content,
    context,
    isEditable,
    onUpdateContent,
    onRequestBlocksRepos,
    onRequestGitHubData,
  } = props;

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          Create a new page
        </Box>
        <Box p={4}></Box>
      </Box>
    </Box>
  );
}
