import { useCallback, useState } from "react";
import { FolderBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import {
  Box,
  Button,
  FormControl,
  Checkbox,
  Spinner,
  Flash,
  Text,
  TextInput,
} from "@primer/react";
import randomColor from "randomcolor";

export default function EditJSONFile(props: FolderBlockProps) {
  const {
    content,
    context,
    isEditable,
    onUpdateContent,
    onRequestBlocksRepos,
    onRequestGitHubData,
  } = props;

  const language = getLanguageFromFilename(context.path.split("/").pop() || "");
  let fileContent;
  try {
    fileContent = JSON.parse(content);
  } catch (error) {}

  console.log({ fileContent });

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
          Edit JSON File
        </Box>
        <Box p={4}>
          {(language !== "JSON" || !fileContent) && (
            <Flash variant="danger">Error parsing JSON</Flash>
          )}
          <RenderJSON fileContent={fileContent} />
        </Box>
      </Box>
    </Box>
  );
}

function RenderJSON({ fileContent }) {
  return (
    <div>
      {Object.entries(fileContent).map((jsonEntry, i) => {
        const key = jsonEntry[0];
        const value = jsonEntry[1];

        if (typeof value === "string") {
          // stop case
          return (
            <FormControl sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl.Label sx={{ alignSelf: "center", flex: "0.2" }}>
                {key}
              </FormControl.Label>
              <TextInput sx={{ flex: "1" }} value={value} />
            </FormControl>
          );
        } else {
          if (typeof value !== "object") {
            return null;
          }
          const borderColor = randomColor();
          return (
            <Box
              borderColor={borderColor}
              borderWidth={1}
              borderStyle="solid"
              borderRadius={6}
              padding={2}
              marginTop={2}
            >
              <Box paddingBottom={2}>{key}</Box>
              <RenderJSON fileContent={value} />
            </Box>
          );
        }
      })}
    </div>
  );
}
