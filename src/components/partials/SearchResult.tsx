import { UserInfo } from "../../../util/interfaces";

///PROPER ROUTES NEED TO BE DONE
export default function SearchResult({info} : {info: UserInfo}) {
    return (
        <div className="searchResult" data-id={info.id}>
            <div>{info.username}</div>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
        </div>
    )
};