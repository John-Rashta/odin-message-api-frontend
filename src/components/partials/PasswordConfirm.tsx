interface PwInfo {
    checkValue: string,
    changeValue: React.Dispatch<React.SetStateAction<string>>
}

export default function PasswordConfirm({passwordInfo, confirmPasswordInfo} : {passwordInfo : PwInfo, confirmPasswordInfo: PwInfo}) {

    return (
        <>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={passwordInfo.checkValue} 
            onChange={(e) => {
                passwordInfo.changeValue(e.target.value);
            }} required/>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            {confirmPasswordInfo.checkValue !== "" && confirmPasswordInfo.checkValue !== passwordInfo.checkValue ? 
            <div style={{position: "absolute"}}>Passwords don't match!</div> : null}
            <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPasswordInfo.checkValue} 
            onChange={(e) => {
                confirmPasswordInfo.changeValue(e.target.value);
            }} required/>
        </>
    )
};