import {
    DefaultOptions,
    QueryClient,
    UseMutateAsyncFunction,
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {useEffect} from "react";

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
        cacheTime: 0,
        retry: false,
    },
};
export type TQueryKey = [string, string] | [string];
export type TError = AxiosError;
export const queryClient = new QueryClient({defaultOptions: queryConfig});
export type QueryOption<T, TData = T> = UseQueryOptions<T, TError, TData, TQueryKey>;
export type QueryResult<TData> = {
    isLoading: boolean;
    data: TData | undefined;
    isFetching: boolean;
    error: TError | null;
    isSuccess: boolean;
};

export const useQueryWrapper = <T, TData = T>(options: QueryOption<T, TData>): QueryResult<TData> => {
    const result = useQuery<T, TError, TData, TQueryKey>(options);
    return {...result};
};

export type MutateOption<T, TVariables = void> = UseMutationOptions<T, TError, TVariables>;
export type MutationResult<T, TVariables> = {
    isLoading: boolean;
    isSuccess: boolean;
    mutateAsync: UseMutateAsyncFunction<T, TError, TVariables, unknown>;
};
export const useMutationWrapper = <T, TVariables = void>(
    options: MutateOption<T, TVariables>
): MutationResult<T, TVariables> => {
    const result = useMutation(options);
    return {...result};
};

export const enum QUERY_KEYS {
    GROUPS = "GROUPS",
    CATEGORIES = "CATEGORIES",
    ITEMS = "ITEMS",
    STATUSES = "STATUSES"
}