import {
  Brain,
  CellIdsListener,
  CellListener,
  HasCellListener,
  HasRowListener,
  HasTableCellListener,
  HasTableListener,
  HasTablesListener,
  HasValueListener,
  HasValuesListener,
  MapBoolean,
  MapString,
  RowCountListener,
  RowIdsListener,
  RowListener,
  SortedRowIdsListener,
  TableCellIdsListener,
  TableId,
  TableIdsListener,
  TableListener,
  Tables,
  TablesListener,
  TablesWhenSet,
  TodosCellId,
  TodosRow,
  TodosRowWhenSet,
  TodosTable,
  TodosTableWhenSet,
  ValueId,
  ValueIdsListener,
  ValueListener,
  Values,
  ValuesListener,
  ValuesWhenSet,
} from './brain.d';
import {
  BrainOrBrainId,
  CellProps,
  ModeValueView as ModeValueViewDecl,
  Provider as ProviderDecl,
  ProviderProps,
  RowProps,
  SortedTableProps,
  TableProps,
  TablesProps,
  TablesView as TablesViewDecl,
  TodosDoneCellView as TodosDoneCellViewDecl,
  TodosIdCellView as TodosIdCellViewDecl,
  TodosRowView as TodosRowViewDecl,
  TodosSortedTableView as TodosSortedTableViewDecl,
  TodosTableView as TodosTableViewDecl,
  TodosTextCellView as TodosTextCellViewDecl,
  ValueProps,
  ValuesProps,
  ValuesView as ValuesViewDecl,
  useAddTodosRowCallback as useAddTodosRowCallbackDecl,
  useBrain as useBrainDecl,
  useCellIdsListener as useCellIdsListenerDecl,
  useCellListener as useCellListenerDecl,
  useCreateBrain as useCreateBrainDecl,
  useDelModeValueCallback as useDelModeValueCallbackDecl,
  useDelTablesCallback as useDelTablesCallbackDecl,
  useDelTodosDoneCellCallback as useDelTodosDoneCellCallbackDecl,
  useDelTodosIdCellCallback as useDelTodosIdCellCallbackDecl,
  useDelTodosRowCallback as useDelTodosRowCallbackDecl,
  useDelTodosTableCallback as useDelTodosTableCallbackDecl,
  useDelTodosTextCellCallback as useDelTodosTextCellCallbackDecl,
  useDelValuesCallback as useDelValuesCallbackDecl,
  useHasCellListener as useHasCellListenerDecl,
  useHasModeValue as useHasModeValueDecl,
  useHasRowListener as useHasRowListenerDecl,
  useHasTableCellListener as useHasTableCellListenerDecl,
  useHasTableListener as useHasTableListenerDecl,
  useHasTables as useHasTablesDecl,
  useHasTablesListener as useHasTablesListenerDecl,
  useHasTodosDoneCell as useHasTodosDoneCellDecl,
  useHasTodosDoneTableCell as useHasTodosDoneTableCellDecl,
  useHasTodosIdCell as useHasTodosIdCellDecl,
  useHasTodosIdTableCell as useHasTodosIdTableCellDecl,
  useHasTodosRow as useHasTodosRowDecl,
  useHasTodosTable as useHasTodosTableDecl,
  useHasTodosTextCell as useHasTodosTextCellDecl,
  useHasTodosTextTableCell as useHasTodosTextTableCellDecl,
  useHasValueListener as useHasValueListenerDecl,
  useHasValues as useHasValuesDecl,
  useHasValuesListener as useHasValuesListenerDecl,
  useModeValue as useModeValueDecl,
  useRowCountListener as useRowCountListenerDecl,
  useRowIdsListener as useRowIdsListenerDecl,
  useRowListener as useRowListenerDecl,
  useSetModeValueCallback as useSetModeValueCallbackDecl,
  useSetPartialValuesCallback as useSetPartialValuesCallbackDecl,
  useSetTablesCallback as useSetTablesCallbackDecl,
  useSetTodosDoneCellCallback as useSetTodosDoneCellCallbackDecl,
  useSetTodosIdCellCallback as useSetTodosIdCellCallbackDecl,
  useSetTodosPartialRowCallback as useSetTodosPartialRowCallbackDecl,
  useSetTodosRowCallback as useSetTodosRowCallbackDecl,
  useSetTodosTableCallback as useSetTodosTableCallbackDecl,
  useSetTodosTextCellCallback as useSetTodosTextCellCallbackDecl,
  useSetValuesCallback as useSetValuesCallbackDecl,
  useSortedRowIdsListener as useSortedRowIdsListenerDecl,
  useTableCellIdsListener as useTableCellIdsListenerDecl,
  useTableIds as useTableIdsDecl,
  useTableIdsListener as useTableIdsListenerDecl,
  useTableListener as useTableListenerDecl,
  useTables as useTablesDecl,
  useTablesListener as useTablesListenerDecl,
  useTodosCellIds as useTodosCellIdsDecl,
  useTodosDoneCell as useTodosDoneCellDecl,
  useTodosIdCell as useTodosIdCellDecl,
  useTodosRowCount as useTodosRowCountDecl,
  useTodosRow as useTodosRowDecl,
  useTodosRowIds as useTodosRowIdsDecl,
  useTodosSortedRowIds as useTodosSortedRowIdsDecl,
  useTodosTableCellIds as useTodosTableCellIdsDecl,
  useTodosTable as useTodosTableDecl,
  useTodosTextCell as useTodosTextCellDecl,
  useValueIds as useValueIdsDecl,
  useValueIdsListener as useValueIdsListenerDecl,
  useValueListener as useValueListenerDecl,
  useValues as useValuesDecl,
  useValuesListener as useValuesListenerDecl,
} from './brain-ui-react.d';
import {
  Callback,
  Id,
  IdOrNull,
  Ids,
  ParameterizedCallback,
  Store,
} from 'tinybase';
import {
  ExtraProps,
  useAddRowCallback as useAddRowCallbackCore,
  useCell as useCellCore,
  useCellIds,
  useCellIds as useCellIdsCore,
  useCellIdsListener as useCellIdsListenerCore,
  useCellListener as useCellListenerCore,
  useDelCellCallback as useDelCellCallbackCore,
  useDelRowCallback as useDelRowCallbackCore,
  useDelTableCallback as useDelTableCallbackCore,
  useDelTablesCallback as useDelTablesCallbackCore,
  useDelValueCallback as useDelValueCallbackCore,
  useDelValuesCallback as useDelValuesCallbackCore,
  useHasCell as useHasCellCore,
  useHasCellListener as useHasCellListenerCore,
  useHasRow as useHasRowCore,
  useHasRowListener as useHasRowListenerCore,
  useHasTableCell as useHasTableCellCore,
  useHasTableCellListener as useHasTableCellListenerCore,
  useHasTable as useHasTableCore,
  useHasTableListener as useHasTableListenerCore,
  useHasTables as useHasTablesCore,
  useHasTablesListener as useHasTablesListenerCore,
  useHasValue as useHasValueCore,
  useHasValueListener as useHasValueListenerCore,
  useHasValues as useHasValuesCore,
  useHasValuesListener as useHasValuesListenerCore,
  useRow as useRowCore,
  useRowCount as useRowCountCore,
  useRowCountListener as useRowCountListenerCore,
  useRowIds as useRowIdsCore,
  useRowIdsListener as useRowIdsListenerCore,
  useRowListener as useRowListenerCore,
  useSetCellCallback as useSetCellCallbackCore,
  useSetPartialRowCallback as useSetPartialRowCallbackCore,
  useSetPartialValuesCallback as useSetPartialValuesCallbackCore,
  useSetRowCallback as useSetRowCallbackCore,
  useSetTableCallback as useSetTableCallbackCore,
  useSetTablesCallback as useSetTablesCallbackCore,
  useSetValueCallback as useSetValueCallbackCore,
  useSetValuesCallback as useSetValuesCallbackCore,
  useSortedRowIds as useSortedRowIdsCore,
  useSortedRowIdsListener as useSortedRowIdsListenerCore,
  useTableCellIds as useTableCellIdsCore,
  useTableCellIdsListener as useTableCellIdsListenerCore,
  useTable as useTableCore,
  useTableIds as useTableIdsCore,
  useTableIdsListener as useTableIdsListenerCore,
  useTableListener as useTableListenerCore,
  useTables as useTablesCore,
  useTablesListener as useTablesListenerCore,
  useValue as useValueCore,
  useValueIds as useValueIdsCore,
  useValueIdsListener as useValueIdsListenerCore,
  useValueListener as useValueListenerCore,
  useValues as useValuesCore,
  useValuesListener as useValuesListenerCore,
} from 'tinybase/ui-react';
import React from 'react';

