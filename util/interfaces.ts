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

export { VeryBasicUserInfo, BasicUserInfo, MessageInfo };