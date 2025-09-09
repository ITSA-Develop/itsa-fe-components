import { ComponentType, ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

import { paths } from './paths';

export type RoutesPathsProp = paths | string;
export type RouteRCTypeProp = ComponentType<any> | null | undefined;

type ProtectedType = { onlyForStaff?: boolean };

type RoutePathsType = { path: RoutesPathsProp | RoutesPathsProp[] };

export type ProtectedRouteProps = RouteProps &
	ProtectedType &
	RoutePathsType & {
		component: ReactNode;
	};

export type PublicRouteProps = RouteProps &
	RoutePathsType & {
		component: ReactNode;
	};
export type BackOfficeRouteProps = RouteProps & RoutePathsType;

export type LayoutComponentProps = {
	component: ReactNode;
};

export type RouteResolverProps = {
	Component: RouteRCTypeProp;
	userData?: any; // TODO: tbd
	isProtected?: boolean;
	isAnonymous?: boolean;
};

export type TLocation = {
	pathname: string;
	hash?: string;
	search?: string;
};

export type ProtectedProps = {
	Component: ReactNode;
	location: TLocation;
} & ProtectedType;
