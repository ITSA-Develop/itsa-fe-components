import { Drawer } from "@/components/Drawer/Drawer";
import { useAppLayoutFooter } from "@/hooks";
import { ReactNode } from "react";
import { useSidebarLayoutStore } from "../store/useSidebarLayoutStore";
import { DoubleLeftOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { sidebarStyles } from "./styles";
import { MenuItems } from "./components/MenuItems";

export interface SidebarLayoutProps {
	loadingAppLayout: boolean;
  children: ReactNode;
}

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { footerComponent } = useAppLayoutFooter();
  const { open, setOpen } = useSidebarLayoutStore();
  const drawerTopOffset = "calc(4rem + 0.2rem)";

  const closeDrawer = () => {
    setOpen(false);
  }

  const navigateToHome = () => {
    closeDrawer();
    window.location.href = "/home";
  }
  
  const titleDrawer = () => {
    return <div className="flex-1">
      <Button icon={<HomeOutlined className="text-base text-gray-400" />} type="text" size="middle" onClick={navigateToHome}>
        <strong className="text-gray-400">Inicio</strong>
      </Button>
    </div>;
  }
  
  const footerDrawer = () => {
    return <div className="flex flex-row justify-end">
      <Button icon={<DoubleLeftOutlined className="text-base text-gray-400" />} type="text" size="middle" onClick={closeDrawer}>
      </Button>
    </div>;
  }

	return <div className="flex flex-col h-full">
    <Drawer
      title={titleDrawer()}
      footer={footerDrawer()}
      placement={"left"}
      onClose={() => setOpen(false)}
      open={open}
      key={"left"}
      width={320}
      rootStyle={{
        top: drawerTopOffset,        
      }}
      closable={false}
      styles={sidebarStyles}
    >
      <div className="flex flex-col gap-2 p-2">
        <Input type="text" placeholder="Buscar..." suffix={<SearchOutlined className="text-gray-300" />} />
        <MenuItems openKeysMenuOptions={[]} onOpenKeysChange={() => {}} />
      </div>
    </Drawer>
    {children}
    {footerComponent !== undefined && (
      <div className="h-auto w-full lg:z-50 rounded-bl-lg rounded-br-lg p-1">{footerComponent}</div>
    )}
  </div>;
};