import { HomeIcon, IconCamion } from "@/assets/icons";
import { AppstoreOutlined } from "@ant-design/icons";

interface IconMenuProps {
	icon: string;
}


export const IconMenu = ({ icon }: IconMenuProps) => {
	switch (icon) {
		case 'home':
			return <HomeIcon style={{  width: '18px', height: '18px' }} />;
		case 'IconCamion':
			return <IconCamion className="w-4 h-4" />;
        case 'IconMenu':
            return <AppstoreOutlined className="w-4 h-4" />;
		default:
			return <AppstoreOutlined className="w-4 h-4" />;
	}
};
