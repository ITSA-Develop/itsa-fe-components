interface INewEmailFormProps {
    emailValue: string;
    isEditable: boolean;
    handleAction: () => void;
    handleCancel: () => void;
    isSingleEmail?: boolean;
    errors?: {
        newEmail: string;
        newEmailType: string;
    };
}
export declare const NewEmailForm: ({ emailValue, isEditable, handleAction, handleCancel, isSingleEmail, errors, }: INewEmailFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NewEmailForm.d.ts.map