import { Layout } from "antd";
import { HeaderLayout } from "./components/Header";
import { SidebarLayout } from "./components/Sidebar";
import { DefaultOptionType } from "antd/es/select";
import { ReactNode } from "react";
import { useAppLayoutSelectionPersistence } from "./components/store/useAppLayoutSelectionPersistence";
import { IProgram } from "@/interfaces";
export interface AppLayoutProps {
  optionsCompany: DefaultOptionType[];
  appNavigate: () => void;
  loadingAppLayout: boolean;
  children: ReactNode;
  menuItemsNavigate: (program: IProgram) => void;
}

export const AppLayout = ({ optionsCompany, loadingAppLayout, children, appNavigate, menuItemsNavigate }: AppLayoutProps) => {
  useAppLayoutSelectionPersistence(optionsCompany, loadingAppLayout, appNavigate);
  return (    <div className="flex h-[100dvh] w-full overflow-hidden">
      <Layout className="md:p-0.5 gap-0.5 md:gap-2">
        <HeaderLayout
          optionsCompany={optionsCompany}
          loadingAppLayout={loadingAppLayout}
          appNavigate={appNavigate}
        />
        <SidebarLayout 
          loadingAppLayout={loadingAppLayout}
          menuItemsNavigate={menuItemsNavigate}
        >
          {children}
        </SidebarLayout>
      </Layout>
    </div>
  );
};