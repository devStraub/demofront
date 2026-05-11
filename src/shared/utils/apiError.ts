export function getApiErrorMessage(
    error: any
) {

    return (
        error?.response?.data?.message ||
        "Erro inesperado"
    );
}