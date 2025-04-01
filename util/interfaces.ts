import { RequestTypes } from "./types";

interface UId {
    id: string
};

interface MessageInfo {
    id: string;
        content: string;
        sentAt: Date;
        edited: boolean;
        sender: BasicUserInfo;
        image: {
            url: string;
            public_id: string;
            uploadAt: Date;
        } | null;
};

interface BasicUserInfo {
    id: string;
    username: string;
    icon: {
        id: number;
        source: string;
    };
    customIcon: {
        url: string
    } | null
};

interface VeryBasicUserInfo {
id: string;
username: string;
};

interface BasicGroupInfo {
    members: BasicUserInfo[];
    name: string | null;
    id: string;
};

interface UserConversation {
    id: string;
    members: BasicUserInfo[];

};

interface CoordsProp {
    top: number;
    left: number;
}

interface RequestInfo {
    id: string;
    type: RequestTypes;
    sentAt: Date;
    sender: VeryBasicUserInfo;
    receiver: VeryBasicUserInfo;
    group: {
        name: string | null;
        id: string;
    } | null;
};

interface UserInfo {
    id: string;
    name: string | null;
    username: string;
    icon: {
        id: number;
        source: string;
    };
    customIcon: {
        url: string;
    } | null;
    aboutMe: string | null;
    joinedAt: Date;
    online?: boolean;
};

interface FriendsInfo {
    id: string;
    username: string;
    icon: {
        id: number;
        source: string;
    };
    customIcon: {
        url: string;
    } | null;
    online: boolean;
};

interface TargetUser {
    user: string | undefined,
    admin: string | undefined,
    friend: string | undefined,
};

interface TargetMessage{
    message: string |  undefined,
};

interface CoordsInfo {
    top: number,
    left: number
};

interface FullMessageInfo {
    id: string;
    sentAt: Date;
    content: string;
    edited: boolean;
    convoid: string | null;
    groupid: string | null;
    sender: BasicUserInfo;
    image: {
        id: string,
        url: string,
    } | null;
};

interface PwInfo {
    checkValue: string,
    changeValue: React.Dispatch<React.SetStateAction<string>>
};

export { PwInfo, UId, FullMessageInfo, TargetMessage, CoordsInfo, TargetUser, FriendsInfo, UserInfo, RequestInfo, VeryBasicUserInfo, BasicUserInfo, MessageInfo, BasicGroupInfo, UserConversation, CoordsProp };