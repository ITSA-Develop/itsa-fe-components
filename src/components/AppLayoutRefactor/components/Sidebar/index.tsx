import { Drawer } from "@/components/Drawer/Drawer";
import { useAppLayoutFooter } from "@/hooks";
import { ReactNode, useState } from "react";
import { useSidebarLayoutStore } from "../store";
import { DoubleLeftOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { sidebarStyles } from "./styles";
import { MenuItems } from "./components/MenuItems";
import { IProgram } from "@/interfaces";

export interface SidebarLayoutProps {
	loadingAppLayout: boolean;
  children: ReactNode;
  menuItemsNavigate: (program: IProgram) => void;
}

export const SidebarLayout = ({ children, menuItemsNavigate }: SidebarLayoutProps) => {
  const { footerComponent } = useAppLayoutFooter();
  const { open, setOpen } = useSidebarLayoutStore();
  const [openKeysMenuOptions, setOpenKeysMenuOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const drawerTopOffset = "calc(4rem + 0.2rem)";

  const closeDrawer = () => {
    setOpen(false);
  }

  const navigateToHome = () => {
    closeDrawer();
    const homeProgram: IProgram = {
      id: 0,
      name: 'Home',
      path: '/home',
      icon: 'home',
      root: true,
      roleId: 0,
    };
    menuItemsNavigate(homeProgram);
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

	return <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pl-1 pr-1">
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
        <Input
          type="text"
          placeholder="Buscar..."
          allowClear
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          suffix={<SearchOutlined className="text-gray-300" />}
        />
        <MenuItems
          openKeysMenuOptions={openKeysMenuOptions}
          onOpenKeysChange={setOpenKeysMenuOptions}
          searchTerm={searchTerm}
          menuItemsNavigate={menuItemsNavigate}
        />
      </div>
    </Drawer>
    <div className="min-h-0 min-w-0 max-w-full flex-1 overflow-auto rounded-lg bg-white-100 p-2">
      {children}
    </div>
    {footerComponent !== undefined && (
      <div className="h-auto w-full shrink-0 lg:z-50 rounded-bl-lg rounded-br-lg p-1">{footerComponent}</div>
    )}
  </div>;
};