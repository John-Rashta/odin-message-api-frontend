import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageForm, ReturnMessage, UId, FriendsInfo, UserInfo, RequestInfo, MessageInfo, BasicUserInfo, VeryBasicUserInfo, BasicGroupInfo, UserConversation, FullMessageInfo } from "../../../util/interfaces";
import { RequestTypes } from "../../../util/types";
import { isFetchBaseQueryError } from "../../../util/helpers";
 
///KEEPING INTERFACES FOR NOW FOR REFERENCE OF WHATS NEEDED

interface CrendentialsType {
    username: string,
    password: string,
};

interface CredentialsUpdate {
    username?: string,
    password?: string,
    oldPassword?: string,
};

interface UserProfile {
    username: string,
    password: string
};

interface IconInfo {
    id: number,
    source: string,
};

interface FriendshipsInfo {
    id: string;
    username: string;
    friendlist: {
        users: FriendsInfo[];
    }[];
};

interface UserConversations {
    id: string;
    username: string;
    convos: UserConversation[];
};

interface ConversationInfo {
    id: string;
    members: BasicUserInfo[];
    contents: MessageInfo[];
};

interface UserRequests {
    id: string;
    username: string;
    receivedRequest: {
        id: string;
        type: RequestTypes;
        sentAt: Date;
        sender: VeryBasicUserInfo;
        receiver: VeryBasicUserInfo;
        group: {
            name: string | null;
            id: string;
        } | null; 
    }[];
};

interface BodyUID {
    targetid: string
};

interface OptionalBodyUID {
    targetid?: string
};

interface RequestGroup {
    groupid?: string,
    type: RequestTypes,
};

interface OptionalConvo {
    conversationid?: string,
};

interface UserGroups {
    id: string;
    username: string;
    groups: BasicGroupInfo[];
};

interface GroupInfo {
    name: string | null;
    id: string;
    members: BasicUserInfo[];
    contents: MessageInfo[];
    admins: BasicUserInfo[];
};

interface OptionalName {
    name?: string;
};

interface BasicGroup {
    name: string | null;
    id: string;
};

interface GroupUpdate extends OptionalName {
    targetid?: string,
    action?: "REMOVE" | "PROMOTE" | "DEMOTE",
    name?: string,
};

interface UserSentRequests {
    id: string;
    username: string;
    sentRequest: {
        id: string;
        sentAt: Date;
        sender: {
            id: string;
            username: string;
        };
        group: {
            id: string;
            name: string | null;
        } | null;
        receiver: {
            id: string;
            username: string;
        };
        type: RequestTypes;
    }[];
};

