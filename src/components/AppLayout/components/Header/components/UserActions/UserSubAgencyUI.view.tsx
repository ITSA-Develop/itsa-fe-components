import { useEncrypt } from '@/hooks/useEncrypt/useEncrypt';
import { IAgency } from '@/interfaces';
import { useAppLayoutStore } from '@/store/appLayout.store';
import { ShopFilled } from '@ant-design/icons';
import { TreeSelect, TreeSelectProps } from 'antd';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const TREE_SELECT_CLASSNAME =
  'w-full min-w-0 [&_.ant-select-selector]:!bg-primary-600 [&_.ant-select-selector]:!border-primary-700 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-white-100 [&_.ant-select-selection-placeholder]:!text-white-100 [&_.ant-select-arrow]:!text-white-100 hover:[&_.ant-select-selector]:!bg-primary-700 hover:[&_.ant-select-selector]:!border-primary-700 [&.ant-select-focused_.ant-select-selector]:!bg-primary-700 [&.ant-select-focused_.ant-select-selector]:!border-primary-700';

const SELECT_WRAPPER_CLASSNAME = 'w-[200px] min-w-[160px] max-w-[220px] shrink-0';

// El trigger en mobile solo muestra el icono, por lo que el popup no puede heredar su ancho.
const POPUP_STYLES: TreeSelectProps['styles'] = {
  popup: { root: { minWidth: 220, maxWidth: 'calc(100vw - 24px)', maxHeight: 320, overflow: 'auto' } },
};

export interface MultiCompanyTreeNode {
  id: string | number;
  pId: string | number | null;
  value: string;
  title: ReactNode;
  isLeaf?: boolean;
  selectable?: boolean;
  children?: MultiCompanyTreeNode[];
  data?: IAgency;
}

export interface UserSubAgencyUIProps {
  loadRootNodes?: () => Promise<MultiCompanyTreeNode[]>;
  loadChildren?: (node: MultiCompanyTreeNode) => Promise<MultiCompanyTreeNode[]>;
}

// treeDataSimpleMode trabaja con una lista plana relacionada por pId, por lo que los
// hijos anidados que devuelva el consumidor se aplanan conservando su jerarquía.
const flattenNodes = (nodes: MultiCompanyTreeNode[], parentId?: string | number): MultiCompanyTreeNode[] =>
  nodes.flatMap(({ children, ...node }) => {
    const flatNode: MultiCompanyTreeNode = {
      ...node,
      pId: parentId ?? node.pId,
      selectable: node.isLeaf === true,
    };

    return [flatNode, ...(children ? flattenNodes(children, flatNode.id) : [])];
  });

export const UserSubAgencyUI = ({ loadRootNodes, loadChildren }: UserSubAgencyUIProps) => {
  const { encryptKey } = useEncrypt();
  const { currentSubAgency, setCurrentSubAgency } = useAppLayoutStore();
  const [treeData, setTreeData] = useState<MultiCompanyTreeNode[]>([]);
  const [loadingRootNodes, setLoadingRootNodes] = useState(false);
  const rootNodesRequested = useRef(false);

  useEffect(() => {
    if (rootNodesRequested.current || !loadRootNodes) return;
    rootNodesRequested.current = true;

    let isMounted = true;
    const loadInitialData = async () => {
      setLoadingRootNodes(true);
      try {
        const rootNodes = await loadRootNodes();
        if (isMounted) setTreeData(flattenNodes(rootNodes));
      } finally {
        if (isMounted) setLoadingRootNodes(false);
      }
    };

    void loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [loadRootNodes]);

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

    setCurrentSubAgency(selectedNode.data, encryptKey);
  };

  const selectedValue = currentSubAgency
    ? treeData.find(node => node.data?.id === currentSubAgency.id)?.value
    : undefined;

  const treeSelectProps = {
    treeDataSimpleMode: true as const,
    treeData,
    loadData: onLoadData,
    loading: loadingRootNodes,
    value: selectedValue,
    onSelect,
    popupMatchSelectWidth: false,
    styles: POPUP_STYLES,
  };

  return (
    <>
      <div className={`hidden md:block ${SELECT_WRAPPER_CLASSNAME}`}>
        <TreeSelect<string>
          {...treeSelectProps}
          placeholder="Seleccione una agencia"
          className={TREE_SELECT_CLASSNAME}
        />
      </div>

      <div className="block shrink-0 md:hidden">
        <TreeSelect<string>
          {...treeSelectProps}
          placeholder={<ShopFilled />}
          placement="bottomRight"
          className={TREE_SELECT_CLASSNAME}
        />
      </div>
    </>
  );
};