const {createContext, useContext, useMemo} = React;

const Context = createContext<[Brain?, {[brainId: Id]: Brain}?]>([]);

const useHook = (
  brainOrBrainId: BrainOrBrainId | undefined,
  hook: (...params: any[]) => any,
  preParams: any[],
  postParams: any[] = [],
) => {
  const brain = useBrain(brainOrBrainId as Id);
  return hook(
    ...preParams,
    (brainOrBrainId == null || typeof brainOrBrainId == 'string'
      ? brain
      : brainOrBrainId
    )?.getStore(),
    ...postParams,
  );
};

const getProps = (getProps: ((id: any) => ExtraProps) | undefined, id: Id) =>
  getProps == null ? ({} as ExtraProps) : getProps(id);

const wrap = (
  children: any,
  separator?: any,
  encloseWithId?: boolean,
  id?: Id,
) => {
  const separated =
    separator == null || !Array.isArray(children)
      ? children
      : children.map((child, c) => (c > 0 ? [separator, child] : child));
  return encloseWithId ? [id, ':{', separated, '}'] : separated;
};

const useCustomOrDefaultCellIds = (
  customCellIds: Ids | undefined,
  tableId: Id,
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId | undefined,
) => {
  const defaultCellIds = useHook(brainOrBrainId, useCellIds, [tableId, rowId]);
  return customCellIds ?? defaultCellIds;
};

