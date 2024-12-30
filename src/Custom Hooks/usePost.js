/* eslint-disable no-unused-vars */
import axios from "axios"; 
import { config } from "../Constant/environment";
import { useState } from "react";

export const usePost = (endPoint) => {
    const [data, setData] = useState();

    const handleClick = async ({
        repoId, loginId, bodyPassword, documentSearchBody, AllRepositories, WantedRepositories,
        FieldOrderBy, Amount,
        queryTypeValues = [], docFieldSearchValues = [], queryResValues = []
    } = {}) => {
        // Construct query parameters dynamically
        const queryParams = new URLSearchParams();

        if (loginId) queryParams.append("LoginId", loginId);
        if (AllRepositories) queryParams.append("AllRepositories", AllRepositories);
        if (WantedRepositories) queryParams.append("WantedRepositories", WantedRepositories);
        if (FieldOrderBy) queryParams.append("FieldOrderBy", FieldOrderBy);
        if (repoId) queryParams.append("RepositoryId", repoId);

        // Construct the request body dynamically
        const body = {
            LoginId: loginId || undefined,
            bodyPassword: bodyPassword || undefined,
            QueryTypeValues: queryTypeValues.length > 0 ? queryTypeValues : undefined,
            DocFieldSearchValues: docFieldSearchValues.length > 0 ? docFieldSearchValues : undefined,
            QueryResValues: queryResValues.length > 0 ? queryResValues : undefined,
        };

        // Add documentSearchBody to the body if it exists
        if (documentSearchBody) {
            Object.assign(body, documentSearchBody);
        }

        // Filter undefined fields from the body
        const filteredBody = Object.fromEntries(
            Object.entries(body).filter(([_, value]) => value !== undefined)
        );

        // Construct the full URL with query parameters
        const baseUrl = `/${endPoint}`;
        const finalUrl = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

        console.log("Request URL:", finalUrl);

        try {
            const response = await fetch(finalUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                },
                body: JSON.stringify(filteredBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Result:", result); // Log the result directly
            setData(result); // Update state with the fetched data
        } catch (err) {
            console.error("Error during fetch:", err);
            if (err.message.includes("NetworkError")) {
                alert("Network Error: Please check your connection or try again later.");
            } else {
                alert(`An error occurred: ${err.message}`);
            }
        }
    };

    return [data, handleClick];
};
