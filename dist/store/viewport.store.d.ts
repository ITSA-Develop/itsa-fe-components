type ViewportState = {
    width: number;
    height: number;
    setSize: (size: {
        width: number;
        height: number;
    }) => void;
};
export declare const useViewportStore: import('zustand').UseBoundStore<import('zustand').StoreApi<ViewportState>>;
export {};
//# sourceMappingURL=viewport.store.d.ts.map