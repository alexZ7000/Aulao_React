import axios, { AxiosError } from "axios";

interface GetUserRepoRequest {
    owner: string;
}

interface GithubErrorResponse {
    message: string;
    status: string;
}

export default async function getUser(props: GetUserRepoRequest) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL;
        axios
            .get(`${endpoint}/users/${props.owner}`, {
                headers: {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            })
            .then((response) => {
                const responseData = response.data;
                resolve(responseData);
            })
            .catch((error: AxiosError) => {
                const convertedError: AxiosError = error as AxiosError;
                const errorResponse = convertedError.response;
                if (errorResponse) {
                    const error = errorResponse.data as GithubErrorResponse;
                    reject({
                        message: error.message,
                        status: parseInt(error.status)
                    });
                }
            });
    });
}
