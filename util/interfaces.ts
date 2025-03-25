import { RequestTypes } from "./types";

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

export { RequestInfo, VeryBasicUserInfo, BasicUserInfo, MessageInfo, BasicGroupInfo, UserConversation, CoordsProp };