const NullComponent = () => null;

const tableView = (
  {
    brain,
    rowComponent,
    getRowComponentProps,
    customCellIds,
    separator,
    debugIds,
  }: any,
  rowIds: Ids,
  tableId: Id,
  defaultRowComponent: React.ComponentType<any>,
) => {
  const Row = rowComponent ?? defaultRowComponent;
  return wrap(
    rowIds.map((rowId) => (
      <Row
        {...getProps(getRowComponentProps, rowId)}
        key={rowId}
        tableId={tableId}
        rowId={rowId}
        customCellIds={customCellIds}
        brain={brain}
        debugIds={debugIds}
      />
    )),
    separator,
    debugIds,
    tableId,
  );
};

const TODOS = 'todos';

const getDefaultTableComponent = (tableId: Id) =>
  tableId == TODOS ? TodosTableView : NullComponent;

const ID = 'id';

const TEXT = 'text';

const DONE = 'done';

const getDefaultCellComponent = (tableId: Id, cellId: Id) =>
  tableId == TODOS
    ? cellId == ID
      ? TodosIdCellView
      : cellId == TEXT
        ? TodosTextCellView
        : cellId == DONE
          ? TodosDoneCellView
          : NullComponent
    : NullComponent;

const MODE = 'mode';

const getDefaultValueComponent = (valueId: Id) =>
  valueId == MODE ? ModeValueView : NullComponent;

export const useCreateBrain: typeof useCreateBrainDecl = (
  create: () => Brain,
  createDeps?: React.DependencyList,
): Brain =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(create, createDeps);

export const useBrain: typeof useBrainDecl = (id?: Id): Brain | undefined => {
  const contextValue = useContext(Context);
  return id == null ? contextValue[0] : contextValue[1]?.[id];
};

export const useHasTables: typeof useHasTablesDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasTablesCore, []);

export const useTables: typeof useTablesDecl = (
  brainOrBrainId?: BrainOrBrainId,
): Tables => useHook(brainOrBrainId, useTablesCore, []);

export const useTableIds: typeof useTableIdsDecl = (
  brainOrBrainId?: BrainOrBrainId,
): TableId[] => useHook(brainOrBrainId, useTableIdsCore, []);

export const useSetTablesCallback: typeof useSetTablesCallbackDecl = <
  Parameter,
>(
  getTables: (parameter: Parameter, store: Store) => TablesWhenSet,
  getTablesDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, tables: TablesWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetTablesCallbackCore,
    [getTables, getTablesDeps],
    [then, thenDeps],
  );

