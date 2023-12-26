import {
  Brain,
  CellId,
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
  Callback,
  Id,
  IdOrNull,
  Ids,
  ParameterizedCallback,
  Store,
} from 'tinybase';
import {ComponentReturnType, ExtraProps} from 'tinybase/ui-react';
import {ComponentType, ReactElement} from 'react';

/**
 * Used when you need to refer to a Brain in a React hook or component.
 */
export type BrainOrBrainId = Brain | Id;

/**
 * Used with the Provider component, so that a Brain can be passed into the
 * context of an application.
 */
export type ProviderProps = {
  readonly brain?: Brain;
  readonly brainById?: {[brainId: Id]: Brain};
};

/**
 * The props passed to a component that renders a Cell.
 */
export type CellProps<TId extends TableId, CId extends CellId<TId>> = {
  readonly tableId?: TId;
  readonly rowId: Id;
  readonly cellId?: CId;
  readonly brain?: Brain;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders a Row.
 */
export type RowProps<TId extends TableId> = {
  readonly tableId?: TId;
  readonly rowId: Id;
  readonly brain?: Brain;
  readonly cellComponents?: {
    readonly [CId in CellId<TId>]?: ComponentType<CellProps<TId, CId>>;
  };
  readonly getCellComponentProps?: (cellId: CellId<TId>) => ExtraProps;
  readonly customCellIds?: CellId<TId>[];
  readonly separator?: ReactElement | string;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders a Table.
 */
export type TableProps<TId extends TableId> = {
  readonly tableId?: TId;
  readonly brain?: Brain;
  readonly rowComponent?: ComponentType<RowProps<TId>>;
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  readonly customCellIds?: CellId<TId>[];
  readonly separator?: ReactElement | string;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders a sorted Table.
 */
export type SortedTableProps<TId extends TableId> = {
  readonly tableId?: TId;
  readonly cellId?: CellId<TId>;
  readonly descending?: boolean;
  readonly offset?: number;
  readonly limit?: number;
  readonly brain?: Brain;
  readonly rowComponent?: ComponentType<RowProps<TId>>;
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  readonly customCellIds?: CellId<TId>[];
  readonly separator?: ReactElement | string;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders the tabular content of the
 * Store.
 */
export type TablesProps = {
  readonly brain?: Brain;
  readonly tableComponents?: {
    readonly [TId in TableId]?: ComponentType<TableProps<TId>>;
  };
  readonly getTableComponentProps?: (tableId: TableId) => ExtraProps;
  readonly separator?: ReactElement | string;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders a Value.
 */
export type ValueProps<VId extends ValueId> = {
  readonly valueId?: VId;
  readonly brain?: Brain;
  readonly debugIds?: boolean;
};

/**
 * The props passed to a component that renders the keyed value content of the
 * Store.
 */
export type ValuesProps = {
  readonly brain?: Brain;
  readonly valueComponents?: {
    readonly [VId in ValueId]?: ComponentType<ValueProps<VId>>;
  };
  readonly getValueComponentProps?: (valueId: ValueId) => ExtraProps;
  readonly separator?: ReactElement | string;
  readonly debugIds?: boolean;
};

/**
 * Create a Brain within a React application with convenient memoization.
 */
export function useCreateBrain(
  create: () => Brain,
  createDeps?: React.DependencyList,
): Brain;

/**
 * Get a reference to a Brain from within a Provider component context.
 */
export function useBrain(id?: Id): Brain | undefined;

/**
 * Gets the existence of the tabular content of the Store, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useHasTables(brainOrBrainId?: BrainOrBrainId): boolean;

/**
 * Gets the tabular content of the Store, and registers a listener so that any
 * changes to that result will cause a re-render.
 */
export function useTables(brainOrBrainId?: BrainOrBrainId): Tables;

/**
 * Gets the Ids of the Tables in the Store, and registers a listener so that any
 * changes to that result will cause a re-render.
 */
export function useTableIds(brainOrBrainId?: BrainOrBrainId): TableId[];

/**
 * Gets a callback that can set the tabular content of the Store, based on a
 * parameter.
 */
export function useSetTablesCallback<Parameter>(
  getTables: (parameter: Parameter, store: Store) => TablesWhenSet,
  getTablesDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, tables: TablesWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the tabular content of the Store.
 */
export function useDelTablesCallback(
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the tabular content of the Store, and registers a listener so that
 * any changes to that result will cause a re-render.
 */
export function TablesView({
  brain,
  tableComponents,
  getTableComponentProps,
  separator,
  debugIds,
}: TablesProps): ComponentReturnType;

/**
 * Gets the existence of the content of the 'todos' Table, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useHasTodosTable(brainOrBrainId?: BrainOrBrainId): boolean;

/**
 * Gets the content of the 'todos' Table, and registers a listener so that any
 * changes to that result will cause a re-render.
 */
export function useTodosTable(brainOrBrainId?: BrainOrBrainId): TodosTable;

/**
 * Gets the Ids of the Cells in the whole of the 'todos' Table, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useTodosTableCellIds(brainOrBrainId?: BrainOrBrainId): Ids;

/**
 * Gets the number of Rows in the 'todos' Table, and registers a listener so
 * that any changes to that result will cause a re-render.
 */
export function useTodosRowCount(brainOrBrainId?: BrainOrBrainId): number;

/**
 * Gets the Ids of the Rows in the 'todos' Table, and registers a listener so
 * that any changes to that result will cause a re-render.
 */
export function useTodosRowIds(brainOrBrainId?: BrainOrBrainId): Ids;

/**
 * Gets sorted, paginated Ids of the Rows in the 'todos' Table, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useTodosSortedRowIds(
  cellId?: TodosCellId,
  descending?: boolean,
  offset?: number,
  limit?: number,
  brainOrBrainId?: BrainOrBrainId,
): Ids;

/**
 * Gets the existence of the content of the specified Row in the 'todos' Table,
 * and registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useHasTodosRow(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the content of the specified Row in the 'todos' Table, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useTodosRow(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): TodosRow;

/**
 * Gets the Ids of the Cells in the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useTodosCellIds(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): TodosCellId[];

/**
 * Gets a callback that can set the content of the 'todos' Table, based on a
 * parameter.
 */
export function useSetTodosTableCallback<Parameter>(
  getTable: (parameter: Parameter, store: Store) => TodosTableWhenSet,
  getTableDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, table: TodosTableWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the content of the 'todos' Table.
 */
export function useDelTodosTableCallback(
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Gets a callback that can set the content of the specified Row in the 'todos'
 * Table, based on a parameter.
 */
export function useSetTodosRowCallback<Parameter>(
  rowId: Id,
  getRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
  getRowDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, row: TodosRowWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can add the content of the specified Row in the 'todos'
 * Table, based on a parameter.
 */
export function useAddTodosRowCallback<Parameter>(
  getRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
  getRowDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (rowId: Id | undefined, store: Store, row: TodosRowWhenSet) => void,
  thenDeps?: React.DependencyList,
  reuseRowIds?: boolean,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can set part of the content of the specified Row in the
 * 'todos' Table, based on a parameter.
 */
export function useSetTodosPartialRowCallback<Parameter>(
  rowId: Id,
  getPartialRow: (parameter: Parameter, store: Store) => TodosRowWhenSet,
  getPartialRowDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, partialRow: TodosRowWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the content of the specified Row in the
 * 'todos' Table.
 */
export function useDelTodosRowCallback(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the content of the specified Row in the 'todos' Table, and registers
 * a listener so that any changes to that result will cause a re-render.
 */
export function TodosRowView({
  rowId,
  brain,
  cellComponents,
  getCellComponentProps,
  customCellIds,
  separator,
  debugIds,
}: RowProps<'todos'>): ComponentReturnType;

/**
 * Renders the content of the 'todos' Table, sorted, and registers a listener so
 * that any changes to that result will cause a re-render.
 */
export function TodosSortedTableView({
  cellId,
  descending,
  offset,
  limit,
  ...props
}: SortedTableProps<'todos'>): ComponentReturnType;

/**
 * Renders the content of the 'todos' Table, and registers a listener so that
 * any changes to that result will cause a re-render.
 */
export function TodosTableView(props: TableProps<'todos'>): ComponentReturnType;

/**
 * Gets the existence of the 'id' Cell anywhere in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useHasTodosIdTableCell(
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the existence of the 'id' Cell for the specified Row in the 'todos'
 * Table, and registers a listener so that any changes to that result will cause
 * a re-render.
 */
export function useHasTodosIdCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the 'id' Cell for the specified Row in the 'todos' Table, and registers
 * a listener so that any changes to that result will cause a re-render.
 */
export function useTodosIdCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): string | undefined;

/**
 * Gets a callback that can set the 'id' Cell for the specified Row in the
 * 'todos' Table, based on a parameter.
 */
export function useSetTodosIdCellCallback<Parameter>(
  rowId: Id,
  getCell: (parameter: Parameter, store: Store) => string | MapString,
  getCellDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, cell: string | MapString) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the 'id' Cell for the specified Row in the
 * 'todos' Table.
 */
export function useDelTodosIdCellCallback(
  rowId: Id,
  forceDel?: boolean,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the 'id' Cell for the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function TodosIdCellView({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'id'>): ComponentReturnType;

/**
 * Gets the existence of the 'text' Cell anywhere in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useHasTodosTextTableCell(
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the existence of the 'text' Cell for the specified Row in the 'todos'
 * Table, and registers a listener so that any changes to that result will cause
 * a re-render.
 */
export function useHasTodosTextCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the 'text' Cell for the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useTodosTextCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): string | undefined;

/**
 * Gets a callback that can set the 'text' Cell for the specified Row in the
 * 'todos' Table, based on a parameter.
 */
export function useSetTodosTextCellCallback<Parameter>(
  rowId: Id,
  getCell: (parameter: Parameter, store: Store) => string | MapString,
  getCellDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, cell: string | MapString) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the 'text' Cell for the specified Row in the
 * 'todos' Table.
 */
export function useDelTodosTextCellCallback(
  rowId: Id,
  forceDel?: boolean,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the 'text' Cell for the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function TodosTextCellView({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'text'>): ComponentReturnType;

/**
 * Gets the existence of the 'done' Cell anywhere in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useHasTodosDoneTableCell(
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the existence of the 'done' Cell for the specified Row in the 'todos'
 * Table, and registers a listener so that any changes to that result will cause
 * a re-render.
 */
export function useHasTodosDoneCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean;

/**
 * Gets the 'done' Cell for the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function useTodosDoneCell(
  rowId: Id,
  brainOrBrainId?: BrainOrBrainId,
): boolean | undefined;

/**
 * Gets a callback that can set the 'done' Cell for the specified Row in the
 * 'todos' Table, based on a parameter.
 */
export function useSetTodosDoneCellCallback<Parameter>(
  rowId: Id,
  getCell: (parameter: Parameter, store: Store) => boolean | MapBoolean,
  getCellDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, cell: boolean | MapBoolean) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the 'done' Cell for the specified Row in the
 * 'todos' Table.
 */
export function useDelTodosDoneCellCallback(
  rowId: Id,
  forceDel?: boolean,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the 'done' Cell for the specified Row in the 'todos' Table, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 */
export function TodosDoneCellView({
  rowId,
  brain,
  debugIds,
}: CellProps<'todos', 'done'>): ComponentReturnType;

/**
 * Registers a listener that will be called whenever the existence of the
 * tabular content of the Store changes.
 */
export function useHasTablesListener(
  listener: HasTablesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the tabular content of the
 * Store changes.
 */
export function useTablesListener(
  listener: TablesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the Table Ids in the Store
 * change.
 */
export function useTableIdsListener(
  listener: TableIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the existence of a Table in
 * the Store changes.
 */
export function useHasTableListener(
  tableId: TableId | null,
  listener: HasTableListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever a Table in the Store
 * changes.
 */
export function useTableListener(
  tableId: TableId | null,
  listener: TableListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the Cell Ids anywhere in a
 * Table change.
 */
export function useTableCellIdsListener(
  tableId: TableId | null,
  listener: TableCellIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the existence of a Cell
 * anywhere in a Table changes.
 */
export function useHasTableCellListener(
  tableId: TableId | null,
  cellId: TodosCellId | null,
  listener: HasTableCellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the number of Rows in a
 * Table changes.
 */
export function useRowCountListener(
  tableId: TableId | null,
  listener: RowCountListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the Row Ids in a Table
 * change.
 */
export function useRowIdsListener(
  tableId: TableId | null,
  listener: RowIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the sorted Row Ids in a
 * Table change.
 */
export function useSortedRowIdsListener(
  tableId: TableId | null,
  cellId: TodosCellId | undefined,
  descending: boolean,
  offset: number,
  limit: number | undefined,
  listener: SortedRowIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the existence of a Row in a
 * Table changes.
 */
export function useHasRowListener(
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: HasRowListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever a Row in a Table changes.
 */
export function useRowListener(
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: RowListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the Cell Ids in a Row
 * change.
 */
export function useCellIdsListener(
  tableId: TableId | null,
  rowId: IdOrNull,
  listener: CellIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the existence of a Cell in
 * a Row changes.
 */
export function useHasCellListener(
  tableId: TableId | null,
  rowId: IdOrNull,
  cellId: TodosCellId | null,
  listener: HasCellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever a Cell in a Row changes.
 */
export function useCellListener(
  tableId: TableId | null,
  rowId: IdOrNull,
  cellId: TodosCellId | null,
  listener: CellListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Gets the existence of the keyed value content of the Store, and registers a
 * listener so that any changes to that result will cause a re-render.
 */
export function useHasValues(brainOrBrainId?: BrainOrBrainId): boolean;

/**
 * Gets the keyed value content of the Store, and registers a listener so that
 * any changes to that result will cause a re-render.
 */
export function useValues(brainOrBrainId?: BrainOrBrainId): Values;

/**
 * Gets the Ids of the Values in the Store, and registers a listener so that any
 * changes to that result will cause a re-render.
 */
export function useValueIds(brainOrBrainId?: BrainOrBrainId): ValueId[];

/**
 * Gets a callback that can set the keyed value content of the Store, based on a
 * parameter.
 */
export function useSetValuesCallback<Parameter>(
  getValues: (parameter: Parameter, store: Store) => ValuesWhenSet,
  getValuesDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, values: ValuesWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can set part of the keyed value content of the Store,
 * based on a parameter.
 */
export function useSetPartialValuesCallback<Parameter>(
  getPartialValues: (parameter: Parameter, store: Store) => ValuesWhenSet,
  getPartialValuesDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, partialValues: ValuesWhenSet) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the keyed value content of the Store.
 */
export function useDelValuesCallback(
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the keyed value content of the Store, and registers a listener so
 * that any changes to that result will cause a re-render.
 */
export function ValuesView({
  brain,
  valueComponents,
  getValueComponentProps,
  separator,
  debugIds,
}: ValuesProps): ComponentReturnType;

/**
 * Gets the existence of the 'mode' Value, and registers a listener so that any
 * changes to that result will cause a re-render.
 */
export function useHasModeValue(brainOrBrainId?: BrainOrBrainId): boolean;

/**
 * Gets the 'mode' Value, and registers a listener so that any changes to that
 * result will cause a re-render.
 */
export function useModeValue(brainOrBrainId?: BrainOrBrainId): string;

/**
 * Gets a callback that can set the 'mode' Value, based on a parameter.
 */
export function useSetModeValueCallback<Parameter>(
  getValue: (parameter: Parameter, store: Store) => string | MapString,
  getValueDeps?: React.DependencyList,
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store, value: string | MapString) => void,
  thenDeps?: React.DependencyList,
): ParameterizedCallback<Parameter>;

/**
 * Gets a callback that can delete the 'mode' Value.
 */
export function useDelModeValueCallback(
  brainOrBrainId?: BrainOrBrainId,
  then?: (store: Store) => void,
  thenDeps?: React.DependencyList,
): Callback;

/**
 * Renders the 'mode' Value, and registers a listener so that any changes to
 * that result will cause a re-render.
 */
export function ModeValueView({
  brain,
  debugIds,
}: ValueProps<'mode'>): ComponentReturnType;

/**
 * Registers a listener that will be called whenever the existence of the keyed
 * value content of the Store changes.
 */
export function useHasValuesListener(
  listener: HasValuesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the keyed value content of
 * the Store changes.
 */
export function useValuesListener(
  listener: ValuesListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the Value Ids in the Store
 * change.
 */
export function useValueIdsListener(
  listener: ValueIdsListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever the existence of a Value in
 * the Store changes.
 */
export function useHasValueListener(
  valueId: ValueId | null,
  listener: HasValueListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Registers a listener that will be called whenever a Value in the Store
 * changes.
 */
export function useValueListener(
  valueId: ValueId | null,
  listener: ValueListener,
  listenerDeps?: React.DependencyList,
  mutator?: boolean,
  brainOrBrainId?: BrainOrBrainId,
): void;

/**
 * Wraps part of an application in a context that provides default objects to be
 * used by hooks and components within.
 */
export function Provider({
  brain,
  brainById,
  children,
}: ProviderProps & {children: React.ReactNode}): ComponentReturnType;
