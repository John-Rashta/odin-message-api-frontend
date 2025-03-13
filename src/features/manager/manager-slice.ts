///NEED GROUP ID, CONVERSATION ID AND USER ID
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface managerState {
  userId: string;
  groupId: string;
  conversationId: string;
}

const initialState: managerState = {
    userId: "0",
    groupId: "0",
    conversationId: "0",
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: (create) => ({
    setUserId: create.reducer((state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    }),
    setGroupId: create.reducer((state, action: PayloadAction<string>) => {
      state.groupId = action.payload;
    }),
    setConversationId: create.reducer((state, action: PayloadAction<string>) => {
        state.conversationId = action.payload;
    }),
  }),
  selectors: {
    selectUserId: (data) => data.userId,
    selectGroupId: (data) => data.groupId,
    selectConversationId: (data) => data.conversationId,
  },
});

export const { setConversationId, setGroupId, setUserId } = managerSlice.actions;
export const { selectConversationId, selectGroupId, selectUserId} = managerSlice.selectors;