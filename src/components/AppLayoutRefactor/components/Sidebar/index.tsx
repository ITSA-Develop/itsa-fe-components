import { Drawer } from "@/components/Drawer/Drawer";
import { useAppLayoutFooter } from "@/hooks";
import { ReactNode } from "react";
import { useSidebarLayoutStore } from "../store/useSidebarLayoutStore";

export interface SidebarLayoutProps {
	loadingAppLayout: boolean;
  children: ReactNode;
}

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { footerComponent } = useAppLayoutFooter();
  const { open, setOpen } = useSidebarLayoutStore();
	return <div>
    <Drawer
      title="Resizable Drawer"
      placement={"left"}
      onClose={() => setOpen(false)}
      open={open}
      key={"left"}
      width={320}
      height={450}
    >
      <p>Drag the edge to resize the drawer</p>
      <p>Current size: {320}px</p>
    </Drawer>
    {children}
    {footerComponent !== undefined && (
      <div className="h-auto w-full lg:z-50 rounded-bl-lg rounded-br-lg p-1">{footerComponent}</div>
    )}
  </div>;
};