export const useDelTablesCallback: typeof useDelTablesCallbackDecl = (
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(brainOrBrainId, useDelTablesCallbackCore, [], [then, thenDeps]);

export const TablesView: typeof TablesViewDecl = ({
  brain,
  tableComponents,
  getTableComponentProps,
  separator,
  debugIds,
}: TablesProps): any =>
  wrap(
    useTableIds(brain).map((tableId) => {
      const Table = (tableComponents?.[tableId] ??
        getDefaultTableComponent(tableId)) as React.ComponentType<
        TableProps<typeof tableId>
      >;
      return (
        <Table
          {...getProps(getTableComponentProps, tableId)}
          tableId={tableId}
          key={tableId}
          brain={brain}
          debugIds={debugIds}
        />
      );
    }),
    separator,
  );

export const useHasTodosTable: typeof useHasTodosTableDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasTableCore, [TODOS]);

export const useTodosTable: typeof useTodosTableDecl = (
  brainOrBrainId?: BrainOrBrainId,
): TodosTable => useHook(brainOrBrainId, useTableCore, [TODOS]);

export const useTodosTableCellIds: typeof useTodosTableCellIdsDecl = (
  brainOrBrainId?: BrainOrBrainId,
): Ids => useHook(brainOrBrainId, useTableCellIdsCore, [TODOS]);

export const useTodosRowCount: typeof useTodosRowCountDecl = (
  brainOrBrainId?: BrainOrBrainId,
): number => useHook(brainOrBrainId, useRowCountCore, [TODOS]);

export const useTodosRowIds: typeof useTodosRowIdsDecl = (
  brainOrBrainId?: BrainOrBrainId,
): Ids => useHook(brainOrBrainId, useRowIdsCore, [TODOS]);

export const useTodosSortedRowIds: typeof useTodosSortedRowIdsDecl = (
  cellId?: TodosCellId,
  descending?: boolean,
  offset?: number,
  limit?: number,
  brainOrBrainId?: BrainOrBrainId,
): Ids =>
  useHook(brainOrBrainId, useSortedRowIdsCore, [
    TODOS,
    cellId,
    descending,
    offset,
    limit,
  ]);

export const useHasTodosRow: typeof useHasTodosRowDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasRowCore, [TODOS, rowId]);

export const useTodosRow: typeof useTodosRowDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): TodosRow => useHook(brainOrBrainId, useRowCore, [TODOS, rowId]);

export const useTodosCellIds: typeof useTodosCellIdsDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): TodosCellId[] => useHook(brainOrBrainId, useCellIdsCore, [TODOS, rowId]);

export const useSetTodosTableCallback: typeof useSetTodosTableCallbackDecl = <
  Parameter,
>(
  getTable: (parameter: Parameter, store: Store) => TodosTableWhenSet,
  getTableDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, table: TodosTableWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetTableCallbackCore,
    [TODOS, getTable, getTableDeps],
    [then, thenDeps],
  );

export const useDelTodosTableCallback: typeof useDelTodosTableCallbackDecl = (
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(brainOrBrainId, useDelTableCallbackCore, [TODOS], [then, thenDeps]);

export const useSetTodosRowCallback: typeof useSetTodosRowCallbackDecl = <
  Parameter,
>(
  rowId: Id,
  getRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
  getRowDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, row: TodosRowWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetRowCallbackCore,
    [TODOS, rowId, getRow, getRowDeps],
    [then, thenDeps],
  );

export const useAddTodosRowCallback: typeof useAddTodosRowCallbackDecl = <
  Parameter,
>(
  getRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
  getRowDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (rowId: Id | undefined, store: Store, row: TodosRowWhenSet) => void,
  thenDeps?: React.DependencyList,
  reuseRowIds?: boolean,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useAddRowCallbackCore,
    [TODOS, getRow, getRowDeps],
    [then, thenDeps, reuseRowIds],
  );

export const useSetTodosPartialRowCallback: typeof useSetTodosPartialRowCallbackDecl =
  <Parameter,>(
    rowId: Id,
    getPartialRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
    getPartialRowDeps?: React.DependencyList,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store, partialRow: TodosRowWhenSet) => void,
    thenDeps?: React.DependencyList,
  ): ParameterizedCallback<Parameter> =>
    useHook(
      brainOrBrainId,
      useSetPartialRowCallbackCore,
      [TODOS, rowId, getPartialRow, getPartialRowDeps],
      [then, thenDeps],
    );

export const useDelTodosRowCallback: typeof useDelTodosRowCallbackDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(
    brainOrBrainId,
    useDelRowCallbackCore,
    [TODOS, rowId],
    [then, thenDeps],
  );

