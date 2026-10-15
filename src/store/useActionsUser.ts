import { create } from "zustand";
import { IActions } from "@/interfaces";
import { EScopeLevelCode } from "@/enums";



export interface ActionsUserStore {
    actionsUser: IActions;
    setActionsUser: (actionsUser: IActions) => void;
}

export const useActionsUser = create<ActionsUserStore>(set => ({
    actionsUser: {
        allActions: false,
        read: false,
        create: false,
        update: false,
        delete: false,
        scopeLevelId: 0,
        scopeLevelName: '',
        scopeLevelCode: EScopeLevelCode.PROPIO,
    },
    setActionsUser: (actionsUser: IActions) => set({ actionsUser }),
}));