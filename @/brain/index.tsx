import React, {
  StrictMode,
  createContext,
  use,
  useContext,
  useMemo,
} from "react";
import PartySocket from "partysocket";
import { createStore } from "tinybase";
import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/debug/ui-react";
import {
  SortedTableInHtmlTable,
  StoreInspector,
  ValuesInHtmlTable,
} from "tinybase/debug/ui-react-dom";
import { Provider as InternalProvider } from "./ui-react";
import { createPartyKitPersister } from "tinybase/persisters/persister-partykit-client";

export const PARTYKIT_HOST = "localhost:1999";

import { useCallback, useState } from "react";
import { createBrain } from "./brain";

type Brain = ReturnType<typeof createBrain>;

export const useRoomId = (): [roomId: string, createRoomId: () => void] => {
  const [roomId, setRoomId] = useState(parent.location.search.substring(1));
  return [
    roomId,
    useCallback(() => {
      const newRoomId = ("" + Math.random()).substring(2, 12);
      parent.history.replaceState(null, "", "?" + newRoomId);
      setRoomId(newRoomId);
    }, []),
  ];
};

export const brainContext = createContext<Brain>(undefined!);

export const BrainProvider = ({ children }: { children: React.ReactNode }) => {
  const brain = useCreateBrain();
  return (
    <Provider store={brain.getStore()}>
      <brainContext.Provider value={brain}>
        <InternalProvider brain={brain}>
          {children}
          <StoreInspector />
        </InternalProvider>
      </brainContext.Provider>
    </Provider>
  );
};

function useCreateBrain() {
  const store = useMemo(() => {
    // Create the TinyBase Store and initialize the Store's data
    return createBrain();
  }, []);

  // const [roomId, createRoomId] = useRoomId();
  // console.log(roomId);
  let roomId = "brain";
  useCreatePersister(
    store.getStore(),
    (store) => {
      if (roomId) {
        return createPartyKitPersister(
          store,
          new PartySocket({ host: PARTYKIT_HOST, room: roomId }),
          "http"
        );
      }
    },
    [roomId],
    async (persister) => {
      if (persister) {
        await persister.startAutoSave();
        await persister.startAutoLoad();
      }
    }
  );
  return store;
}

export function useBrain() {
  return use(brainContext);
}