export const TodosRowView: typeof TodosRowViewDecl = ({
  rowId,
  brain,
  cellComponents,
  getCellComponentProps,
  customCellIds,
  separator,
  debugIds,
}: RowProps<'todos'>): any =>
  wrap(
    useCustomOrDefaultCellIds(customCellIds, TODOS, rowId, brain).map(
      (cellId: TodosCellId) => {
        const Cell = (cellComponents?.[cellId] ??
          getDefaultCellComponent(TODOS, cellId)) as React.ComponentType<
          CellProps<typeof TODOS, typeof cellId>
        >;
        return (
          <Cell
            {...getProps(getCellComponentProps, cellId)}
            key={cellId}
            tableId={TODOS}
            rowId={rowId}
            cellId={cellId}
            brain={brain}
            debugIds={debugIds}
          />
        );
      },
    ),
    separator,
    debugIds,
    rowId,
  );

export const TodosSortedTableView: typeof TodosSortedTableViewDecl = ({
  cellId,
  descending,
  offset,
  limit,
  ...props
}: SortedTableProps<'todos'>): any =>
  tableView(
    props,
    useTodosSortedRowIds(cellId, descending, offset, limit, props.brain),
    TODOS,
    TodosRowView,
  );

export const TodosTableView: typeof TodosTableViewDecl = (
  props: TableProps<'todos'>,
): any => tableView(props, useTodosRowIds(props.brain), TODOS, TodosRowView);

export const useHasTodosIdTableCell: typeof useHasTodosIdTableCellDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasTableCellCore, [TODOS, ID]);

export const useHasTodosIdCell: typeof useHasTodosIdCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasCellCore, [TODOS, rowId, ID]);

export const useTodosIdCell: typeof useTodosIdCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): string | undefined =>
  useHook(brainOrBrainId, useCellCore, [TODOS, rowId, ID]);

export const useSetTodosIdCellCallback: typeof useSetTodosIdCellCallbackDecl = <
  Parameter,
>(
  rowId: Id,
  getCell: (parameter: Parameter, store: Store) => string | MapString,
  getCellDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, cell: string | MapString) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetCellCallbackCore,
    [TODOS, rowId, ID, getCell, getCellDeps],
    [then, thenDeps],
  );

export const useDelTodosIdCellCallback: typeof useDelTodosIdCellCallbackDecl = (
  rowId: Id,
  forceDel?: boolean,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(
    brainOrBrainId,
    useDelCellCallbackCore,
    [TODOS, rowId, ID, forceDel],
    [then, thenDeps],
  );

export const TodosIdCellView: typeof TodosIdCellViewDecl = ({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'id'>): any =>
  wrap('' + useTodosIdCell(rowId, brain) ?? '', undefined, debugIds, ID);

export const useHasTodosTextTableCell: typeof useHasTodosTextTableCellDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasTableCellCore, [TODOS, TEXT]);

export const useHasTodosTextCell: typeof useHasTodosTextCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasCellCore, [TODOS, rowId, TEXT]);

export const useTodosTextCell: typeof useTodosTextCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): string | undefined =>
  useHook(brainOrBrainId, useCellCore, [TODOS, rowId, TEXT]);

export const useSetTodosTextCellCallback: typeof useSetTodosTextCellCallbackDecl =
  <Parameter,>(
    rowId: Id,
    getCell: (parameter: Parameter, store: Store) => string | MapString,
    getCellDeps?: React.DependencyList,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store, cell: string | MapString) => void,
    thenDeps?: React.DependencyList,
  ): ParameterizedCallback<Parameter> =>
    useHook(
      brainOrBrainId,
      useSetCellCallbackCore,
      [TODOS, rowId, TEXT, getCell, getCellDeps],
      [then, thenDeps],
    );

export const useDelTodosTextCellCallback: typeof useDelTodosTextCellCallbackDecl =
  (
    rowId: Id,
    forceDel?: boolean,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store) => void,
    thenDeps?: React.DependencyList,
  ): Callback =>
    useHook(
      brainOrBrainId,
      useDelCellCallbackCore,
      [TODOS, rowId, TEXT, forceDel],
      [then, thenDeps],
    );

export const TodosTextCellView: typeof TodosTextCellViewDecl = ({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'text'>): any =>
  wrap('' + useTodosTextCell(rowId, brain) ?? '', undefined, debugIds, TEXT);

export const useHasTodosDoneTableCell: typeof useHasTodosDoneTableCellDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasTableCellCore, [TODOS, DONE]);

