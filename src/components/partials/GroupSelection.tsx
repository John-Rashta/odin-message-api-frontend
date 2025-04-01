import { BasicGroupInfo } from "../../../util/interfaces"
import { ClickType, SimpleFunctionType } from "../../../util/types"
import { useMakeRequestMutation } from "../../features/message-api/message-api-slice";
import GroupOptions from "./GroupOptions";

export default function GroupSelection({groupsData, userid, hideMe}: {groupsData: BasicGroupInfo[] | undefined, userid: string | undefined, hideMe: SimpleFunctionType}) {
    const [makeRequest] = useMakeRequestMutation();
    const handleClick = function handleClickingAnOption(event: ClickType) {
        event.stopPropagation();
        if (!userid) {
            return;
        }
        const currentTarget = event.target as HTMLDivElement;
        const possibleType = currentTarget.dataset.type;
        if (possibleType === "INVITEGROUP") {
            const possibleGroup = currentTarget.dataset.groupid;
            if (!possibleGroup) {
                return;
            };
            makeRequest({targetid: userid, type: "GROUP", groupid: possibleGroup}).unwrap().then(() => {
                hideMe();
            }).catch((response) => {
                if (response.data.message === "Request Already Sent") {
                    currentTarget.remove();
                }
            });
        };
    };

    return (
        <GroupOptions groupsData={groupsData} handleClick={handleClick} />
    )
};