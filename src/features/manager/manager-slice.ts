import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface managerState {
  myId: string;
  userId: string;
  groupId: string;
  conversationId: string;
  editId: string | null;
}

const initialState: managerState = {
    myId: "0",
    userId: "0",
    groupId: "0",
    conversationId: "0",
    editId: null,
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: (create) => ({
    setMyId: create.reducer((state, action: PayloadAction<string>) => {
      state.myId = action.payload;
    }),
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
    selectMyId: (data) => data.myId,
    selectUserId: (data) => data.userId,
    selectGroupId: (data) => data.groupId,
    selectConversationId: (data) => data.conversationId,
  },
});

export const { setConversationId, setGroupId, setUserId, setMyId } = managerSlice.actions;
export const { selectConversationId, selectGroupId, selectUserId, selectMyId } = managerSlice.selectors;