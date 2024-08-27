import axios, { AxiosError } from "axios";

interface GetUserOrganizationsRequest {
    organizations_url: string;
}

interface GithubErrorResponse {
    message: string;
    status: string;
}

export default async function getUserOrganizations(
    props: GetUserOrganizationsRequest
) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${props.organizations_url}`, {
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
