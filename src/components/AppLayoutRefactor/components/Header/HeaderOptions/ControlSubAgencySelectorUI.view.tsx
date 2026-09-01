import { IAgency, ISubAgency } from '@/interfaces';
import { ShopFilled } from '@ant-design/icons';
import { TreeSelect, TreeSelectProps } from 'antd';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useAppLayoutStore } from '../../store/useAppLayoutStore';
import {
  MOBILE_SELECT_WRAPPER_CLASSNAME,
  MOBILE_SELECT_WRAPPER_STYLE,
  MOBILE_TREE_SELECT_CLASSNAME,
  POPUP_STYLES,
  SELECT_WRAPPER_CLASSNAME,
  SELECT_WRAPPER_STYLE,
  TREE_SELECT_CLASSNAME,
} from '@/constants';
import { renderTruncatedHeaderSelectLabel } from '../utils/headerSelectLabel';

export interface MultiCompanyTreeNode {
  id: string | number;
  pId: string | number | null;
  value: string;
  title: ReactNode;
  isLeaf?: boolean;
  selectable?: boolean;
  children?: MultiCompanyTreeNode[];
  data?: ISubAgency;
}

export interface ControlSubAgencySelectorUIProps {
  loadRootNodes?: () => Promise<MultiCompanyTreeNode[]>;
  loadChildren?: (node: MultiCompanyTreeNode) => Promise<MultiCompanyTreeNode[]>;
}

const flattenNodes = (nodes: MultiCompanyTreeNode[], parentId?: string | number): MultiCompanyTreeNode[] =>
  nodes.flatMap(({ children, ...node }) => {
    const flatNode: MultiCompanyTreeNode = {
      ...node,
      pId: parentId ?? node.pId,
      selectable: node.isLeaf === true,
    };  

    return [flatNode, ...(children ? flattenNodes(children, flatNode.id) : [])];
  });

const mapAgenciesToTreeNodes = (agencies: IAgency[]): MultiCompanyTreeNode[] =>
  agencies.map(agency => ({
    id: `agency-${agency.id}`,
    pId: null,
    value: `agency-${agency.id}`,
    title: agency.name,
    isLeaf: false,
    selectable: false,
    children: agency.subAgencies.map(sub => ({
      id: `subagency-${sub.id}`,
      pId: `agency-${agency.id}`,
      value: `subagency-${sub.id}`,
      title: sub.name,
      isLeaf: true,
      selectable: true,
      data: sub,
    })),
  }));

export const ControlSubAgencySelectorUI = ({ loadChildren }: ControlSubAgencySelectorUIProps) => {
  const { subAgency, setSubAgency, setModule, setSubmodule, permissions } = useAppLayoutStore();
  const [treeData, setTreeData] = useState<MultiCompanyTreeNode[]>([]);

  useEffect(() => {
    if (permissions === undefined) return;
    setTreeData(flattenNodes(mapAgenciesToTreeNodes(permissions.agencies)));
  }, [permissions]);

  const findNodeByValue = useCallback(
    (value: string) => treeData.find(node => node.value === value),
    [treeData],
  );

  const onLoadData: TreeSelectProps<string>['loadData'] = async treeNode => {
    if (!loadChildren) return;

    const parentNode = findNodeByValue(String(treeNode.value ?? treeNode.key ?? ''));
    if (!parentNode) return;

    const children = await loadChildren(parentNode);
    setTreeData(currentTreeData => {
      const currentValues = new Set(currentTreeData.map(node => node.value));
      const newNodes = flattenNodes(children, parentNode.id).filter(node => !currentValues.has(node.value));

      return [...currentTreeData, ...newNodes];
    });
  };

  const onSelect = (value: string) => {
    const selectedNode = findNodeByValue(value);
    if (!selectedNode?.data) return;
    const module = selectedNode.data.modules[0];
    setModule(module);
    const submodule = module?.submodules[0];
    setSubmodule(submodule);
    setSubAgency(selectedNode.data);
  };

  const selectedValue = subAgency
    ? treeData.find(node => node.data?.id === subAgency.id)?.value
    : undefined;

  const treeSelectProps = {
    treeDataSimpleMode: true as const,
    treeData,
    loadData: onLoadData,
    loading: false,
    value: selectedValue,
    onSelect,
    size: 'large' as const,
    popupMatchSelectWidth: false,
    styles: POPUP_STYLES,
    labelRender: renderTruncatedHeaderSelectLabel,
  };

  return (
    <>
      <div className={`hidden md:block ${SELECT_WRAPPER_CLASSNAME}`} style={SELECT_WRAPPER_STYLE}>
        <TreeSelect<string>
          {...treeSelectProps}
          placeholder="Seleccione una agencia"
          className={TREE_SELECT_CLASSNAME}
        />
      </div>

      <div className={MOBILE_SELECT_WRAPPER_CLASSNAME} style={MOBILE_SELECT_WRAPPER_STYLE}>
        <TreeSelect<string>
          {...treeSelectProps}
          placeholder={<ShopFilled />}
          suffixIcon={null}
          placement="bottomRight"
          className={MOBILE_TREE_SELECT_CLASSNAME}
        />
      </div>
    </>
  );
};
