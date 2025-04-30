import type { AppStore } from "../store/store";
import { makeStore } from "../store/store";
import type { managerState } from "../features/manager/manager-slice";
import { setConversationId, setMyId, setGroupId, setUserId, selectConversationId, selectGroupId, selectMyId, selectUserId, managerSlice } from "../features/manager/manager-slice";

interface LocalTestContext {
    store: AppStore;
};

describe<LocalTestContext>("manager reducer", (it) => {
    beforeEach<LocalTestContext>((context) => {
      const initialState: managerState = {
        conversationId: "1",
        groupId: "1",
        myId: "1",
        userId: "1"
      };
  
      const store = makeStore({ manager: initialState });
  
      context.store = store;
    });
  
    it("should handle initial state", () => {
      expect(managerSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
        conversationId: "0",
        groupId: "0",
        myId: "0",
        userId: "0"
      });
    });
  
    it("should set Conversation State", ({ store }) => {
      expect(selectConversationId(store.getState())).toBe("1");
  
      store.dispatch(setConversationId("1234"));
  
      expect(selectConversationId(store.getState())).toBe("1234");
    });

    it("should set Group State", ({ store }) => {
        expect(selectGroupId(store.getState())).toBe("1");
    
        store.dispatch(setGroupId("4567"));
    
        expect(selectGroupId(store.getState())).toBe("4567");
      });

      it("should set My State", ({ store }) => {
        expect(selectMyId(store.getState())).toBe("1");
    
        store.dispatch(setMyId("12asdas"));
    
        expect(selectMyId(store.getState())).toBe("12asdas");
      });

      it("should set User State", ({ store }) => {
        expect(selectUserId(store.getState())).toBe("1");
    
        store.dispatch(setUserId("d5665fg"));
    
        expect(selectUserId(store.getState())).toBe("d5665fg");
      });
  });