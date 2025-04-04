import { useState } from "react";
import { useGetRequestsQuery, useGetSentRequestsQuery } from "../../features/message-api/message-api-slice";
import UserRequest from "./UserRequest";
import { useLocation } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

export default function AllRequests() {
    const [selectedType, setSelectedType ] = useState("");
    const { state } = useLocation();
    const { type } = state;
    const { data, error, isLoading } = useGetRequestsQuery();
    const { data: sentData, error: sentError, isLoading: sentLoading } = useGetSentRequestsQuery(type === "SENT" || selectedType === "SENT" ? undefined : skipToken);

    return (
        <main>
            <div>
                <button onClick={() => setSelectedType("RECEIVED")}>Received</button>
                <button onClick={() => setSelectedType("SENT")}>Sent</button>
            </div>
            {(type !== "SENT" && selectedType !== "SENT") && (isLoading ? <div>Loading Requests...</div>
            : error ? <div>Failed Loading Requests!</div>
            : data ? data.user.receivedRequest.map((request) => {
                return <UserRequest info={request} />
            })
            : <div>No Requests Yet!</div>
            )}
            {
                (type === "SENT" || selectedType === "SENT") && (
                    sentLoading ? <div>Loading Sent Requests...</div>
                    : sentError ? <div>Failed Loading Sent Requests!</div>
                    : sentData ? sentData.user.sentRequest.map((request) => {
                        return <UserRequest info={request}/>
                    })
                    : <div>No Sent Requests Yet</div>
                )
            }
        </main>
    )

}