interface ResponseGroup {
    group: GroupInfo;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        credentials: "include",
    }),
    tagTypes: ["SelfInfo", "ConvoInfo", "GroupInfo", "FriendsInfo", "ConvosInfo", "RequestInfo", "SentRequestsInfo", "RequestsInfo", "GroupsInfo"],
    endpoints: (builder) => ({
        createUser: builder.mutation<ReturnMessage, UserProfile>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body: body
            }),
        }),
        loginUser: builder.mutation<UId, CrendentialsType>({
            query: ({username, password}) => ({
                url: "/auth",
                method: "POST",
                body: {
                    username,
                    password,
                }
            }),
            invalidatesTags: ["SelfInfo"],
        }),
        logoutUser: builder.mutation<ReturnMessage, void>({
            query: () => ({
                url: "/auth",
                method: "PUT"
            }),
            invalidatesTags: ["SelfInfo"],
        }),
        getSelf: builder.query<{user: UserInfo}, void>({
            query: () => ({
                url: "/users/profile",
            }),
            providesTags: ["SelfInfo"],
        }),
        searchUsers: builder.query<{users: UserInfo[]}, string>({
            query: (user) => ({
                url: `/users/search?user=${user}`,
            })
        }),
        getUser: builder.query<{user: UserInfo}, string>({
            query: (user) => ({
                url: `/users/${user}`
            })
        }),
        updateMe: builder.mutation<ReturnMessage, FormData>({
            query: (info) => ({
                url: "/users/profile",
                method: "PUT",
                body: info
            }),
            invalidatesTags: ["SelfInfo"],
        }),
        getIcons: builder.query<{icons: IconInfo[]}, void>({
            query: () => ({
                url: "/users/profile/icons",
            })
        }),
        getMessage: builder.query<FullMessageInfo, UId>({
            query: ({id}) => ({
                url:`/messages/${id}`
            })
        }),
        updateMessage: builder.mutation<ReturnMessage, MessageForm & UId>({
            query: ({id, message}) => ({
                url: `/messages/${id}`,
                method: "PUT",
                body: message
            }),
            invalidatesTags: ["GroupInfo", "ConvoInfo"],
        }),
        deleteMessage: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url: `/messages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["GroupInfo", "ConvoInfo"],
        }),
        getFriends: builder.query<{friends: FriendshipsInfo}, void>({
            query: () => ({
                url: "/friends",
            }),
            providesTags: ["FriendsInfo"],
        }),
        deleteFriend: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url: `/friends/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["FriendsInfo"],
        }),
        getConversations: builder.query<{user: UserConversations}, void>({
            query: () => ({
                url: "/conversations"
            }),
            providesTags: ["ConvosInfo"],
        }),
        getConversation: builder.query<{conversation: ConversationInfo}, UId>({
            query: ({id}) => ({
                url: `/conversations/${id}`
            }),
            providesTags: ["ConvoInfo"],
        }),
        messageConversation: builder.mutation<ReturnMessage, MessageForm>({
            query: ({message}) => ({
                url: "/conversations",
                method: "POST",
                body: message
            }),
            invalidatesTags: ["ConvoInfo"],
        }),
        createConversation: builder.mutation<{conversation: string}, BodyUID>({
            query: ({targetid}) => ({
                url: "/conversations/create",
                method: "POST",
                body: {
                    targetid
                }
            }),
            invalidatesTags: ["ConvosInfo"],
        }),
        getRequests: builder.query<{user: UserRequests}, void>({
            query: () => ({
                url: "/requests",
            }),
            providesTags: ["RequestsInfo"],
        }),
        getSentRequests: builder.query<{user: UserSentRequests}, void>({
            query: () => ({
                url: "/requests/sent",
            }),
            providesTags: ["SentRequestsInfo"],
        }),
        makeRequest: builder.mutation<ReturnMessage, RequestGroup & BodyUID >({
            query: (info) => ({
                url: "/requests",
                method: "POST",
                body: info,
            }),
            invalidatesTags: ["SentRequestsInfo"],
        }),
        getRequest: builder.query<{request: RequestInfo}, UId>({
            query: ({id}) => ({
                url: `/requests/${id}`,
            }),
            providesTags: ["RequestInfo"],
        }),
        acceptRequest: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url: `/requests/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["RequestInfo", "RequestsInfo",  "GroupsInfo", "FriendsInfo"],
        }),
        deleteRequest: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                 url: `/requests/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["RequestInfo", "RequestsInfo", "SentRequestsInfo"],
        }),
        getGroups: builder.query<{user: UserGroups}, void>({
            query: () => ({
                url: "/groups"
            }),
            providesTags: ["GroupsInfo"],
        }),
        getGroup: builder.query<ResponseGroup, UId>({
            query: ({id}) => ({
                url: `/groups/${id}`
            }),
            providesTags: ["GroupInfo"],
            transformResponse(responseData: ResponseGroup) {
                const response = {
                    group: {...responseData.group, members: responseData.group.members.map((member) => {
                        return {...member, admin: responseData.group.admins.some((admin) => member.id === admin.id)}
                    })}
                };
                return response;
            },
            async onQueryStarted(response, lifecycleApi) {
                try {
                    const { data: res} = await lifecycleApi.queryFulfilled;

                } catch (err) {
                    const newErr = typeof err === "object" && err !== null && "error" in err && err;
                    if (typeof newErr === "object") {
                        if (isFetchBaseQueryError(newErr.error)) {
                            if (newErr.error.status === 403) {
                                lifecycleApi.dispatch(apiSlice.util.invalidateTags(["GroupsInfo"]));
                            }
                        }
                    }
                };
            },
            keepUnusedDataFor: 5,
        }),
        createGroup: builder.mutation<{group: BasicGroup}, OptionalName>({
            query: ({name}) => ({
                url: "/groups",
                method: "POST",
                ...(typeof name === "string" ? {body: {name}} : {})
            }),
            invalidatesTags: ["GroupsInfo"],
        }),
        messageGroup: builder.mutation<ReturnMessage, MessageForm & UId>({
            query: ({message, id}) => ({
                url: `/groups/${id}`,
                method: "POST",
                body: message
            }),
            invalidatesTags:["GroupInfo"]
        }),
        leaveGroup: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url:`/groups/${id}/leave`,
                method: "POST",
            }),
            invalidatesTags:["GroupsInfo"],
        }),
        updateGroup: builder.mutation<ReturnMessage, UId & {info: GroupUpdate}>({
            query: ({id, info}) => ({
                url: `/groups/${id}`,
                method: "PUT",
                body: info
            }),
            invalidatesTags:["GroupInfo"],
        }),
        deleteGroup: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url: `/groups/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["GroupsInfo"]
        }),
    })
});

export const { 
    useDeleteMessageMutation, 
    useLoginUserMutation, 
    useCreateUserMutation, 
    useLogoutUserMutation, 
    useLazySearchUsersQuery,
    useAcceptRequestMutation,
    useDeleteRequestMutation,
    useMakeRequestMutation,
    useDeleteFriendMutation,
    useUpdateGroupMutation,
    useGetGroupsQuery,
    useUpdateMeMutation,
    useCreateConversationMutation,
    useGetUserQuery,
    useGetSelfQuery,
    useGetIconsQuery,
    useGetConversationQuery,
    useGetConversationsQuery,
    useGetMessageQuery,
    useMessageConversationMutation,
    useMessageGroupMutation,
    useUpdateMessageMutation,
    useGetGroupQuery,
    useLeaveGroupMutation,
    useGetFriendsQuery,
    useGetRequestsQuery,
    useGetSentRequestsQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
} = apiSlice;