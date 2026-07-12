import type { Preview } from "@storybook/tanstack-react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useScan } from "react-scan";

import { useProviders } from "../src/hooks/use-providers";

// @ts-expect-error
import "../src/default.css";

const queryClient = new QueryClient();

const Providers = useProviders(({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
));

const preview: Preview = {
  decorators: (Story) => {
    useScan({
      allowInIframe: true,
      dangerouslyForceRunInProduction: true,
    });

    return (
      <>
        <Providers>
          <>
            <Story />

            <TanStackDevtools
              config={{
                position: "bottom-left",
              }}
              plugins={[
                {
                  name: "TanStack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                {
                  name: "TanStack Query",
                  render: <ReactQueryDevtoolsPanel />,
                },
              ]}
            />
          </>
        </Providers>
      </>
    );
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
