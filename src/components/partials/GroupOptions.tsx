import { BasicGroupInfo } from "../../../util/interfaces";
import { ClickType } from "../../../util/types";

type ClickFunction = (event: ClickType) => void;
export default function GroupOptions({groupsData, handleClick} : {groupsData: BasicGroupInfo[] | undefined, handleClick?: ClickFunction }) {
    return (
        <div onClick={handleClick} style={{position: "absolute"}}>
        {groupsData && groupsData.length > 0 ? groupsData.map((group) => {
            return (
                <div key={group.id} data-groupid={group.id} data-type="INVITEGROUP">{group.name}</div>
            )
        }) : "No Groups" }
        </div>
        )
};