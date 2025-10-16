export type DebouncedFunction<TArgs extends unknown[]> = (...args: TArgs) => void;
export interface UseDebouncedCallbackOptions {
    leading?: boolean;
    trailing?: boolean;
    enableLoading?: boolean;
}
export interface UseDebouncedCallbackReturn<TArgs extends unknown[]> {
    debouncedCallback: DebouncedFunction<TArgs>;
    isLoading: boolean;
}
export declare function useDebouncedCallback<TArgs extends unknown[]>(callback: (...args: TArgs) => void, delayMs: number, options?: UseDebouncedCallbackOptions): UseDebouncedCallbackReturn<TArgs>;
//# sourceMappingURL=useDebouncedCallback.d.ts.map