export const useHasTodosDoneCell: typeof useHasTodosDoneCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasCellCore, [TODOS, rowId, DONE]);

export const useTodosDoneCell: typeof useTodosDoneCellDecl = (
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean | undefined =>
  useHook(brainOrBrainId, useCellCore, [TODOS, rowId, DONE]);

export const useSetTodosDoneCellCallback: typeof useSetTodosDoneCellCallbackDecl =
  <Parameter,>(
    rowId: Id,
    getCell: (parameter: Parameter, store: Store) => boolean | MapBoolean,
    getCellDeps?: React.DependencyList,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store, cell: boolean | MapBoolean) => void,
    thenDeps?: React.DependencyList,
  ): ParameterizedCallback<Parameter> =>
    useHook(
      brainOrBrainId,
      useSetCellCallbackCore,
      [TODOS, rowId, DONE, getCell, getCellDeps],
      [then, thenDeps],
    );

export const useDelTodosDoneCellCallback: typeof useDelTodosDoneCellCallbackDecl =
  (
    rowId: Id,
    forceDel?: boolean,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store) => void,
    thenDeps?: React.DependencyList,
  ): Callback =>
    useHook(
      brainOrBrainId,
      useDelCellCallbackCore,
      [TODOS, rowId, DONE, forceDel],
      [then, thenDeps],
    );

