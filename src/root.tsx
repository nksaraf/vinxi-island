import { MenuProvider } from "@/components/ui/command";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrainProvider } from "@/brain";
import { DynamicIsland } from "@/components/dynamic-island";
import { useState } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Root() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider config={{}}>
        <BrainProvider>
          <CommandPalette />
          <DynamicIsland />
        </BrainProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
}
