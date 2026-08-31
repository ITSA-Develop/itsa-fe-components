import { HeaderLayout } from "./components/header";
import { SidebarLayout } from "./components/sidebar";



export const AppLayout = () => {
	return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
			<HeaderLayout />
			<SidebarLayout />
		</div>
	);
};