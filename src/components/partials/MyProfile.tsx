import { useState } from "react";
import { useGetSelfQuery, useUpdateMeMutation, useGetIconsQuery } from "../../features/message-api/message-api-slice";
import { ButtonClickType, ClickType, FormType } from "../../../util/types";
import { useNavigate } from "react-router-dom";
import ChangeTextFields from "./ChangeTextFields";

export default function MyProfile() {
    const { data, error, isLoading} = useGetSelfQuery();
    const [invalidSize, setInvalidSize] = useState(false);
    const [failedUpload, setFailedUpload] = useState(false);
    const [iconOptions, setIconOptions] = useState(false);
    const [updateMe] = useUpdateMeMutation();
    const {data : iconData, error : iconError, isLoading : iconLoading} = useGetIconsQuery();
    const navigate = useNavigate();

    const handleSubmitImage = function handleSubmitingImage(event: FormType) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLFormElement;
        if (target.imageInput.files.length === 0 ) {
            return;
        };
        
        const currentFile = target.imageInput.files[0] as File;
        if (Number(((currentFile.size/1024)/1024).toFixed(4)) > 5) {
            setInvalidSize(true);
            return;
        }

        const newForm = new FormData;
        newForm.append("uploaded_file", currentFile);
        updateMe(newForm).unwrap().then().catch(() => {
            setFailedUpload(true);
        }).finally(() => {
            target.reset();
        })
    };

    const handleChangePassword = function handleClickingChangePassword(event: ButtonClickType) {
        event.stopPropagation();
        navigate("/password");
    };

    const handleClickIconOption = function handleClickingIconOption(event: ClickType) {
        event.stopPropagation();
        const target = event.target as HTMLDivElement;
        if (target.dataset.type === "ICONOPTION") {
            const possibleId = target.dataset.iconid;
            if (!possibleId) {
                return;
            };
            const newForm = new FormData;
            newForm.append("icon", possibleId);
            updateMe(newForm);
            setIconOptions(false);
        }
    };

    return (
        <main>
            <div></div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error Loading!</div>
            ) :  data && data.user ? (
                <>
                    <img src={data.user.customIcon?.url || data.user.icon.source} alt="" />
                    <form onSubmit={handleSubmitImage} onClick={(e) => e.stopPropagation()}>
                        {failedUpload && <div>Failed to upload.</div>}
                        {invalidSize && <div>Size Over Limit!</div>}
                        <label htmlFor="imageInput">Choose image for icon(max 5MB):</label>
                        <input type="file" id="imageInput" name="imageInput" accept=".png,.webp,.jpeg,.jpg"/>
                        <button type="submit">Submit</button>
                    </form>
                    <div onClick={handleClickIconOption}>
                        <button onClick={() => setIconOptions(!iconOptions)}>Icons</button>
                        {(iconOptions && iconData) && <div>
                            {iconData.icons.map((icon) => {
                            return (
                                    <img key={icon.id} src={icon.source} alt="" data-iconid={icon.id} data-type="ICONOPTION"/>
                            )
                            })}
                        </div>
                        }
                    </div>
                    <ChangeTextFields fieldname="username" myData={data.user} updater={updateMe} />
                    <div>
                        <div>name:</div>
                        <ChangeTextFields fieldname="name" myData={data.user} updater={updateMe} />
                    </div>
                    <button onClick={handleChangePassword}>Change Password</button>
                    <div>
                        <div>About Me:</div>
                        <ChangeTextFields fieldname="aboutMe" myData={data.user} updater={updateMe} area={true} />
                    </div>
                    <div>{data.user.joinedAt.toString()}</div>
                    <div>{data.user.id}</div>
                </>
            ) : <div>Something went wrong...</div>
            }
        </main>
    )
}