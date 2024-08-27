import axios, { AxiosError } from "axios";

interface GetUserRepoRequest {
    repository: string;
    owner: string;
}

interface GithubErrorResponse {
    message: string;
    status: string;
}

export default async function getUserRepo(props: GetUserRepoRequest) {
    return new Promise((resolve, reject) => {
        const endpoint: string = import.meta.env.VITE_ENDPOINT_URL;
        axios
            .get(
                `${endpoint}/repo/${props.owner}/${props.repository}?owner=${props.owner}&repo=${props.repository}`,
                {
                    headers: {
                        Accept: "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2022-11-28"
                    }
                }
            )
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
