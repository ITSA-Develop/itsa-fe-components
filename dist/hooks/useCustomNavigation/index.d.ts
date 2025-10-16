export interface IUseCustomNavigationProps {
    path: string;
}
type NavigateFn = (to: string, opts?: {
    replace?: boolean;
}) => void;
export declare const useCustomNavigation: () => {
    navigateRoute: ({ path }: IUseCustomNavigationProps, navigate?: NavigateFn) => Promise<boolean>;
    isLoading: boolean;
    pendingTo: string | null;
    externalHref: string | null;
    resetInstruction: () => void;
};
export declare const CustomNavigate: React.FC<{
    to?: string | null;
    replace?: boolean;
}>;
export {};
//# sourceMappingURL=index.d.ts.map