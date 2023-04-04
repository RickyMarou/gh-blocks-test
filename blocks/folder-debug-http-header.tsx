import { useCallback, useState } from "react";
import { FolderBlockProps } from "@githubnext/blocks";
import { Box, Button } from "@primer/react";

export default function DebugHttpHeader(props: FolderBlockProps) {
  const [headers, setHeaders] = useState<{ [key: string]: string }>({
    "x-cache-key": "a",
    "x-cache-status": "a",
    "x-content-type-options": "a",
    "x-worker-name": "a",
    "x-worker-revision": "a",
  });

  const sendRequest = useCallback(() => {
    fetch("https://cors-proxy.rickymarou.workers.dev/https://shopify.com", {
      // headers: {
      //   "shopify-edge-cache-debug": "1",
      // },
    }).then((res) => {
      console.log(...res.headers);
    });
  }, []);
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
          Check the status of the CF cache from your region
        </Box>
        <Box p={4}>
          <Box paddingBottom={4}>
            <Button onClick={sendRequest}>Send request</Button>
          </Box>
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
                {Object.keys(headers).map((headerKey, index) => (
                  <tr key={index}>
                    <td className="p-1">{headerKey}</td>
                    <td className="p-1" style={{ paddingLeft: "48px" }}>
                      {headers[headerKey]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
