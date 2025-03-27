import { UserInfo } from "../../../util/interfaces";
import { SimpleFunctionType } from "../../../util/types";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../features/manager/manager-slice";
import { useDispatch } from "react-redux";

///PROPER ROUTES NEED TO BE DONE
export default function SearchResult({info} : {info: UserInfo}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            dispatch(setUserId(info.id));
            navigate("/users");
        }}>
            <div>{info.username}</div>
            <img src={info.customIcon?.url || info.icon.source} alt="" />
        </div>
    )
};