import { testCat, testDog } from "../../../../util/globalValues";

const useCreateUserMutation = vi.fn(() => {
  return [vi.fn];
});

const useLoginUserMutation = vi.fn(() => {
  return [vi.fn];
});

const useUpdateMeMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetUserQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      user: {
        id: "1",
        name: "john",
        username: "cat",
        icon: {
          id: 1,
          source: "string",
        },
        customIcon: {
          url: "string",
        },
        aboutMe: "hello",
        joinedAt: "1995-12-17T03:24:00",
        online: true,
      },
    },
  };
});

const useMakeRequestMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetGroupsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    groupsData: [
      {
        members: [
          {
            id: "43",
            username: "chicken",
            icon: {
              id: 5,
              source: "string",
            },
            customIcon: {
              url: "string",
            },
          },
        ],
        name: "new",
        id: "556",
      },
    ],
    data: {
      user: {
        groups: [
          {
            members: [
              {
                id: "43",
                username: "chicken",
                icon: {
                  id: 5,
                  source: "string",
                },
                customIcon: {
                  url: "string",
                },
              },
            ],
            name: "new",
            id: "556",
          },
        ],
      },
    },
  };
});

const useCreateConversationMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetIconsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      icons: [],
    },
  };
});

const useGetSelfQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      user: {
        id: "3",
        name: "jean",
        username: "sloth",
        icon: {
          id: 3,
          source: "string",
        },
        customIcon: {
          url: "string",
        },
        aboutMe: "goodbye",
        joinedAt: "1995-12-17T03:24:00",
        online: true,
      },
    },
  };
});

const useAcceptRequestMutation = vi.fn(() => {
  return [vi.fn];
});

const useDeleteRequestMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetRequestsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      user: {
        receivedRequest: [
          {
            id: "55",
            type: "FRIEND",
            sentAt: "1995-12-17T03:24:00",
            sender: {
              id: "3",
              username: "dog",
            },
            receiver: {
              id: "0",
              username: "cat",
            },
            group: null,
          },
        ],
      },
    },
  };
});

const useGetSentRequestsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      user: {
        sentRequest: [
          {
            id: "55",
            type: "GROUP",
            sentAt: "1995-12-17T03:24:00",
            sender: {
              id: "0",
              username: "cat",
            },
            receiver: {
              id: "3",
              username: "dog",
            },
            group: {
              name: "new group",
              id: "98",
            },
          },
        ],
      },
    },
  };
});

const useDeleteFriendMutation = vi.fn(() => {
  return [vi.fn];
});

const useUpdateGroupMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetFriendsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      friends: {
        friendlist: [
          {
            users: [
              {
                id: "5",
                username: "hamster",
                icon: {
                  id: 2,
                  source: "string",
                },
                customIcon: {
                  url: "string",
                },
                online: true,
              },
            ],
          },
        ],
      },
    },
  };
});

const useMessageConversationMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetConversationQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      conversation: {
        id: "gfdh123",
        members: [testCat],
        contents: [
          {
            id: "ghgfhk123",
            content: "i like clouds",
            sentAt: "1995-12-17T03:24:00",
            edited: true,
            sender: testCat,
            image: null,
          },
        ],
      },
    },
  };
});

const useGetConversationsQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      user: {
        id: "3",
        username: "dog",
        convos: [
          {
            id: "4",
            members: [
              {
                ...testCat,
                id: "3",
              },
            ],
          },
        ],
      },
    },
  };
});

const useMessageGroupMutation = vi.fn(() => {
  return [vi.fn];
});

const useCreateGroupMutation = vi.fn(() => {
  return [vi.fn];
});

const useLeaveGroupMutation = vi.fn(() => {
  return [vi.fn];
});

const useDeleteGroupMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetGroupQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      group: {
        name: "new gang",
        id: "76",
        members: [testCat, testDog],
        contents: [
          {
            id: "345gh",
            content: "i like rain",
            sentAt: "1995-12-17T03:24:00",
            edited: false,
            sender: testDog,
            image: null,
          },
        ],
        admins: [testCat],
      },
    },
  };
});

const useLogoutUserMutation = vi.fn(() => {
  return [vi.fn];
});

const useLazySearchUsersQuery = vi.fn(() => {
  return [
    vi.fn,
    {
      usersData: undefined,
    },
  ];
});

export {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateMeMutation,
  useGetUserQuery,
  useMakeRequestMutation,
  useGetGroupsQuery,
  useCreateConversationMutation,
  useGetIconsQuery,
  useGetSelfQuery,
  useAcceptRequestMutation,
  useDeleteRequestMutation,
  useGetRequestsQuery,
  useGetSentRequestsQuery,
  useDeleteFriendMutation,
  useUpdateGroupMutation,
  useGetFriendsQuery,
  useGetConversationQuery,
  useGetConversationsQuery,
  useMessageConversationMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupQuery,
  useLeaveGroupMutation,
  useMessageGroupMutation,
  useLogoutUserMutation,
  useLazySearchUsersQuery,
};
