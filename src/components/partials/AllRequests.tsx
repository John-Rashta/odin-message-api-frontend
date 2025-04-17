import { useState } from "react";
import { useGetRequestsQuery, useGetSentRequestsQuery } from "../../features/message-api/message-api-slice";
import UserRequest from "./UserRequest";
import { skipToken } from "@reduxjs/toolkit/query";
import styled from "styled-components";

export default function AllRequests() {
    const [selectedType, setSelectedType ] = useState("RECEIVED");
    const { data, error, isLoading } = useGetRequestsQuery();
    const { data: sentData, error: sentError, isLoading: sentLoading } = useGetSentRequestsQuery(selectedType === "SENT" ? undefined : skipToken);
    return (
        <StyledMain>
            <StyledButtonsContainer>
                <StyledClickButton $currentType={selectedType} $trueType="RECEIVED" onClick={() => setSelectedType("RECEIVED")}>Received</StyledClickButton>
                <StyledClickButton $currentType={selectedType} $trueType="SENT" onClick={() => setSelectedType("SENT")}>Sent</StyledClickButton>
            </StyledButtonsContainer>
            <StyledMainContainer>
                {(selectedType !== "SENT") && (isLoading ? <StyledErrorMessages>Loading Requests...</StyledErrorMessages>
                : error ? <StyledErrorMessages>Failed Loading Requests!</StyledErrorMessages>
                : data ? (data.user.receivedRequest.length > 0 && data.user.receivedRequest.map((request) => {
                    return <UserRequest key={request.id} info={request} />
                })) || <StyledErrorMessages>No Requests Yet!</StyledErrorMessages>
                : <StyledErrorMessages>No Requests Yet!</StyledErrorMessages>
                )}
                {
                    (selectedType === "SENT") && (
                        sentLoading ? <StyledErrorMessages>Loading Sent Requests...</StyledErrorMessages>
                        : sentError ? <StyledErrorMessages>Failed Loading Sent Requests!</StyledErrorMessages>
                        : sentData ? (sentData.user.sentRequest.length > 0 && sentData.user.sentRequest.map((request) => {
                            return <UserRequest key={request.id} info={request}/>
                        })) || <StyledErrorMessages>No Sent Requests Yet!</StyledErrorMessages>
                        : <StyledErrorMessages>No Sent Requests Yet!</StyledErrorMessages>
                    )
                }
            </StyledMainContainer>
        </StyledMain>
    )
};

const StyledClickButton = styled.button<{ $currentType?: string, $trueType?: string}>`
    background-color: ${props => (props.$currentType === props.$trueType) && "rgb(51, 163, 255)" || "rgb(219, 245, 252)" };
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
`;

const StyledMainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: auto;
    padding: 3px;
`;

const StyledErrorMessages = styled.div`
    align-self: center;
    font-size: 1.4rem;
`;

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 50px;
`;