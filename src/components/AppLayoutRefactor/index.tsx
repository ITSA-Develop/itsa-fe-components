
import { Layout } from "antd";
import { HeaderLayout } from "./components/Header";
import { SidebarLayout } from "./components/Sidebar";
import { DefaultOptionType } from "antd/es/select";
import { IItemNotification, IPermission } from "@/interfaces";
import { ReactNode } from "react";

export interface AppLayoutProps {
  optionsCompany: DefaultOptionType[];
  notifications: IItemNotification[];
  loadingAppLayout: boolean;
  children: ReactNode;
  permissions?: IPermission;
}
//AppLayout.stories.tsx

export const AppLayout = ({ optionsCompany, notifications, loadingAppLayout, children }: AppLayoutProps) => {
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <Layout className="md:p-2 gap-0.5 md:gap-2">
        <HeaderLayout
          optionsCompany={optionsCompany}
          notifications={notifications}
          loadingAppLayout={loadingAppLayout}
        />
        <SidebarLayout 
          loadingAppLayout={loadingAppLayout} 
        >
          {children}
        </SidebarLayout>
      </Layout>
    </div>
  );
};