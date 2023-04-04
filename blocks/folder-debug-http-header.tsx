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

export default function DebugHttpHeader(props: FolderBlockProps) {
  const [headers, setHeaders] = useState<Array<Array<string>>>([]);
  const [debug, setDebug] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(() => {
    setError(undefined);
    setLoading(true);
    fetch(
      "https://cors-proxy.rickymarou.workers.dev/https://shopify.com",
      debug
        ? {
            headers: {
              "shopify-edge-cache-debug": "1",
            },
          }
        : {}
    )
      .then((res) => {
        console.log(...res.headers);
        setHeaders(Array.from(res.headers));
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debug]);

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
          Check the status of the CF cache. <br />
          <Text fontSize={1} color="color.">
            Request proxied through https://cors-proxy.rickymarou.workers.dev to
            avoid CORS. Debug header not working 😞
          </Text>
        </Box>
        <Box p={4}>
          <Box paddingBottom={4} display="flex" alignItems="center">
            <Box paddingRight={4}>
              <Button onClick={sendRequest}>Send request</Button>
            </Box>
            <Box>
              <FormControl>
                <FormControl.Label>Add debug header</FormControl.Label>
                <Checkbox checked={debug} onChange={() => setDebug(!debug)} />
              </FormControl>
            </Box>
          </Box>
          {loading && <Spinner />}
          {error && <Flash variant="danger">{String(error)}</Flash>}
          {!loading && !error && (
            <Box
              bg="canvas.subtle"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={6}
              p={3}
            >
              <table style={{ textAlign: "left" }}>
                <thead>
                  <tr>
                    <th className="p-1">header</th>
                    <th className="p-1" style={{ paddingLeft: "48px" }}>
                      value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((header, index) => (
                    <tr key={index}>
                      <td className="p-1">{header[0]}</td>
                      <td className="p-1" style={{ paddingLeft: "48px" }}>
                        {header[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