export const TodosDoneCellView: typeof TodosDoneCellViewDecl = ({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'done'>): any =>
  wrap('' + useTodosDoneCell(rowId, brain) ?? '', undefined, debugIds, DONE);

export const useHasTablesListener: typeof useHasTablesListenerDecl = (
  listener: HasTablesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasTablesListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useTablesListener: typeof useTablesListenerDecl = (
  listener: TablesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useTablesListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useTableIdsListener: typeof useTableIdsListenerDecl = (
  listener: TableIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useTableIdsListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasTableListener: typeof useHasTableListenerDecl = (
  tableId: TableId | null,
  listener: HasTableListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasTableListenerCore, [
    tableId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useTableListener: typeof useTableListenerDecl = (
  tableId: TableId | null,
  listener: TableListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useTableListenerCore, [
    tableId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useTableCellIdsListener: typeof useTableCellIdsListenerDecl = (
  tableId: TableId | null,
  listener: TableCellIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useTableCellIdsListenerCore, [
    tableId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasTableCellListener: typeof useHasTableCellListenerDecl = (
  tableId: TableId | null,
  cellId: TodosCellId | null,
  listener: HasTableCellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasTableCellListenerCore, [
    tableId,
    cellId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useRowCountListener: typeof useRowCountListenerDecl = (
  tableId: TableId | null,
  listener: RowCountListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useRowCountListenerCore, [
    tableId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useRowIdsListener: typeof useRowIdsListenerDecl = (
  tableId: TableId | null,
  listener: RowIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useRowIdsListenerCore, [
    tableId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useSortedRowIdsListener: typeof useSortedRowIdsListenerDecl = (
  tableId: TableId | null,
  cellId: TodosCellId | undefined,
  descending: boolean,
  offset: number,
  limit: number | undefined,
  listener: SortedRowIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useSortedRowIdsListenerCore, [
    tableId,
    cellId,
    descending,
    offset,
    limit,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasRowListener: typeof useHasRowListenerDecl = (
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: HasRowListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasRowListenerCore, [
    tableId,
    rowId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useRowListener: typeof useRowListenerDecl = (
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: RowListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useRowListenerCore, [
    tableId,
    rowId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useCellIdsListener: typeof useCellIdsListenerDecl = (
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: CellIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useCellIdsListenerCore, [
    tableId,
    rowId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasCellListener: typeof useHasCellListenerDecl = (
  tableId: TableId | null,
  rowId: IdOrNull,
  cellId: TodosCellId | null,
  listener: HasCellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasCellListenerCore, [
    tableId,
    rowId,
    cellId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useCellListener: typeof useCellListenerDecl = (
  tableId: TableId | null,
  rowId: IdOrNull,
  cellId: TodosCellId | null,
  listener: CellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useCellListenerCore, [
    tableId,
    rowId,
    cellId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasValues: typeof useHasValuesDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasValuesCore, []);

export const useValues: typeof useValuesDecl = (
  brainOrBrainId?: BrainOrBrainId,
): Values => useHook(brainOrBrainId, useValuesCore, []);

export const useValueIds: typeof useValueIdsDecl = (
  brainOrBrainId?: BrainOrBrainId,
): ValueId[] => useHook(brainOrBrainId, useValueIdsCore, []);

export const useSetValuesCallback: typeof useSetValuesCallbackDecl = <
  Parameter,
>(
  getValues: (parameter: Parameter, store: Store) => ValuesWhenSet,
  getValuesDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, values: ValuesWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetValuesCallbackCore,
    [getValues, getValuesDeps],
    [then, thenDeps],
  );

export const useSetPartialValuesCallback: typeof useSetPartialValuesCallbackDecl =
  <Parameter,>(
    getPartialValues: (parameter: Parameter, store: Store) => ValuesWhenSet,
    getPartialValuesDeps?: React.DependencyList,
    brainOrBrainId?: BrainOrBrainId,
    then?: (store: Store, partialValues: ValuesWhenSet) => void,
    thenDeps?: React.DependencyList,
  ): ParameterizedCallback<Parameter> =>
    useHook(
      brainOrBrainId,
      useSetPartialValuesCallbackCore,
      [getPartialValues, getPartialValuesDeps],
      [then, thenDeps],
    );

export const useDelValuesCallback: typeof useDelValuesCallbackDecl = (
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(brainOrBrainId, useDelValuesCallbackCore, [], [then, thenDeps]);

export const ValuesView: typeof ValuesViewDecl = ({
  brain,
  valueComponents,
  getValueComponentProps,
  separator,
  debugIds,
}: ValuesProps): any =>
  wrap(
    useValueIds(brain).map((valueId) => {
      const Value =
        valueComponents?.[valueId] ?? getDefaultValueComponent(valueId);
      return (
        <Value
          {...getProps(getValueComponentProps, valueId)}
          key={valueId}
          brain={brain}
          debugIds={debugIds}
        />
      );
    }),
    separator,
  );

export const useHasModeValue: typeof useHasModeValueDecl = (
  brainOrBrainId?: BrainOrBrainId,
): boolean => useHook(brainOrBrainId, useHasValueCore, [MODE]);

export const useModeValue: typeof useModeValueDecl = (
  brainOrBrainId?: BrainOrBrainId,
): string => useHook(brainOrBrainId, useValueCore, [MODE]);

export const useSetModeValueCallback: typeof useSetModeValueCallbackDecl = <
  Parameter,
>(
  getValue: (parameter: Parameter, store: Store) => string | MapString,
  getValueDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, value: string | MapString) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter> =>
  useHook(
    brainOrBrainId,
    useSetValueCallbackCore,
    [MODE, getValue, getValueDeps],
    [then, thenDeps],
  );

export const useDelModeValueCallback: typeof useDelModeValueCallbackDecl = (
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback =>
  useHook(brainOrBrainId, useDelValueCallbackCore, [MODE], [then, thenDeps]);

export const ModeValueView: typeof ModeValueViewDecl = ({
  brain,
  debugIds,
}: ValueProps<'mode'>): any =>
  wrap('' + useModeValue(brain) ?? '', undefined, debugIds, MODE);

export const useHasValuesListener: typeof useHasValuesListenerDecl = (
  listener: HasValuesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasValuesListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useValuesListener: typeof useValuesListenerDecl = (
  listener: ValuesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useValuesListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useValueIdsListener: typeof useValueIdsListenerDecl = (
  listener: ValueIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useValueIdsListenerCore, [
    listener,
    listenerDeps,
    mutator,
  ]);

export const useHasValueListener: typeof useHasValueListenerDecl = (
  valueId: ValueId | null,
  listener: HasValueListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useHasValueListenerCore, [
    valueId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const useValueListener: typeof useValueListenerDecl = (
  valueId: ValueId | null,
  listener: ValueListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void =>
  useHook(brainOrBrainId, useValueListenerCore, [
    valueId,
    listener,
    listenerDeps,
    mutator,
  ]);

export const Provider: typeof ProviderDecl = ({
  brain,
  brainById,
  children,
}: ProviderProps & {children: React.ReactNode}): any => {
  const contextValue = useContext(Context);
  return (
    <Context.Provider
      value={useMemo(
        () => [brain ?? contextValue[0], {...contextValue[1], ...brainById}],
        [brain, brainById, contextValue],
      )}
    >
      {children}
    </Context.Provider>
  );
};
