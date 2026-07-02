import { Steps, type StepsProps } from 'antd';
import { getWizardStepsStyles } from './WizardSteps.styles';
import { getWizardStepsDefaultStyles } from './WizardSteps.default.styles';
import { useViewportStore } from '@/store';

export interface IWizardStepsProps {
	current: number;
	items: StepsProps['items'];
	onChange?: (stepIndex: number) => void;
	className?: string;
	type?: 'default' | 'navigation' | 'inline' | 'itsa-panel';
	height?: number;
	arrowWidth?: number;
	withContainer?: boolean;
	containerPadding?: string;
	labelPlacement?: 'horizontal' | 'vertical';
	size?: 'small' | 'default';
}

export const WizardSteps = ({ 
	current, 
	items, 
	onChange, 
	className = '', 
	type = 'default',
	height = 48, 
	arrowWidth = 24,
	withContainer = true,
	containerPadding = 'p-2',
	labelPlacement = 'horizontal',
	size = 'default'
}: IWizardStepsProps) => {
	const {width} = useViewportStore();
	const isMobile = width < 650;
	const containerId = `wizard-steps-${Math.random().toString(36).substr(2, 9)}`;
	const isItsaPanel = type === 'itsa-panel';

	const containerStyles = {
		'--wizard-height': `${height}px`,
		'--wizard-arrow-width': `${arrowWidth}px`,
	} as React.CSSProperties;

	if (!isItsaPanel) {
		return (
			<>
				<style>{getWizardStepsDefaultStyles()}</style>
				<div className={withContainer ? `bg-white ${containerPadding} rounded-lg shadow-sm ${className}` : className}>
					<Steps 
						className="itsa-wizard-steps" 
						type={type} 
						current={current} 
						items={items} 
						onChange={onChange}
						labelPlacement={labelPlacement}
						size={isMobile ? 'small' : size}
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<style>{getWizardStepsStyles(containerId, arrowWidth)}</style>
			<div 
				id={containerId} 
				className={withContainer ? `bg-white ${containerPadding} rounded-lg shadow-sm ${className}` : className}
				style={containerStyles}
			>
				<Steps className="wizard-steps" current={current} items={items} onChange={onChange} size={isMobile ? 'small' : size} />
			</div>
		</>
	);
};
