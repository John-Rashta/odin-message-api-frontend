import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CrendentialsType {
    username: string,
    password: string,
};

interface ReturnMessage {
    message?: string,
};

interface UserInfo {
        id: string;
        name: string | null;
        username: string;
        icon: {
            id: number;
            source: string;
        };
        aboutMe: string | null;
        joinedAt: Date;
        online?: boolean;
};

interface CredentialsUpdate {
    username?: string,
    password?: string,
    oldPassword?: string,
};

interface UserProfile {
    name?: string,
    icon?: number,
    aboutMe?: string,
};

interface IconInfo {
    id: number,
    source: string,
};

interface Message {
    message: string
};

interface UId {
    id: string
};

interface FriendshipsInfo {
    id: string;
    username: string;
    friendlist: {
        users: {
            id: string;
            username: string;
            icon: {
                id: number;
                source: string;
            };
            online: boolean;
        }[];
    }[];
};

interface UserConversations {
    id: string;
    username: string;
    convos: {
        id: string;
        members: VeryBasicUserInfo[];
    }[];
};

interface ConversationInfo {
    id: string;
    members: VeryBasicUserInfo[];
    contents: {
        id: string;
        content: string;
        sentAt: Date;
        sender: VeryBasicUserInfo;
    }[];
};

interface UserRequests {
    id: string;
    username: string;
    receivedRequest: {
        id: string;
        type: RequestTypes;
        sentAt: Date;
        sender: VeryBasicUserInfo;
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

interface RequestInfo {
    id: string;
    type: RequestTypes;
    sentAt: Date;
    sender: VeryBasicUserInfo;
    receiver: VeryBasicUserInfo;
};

interface UserGroups {
    id: string;
    username: string;
    groups: ({
        members: VeryBasicUserInfo[];
    } & {
        name: string | null;
        id: string;
    })[];
};

interface GroupInfo {
    id: string;
    members: BasicUserInfo[];
    contents: {
        id: string;
        content: string;
        sentAt: Date;
        edited: boolean;
        sender: VeryBasicUserInfo;
    }[];
    admins: BasicUserInfo[];
};

interface BasicUserInfo {
    id: string;
        username: string;
        icon: {
            id: number;
            source: string;
        };
};

interface VeryBasicUserInfo {
    id: string;
    username: string;
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
};

interface UserSentRequests {
    id: string;
    username: string;
    sentRequest: {
        sentAt: Date;
        sender: {
            id: string;
            username: string;
        };
        type: RequestTypes;
        receiver: {
            id: string;
            username: string;
        };
    }[];
}

type RequestTypes = "FRIEND" | "GROUP";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        credentials: "include",
    }),
    tagTypes: ["SelfInfo", "ConvoInfo", "GroupInfo", "FriendsInfo", "ConvosInfo", "RequestInfo", "SentRequestsInfo", "RequestsInfo", "GroupsInfo"],
    endpoints: (builder) => ({
        createUser: builder.mutation<ReturnMessage, CrendentialsType & UserProfile>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body: body
            }),
        }),
        loginUser: builder.mutation<ReturnMessage, CrendentialsType>({
            query: ({username, password}) => ({
                url: "/auth",
                method: "POST",
                body: {
                    username,
                    password,
                }
            }),
        }),
        logoutUser: builder.mutation<ReturnMessage, void>({
            query: () => ({
                url: "/auth",
                method: "PUT"
            })
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
        updateMe: builder.mutation<ReturnMessage, CredentialsUpdate & UserProfile>({
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
        updateMessage: builder.mutation<ReturnMessage, Message & UId>({
            query: ({id, message}) => ({
                url: `/messages/${id}`,
                method: "PUT",
                body: {
                    message
                }
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
        messageConversation: builder.mutation<ReturnMessage, OptionalBodyUID & Message & OptionalConvo>({
            query: (info) => ({
                url: "/conversations",
                method: "POST",
                body: info
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
            invalidatesTags: ["RequestInfo", "RequestsInfo"],
        }),
        rejectRequest: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                 url: `/requests/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["RequestInfo", "RequestsInfo"],
        }),
        getGroups: builder.query<{user: UserGroups}, void>({
            query: () => ({
                url: "/groups"
            }),
            providesTags: ["GroupsInfo"],
        }),
        getGroup: builder.query<{group: GroupInfo}, UId>({
            query: ({id}) => ({
                url: `/groups/${id}`
            }),
            providesTags: ["GroupInfo"],
        }),
        createGroup: builder.mutation<{group: BasicGroup}, OptionalName>({
            query: ({name}) => ({
                url: "/groups",
                method: "POST",
                ...(typeof name === "string" ? {body: {name}} : {})
            }),
            invalidatesTags: ["GroupsInfo"],
        }),
        messageGroup: builder.mutation<ReturnMessage, Message & UId>({
            query: ({message, id}) => ({
                url: `/groups/${id}`,
                method: "POST",
                body: {
                    message
                }
            }),
            invalidatesTags:["GroupInfo"]
        }),
        leaveGroup: builder.mutation<ReturnMessage, UId>({
            query: ({id}) => ({
                url:`/groups/${id}/leave`,
                method: "POST",
            }),
            invalidatesTags:["GroupInfo", "GroupsInfo"],
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
            invalidatesTags:["GroupsInfo", "GroupInfo"]
        }),
    })
});

