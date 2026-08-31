
import { SidebarLayout } from "./components/Sidebar";



export const AppLayout = () => {
	return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
			<HeaderLayout />
			<SidebarLayout />
		</div>
	);
};