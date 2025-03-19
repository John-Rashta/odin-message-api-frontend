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

export { VeryBasicUserInfo, BasicUserInfo, MessageInfo, BasicGroupInfo };