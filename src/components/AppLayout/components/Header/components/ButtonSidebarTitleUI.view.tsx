import { Button } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useSidebarStore } from '@/hooks';
import { LogoKAI } from '@/components/Login/components/LogoKAI';

export interface ButtonSidebarTitleUIProps {
  environment: string;
}

export const ButtonSidebarTitleUI = ({ environment }: ButtonSidebarTitleUIProps) => {
  const { collapsed, setCollapsed } = useSidebarStore();

  return <div className="w-full flex flex-row items-center justify-start gap-2">
    <Button
      type="text"
      icon={<MenuUnfoldOutlined className="text-white-100" />}
      onClick={() => setCollapsed(!collapsed)}
    />
    {environment !== 'PRODUCCION' && (
      <div
        className="flex justify-center items-center rounded-full p-2"
        style={{ border: '1px solid #f0f0f0' }}
      >
        <strong className="text-white-100">{environment}</strong>
      </div>
    )}
    {environment === 'PRODUCCION' && (
      <div className="hidden md:block">
        <LogoKAI variant="header" />
      </div>
    )}
  </div>;
};