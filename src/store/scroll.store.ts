import { create } from 'zustand';

type ScrollStore = {
	shouldShowScrollButton: boolean;
	setShouldShowScrollButton: (value: boolean) => void;
	resetScrollButton: () => void;
};

export const useScrollStore = create<ScrollStore>(set => ({
	shouldShowScrollButton: false,
	setShouldShowScrollButton: value => set({ shouldShowScrollButton: value }),
	resetScrollButton: () => set({ shouldShowScrollButton: false }),
}));
