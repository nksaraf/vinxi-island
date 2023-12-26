import {
  CellChange,
  DoRollback,
  GetTransactionChanges,
  GetTransactionLog,
  Id,
  IdOrNull,
  Ids,
  Json,
  Store,
  TransactionChanges,
  ValueChange,
} from 'tinybase';

/**
 * Represents the tabular content of the Store.
 */
export type Tables = {
  todos?: {[rowId: Id]: {id?: string; text?: string; done?: boolean}};
};

/**
 * Represents the tabular content of the Store when setting it.
 */
export type TablesWhenSet = {
  todos?: {[rowId: Id]: {id?: string; text?: string; done?: boolean}};
};

/**
 * A Table Id in the Store.
 */
export type TableId = keyof Tables;

/**
 * A Table in the Store.
 */
export type Table<TId extends TableId> = NonNullable<Tables[TId]>;

/**
 * A Table in the Store when setting it.
 */
export type TableWhenSet<TId extends TableId> = NonNullable<TablesWhenSet[TId]>;

/**
 * A Row in a Table.
 */
export type Row<TId extends TableId> = Table<TId>[Id];

/**
 * A Row in a Table when setting it.
 */
export type RowWhenSet<TId extends TableId> = TableWhenSet<TId>[Id];

/**
 * A Cell Id in a Row.
 */
export type CellId<TId extends TableId> = Extract<keyof Row<TId>, Id>;

/**
 * A Cell in a Row.
 */
export type Cell<TId extends TableId, CId extends CellId<TId>> = NonNullable<
  Tables[TId]
>[Id][CId];

/**
 * Cell Ids and types in a Row.
 */
type CellIdCellArray<
  TId extends TableId,
  CId = CellId<TId>,
> = CId extends CellId<TId> ? [cellId: CId, cell: Cell<TId, CId>] : never;

/**
 * A function that takes a Cell Id, and Cell.
 */
export type CellCallback<TId extends TableId> = (
  ...[cellId, cell]: CellIdCellArray<TId>
) => void;

/**
 * A function that takes a Row Id, and a Cell iterator.
 */
export type RowCallback<TId extends TableId> = (
  rowId: Id,
  forEachCell: (cellCallback: CellCallback<TId>) => void,
) => void;

/**
 * A function that takes a Cell Id, and count of how many times it appears.
 */
export type TableCellCallback<TId extends TableId> = (
  cellId: CellId<TId>,
  count: number,
) => void;

/**
 * Table Ids and callback types.
 */
type TableIdForEachRowArray<TId = TableId> = TId extends TableId
  ? [tableId: TId, forEachRow: (rowCallback: RowCallback<TId>) => void]
  : never;

/**
 * A function that takes a Table Id, and a Row iterator.
 */
export type TableCallback = (
  ...[tableId, forEachRow]: TableIdForEachRowArray
) => void;

/**
 * Ids for GetCellChange.
 */
type TableIdRowIdCellIdArray<TId = TableId> = TId extends TableId
  ? [tableId: TId, rowId: Id, cellId: CellId<TId>]
  : never;

/**
 * A function for returning information about any Cell's changes during a
 * transaction.
 */
export type GetCellChange = (
  ...[tableId, rowId, cellId]: TableIdRowIdCellIdArray
) => CellChange;

/**
 * A function for listening to changes to the existence of Tables in the Store.
 */
export type HasTablesListener = (brain: Brain, hasTables: boolean) => void;

/**
 * A function for listening to changes to Tables in the Store.
 */
export type TablesListener = (
  brain: Brain,
  getCellChange: GetCellChange | undefined,
) => void;

/**
 * A function for listening to changes to the Table Ids in the Store.
 */
export type TableIdsListener = (brain: Brain) => void;

/**
 * A function for listening to changes to the existence of a Table in the Store.
 */
export type HasTableListener = (
  brain: Brain,
  tableId: TableId,
  hasTable: boolean,
) => void;

/**
 * A function for listening to changes to a Table in the Store.
 */
export type TableListener = (
  brain: Brain,
  tableId: TableId,
  getCellChange: GetCellChange | undefined,
) => void;

/**
 * A function for listening to changes to the Cell Ids anywhere in a Table.
 */
export type TableCellIdsListener = (brain: Brain, tableId: TableId) => void;

/**
 * Cell args for HasTableCellListener.
 */
type HasTableCellListenerArgsArrayInner<
  TId extends TableId,
  CId = CellId<TId>,
> = CId extends CellId<TId>
  ? [brain: Brain, tableId: TId, cellId: CId, hasTableCell: boolean]
  : never;

/**
 * Table args for HasTableCellListener.
 */
type HasTableCellListenerArgsArrayOuter<TId = TableId> = TId extends TableId
  ? HasTableCellListenerArgsArrayInner<TId>
  : never;

/**
 * A function for listening to changes to the existence of a Cell anywhere in a
 * Table.
 */
export type HasTableCellListener = (
  ...[brain, tableId, cellId, hasTableCell]: HasTableCellListenerArgsArrayOuter
) => void;

/**
 * A function for listening to changes to the number of Rows in a Table.
 */
export type RowCountListener = (brain: Brain, tableId: TableId) => void;

/**
 * A function for listening to changes to the Row Ids in a Table.
 */
export type RowIdsListener = (brain: Brain, tableId: TableId) => void;

/**
 * A function for listening to changes to the sorted Row Ids in a Table.
 */
export type SortedRowIdsListener = (
  brain: Brain,
  tableId: TableId,
  cellId: Id | undefined,
  descending: boolean,
  offset: number,
  limit: number | undefined,
  sortedRowIds: Ids,
) => void;

/**
 * A function for listening to changes to the existence of a Row in a Table.
 */
export type HasRowListener = (
  brain: Brain,
  tableId: TableId,
  rowId: Id,
  hasRow: boolean,
) => void;

/**
 * A function for listening to changes to a Row in a Table.
 */
export type RowListener = (
  brain: Brain,
  tableId: TableId,
  rowId: Id,
  getCellChange: GetCellChange | undefined,
) => void;

/**
 * A function for listening to changes to the Cell Ids in a Row.
 */
export type CellIdsListener = (
  brain: Brain,
  tableId: TableId,
  rowId: Id,
) => void;

/**
 * Cell args for HasCellListener.
 */
type HasCellListenerArgsArrayInner<
  TId extends TableId,
  CId = CellId<TId>,
> = CId extends CellId<TId>
  ? [brain: Brain, tableId: TId, rowId: Id, cellId: CId, hasCell: boolean]
  : never;

/**
 * Table args for HasCellListener.
 */
type HasCellListenerArgsArrayOuter<TId = TableId> = TId extends TableId
  ? HasCellListenerArgsArrayInner<TId>
  : never;

/**
 * A function for listening to changes to the existence of a Cell in a Row.
 */
export type HasCellListener = (
  ...[brain, tableId, rowId, cellId, hasCell]: HasCellListenerArgsArrayOuter
) => void;

/**
 * Cell args for CellListener.
 */
type CellListenerArgsArrayInner<
  TId extends TableId,
  CId = CellId<TId>,
> = CId extends CellId<TId>
  ? [
      brain: Brain,
      tableId: TId,
      rowId: Id,
      cellId: CId,
      newCell: Cell<TId, CId> | undefined,
      oldCell: Cell<TId, CId> | undefined,
      getCellChange: GetCellChange | undefined,
    ]
  : never;

/**
 * Table args for CellListener.
 */
type CellListenerArgsArrayOuter<TId = TableId> = TId extends TableId
  ? CellListenerArgsArrayInner<TId>
  : never;

/**
 * A function for listening to changes to a Cell in a Row.
 */
export type CellListener = (
  ...[
    brain,
    tableId,
    rowId,
    cellId,
    newCell,
    oldCell,
    getCellChange,
  ]: CellListenerArgsArrayOuter
) => void;

/**
 * A function for listening to changes to invalid Cell changes in the Store.
 */
export type InvalidCellListener = (
  brain: Brain,
  tableId: Id,
  rowId: Id,
  cellId: Id,
  invalidCells: any[],
) => void;

/**
 * Represents the 'todos' Table.
 */
export type TodosTable = Table<'todos'>;

/**
 * Represents the 'todos' Table when setting it.
 */
export type TodosTableWhenSet = TableWhenSet<'todos'>;

/**
 * Represents a Row when getting the content of the 'todos' Table.
 */
export type TodosRow = Row<'todos'>;

/**
 * Represents a Row when setting the content of the 'todos' Table.
 */
export type TodosRowWhenSet = RowWhenSet<'todos'>;

/**
 * A Cell Id for the 'todos' Table.
 */
export type TodosCellId = CellId<'todos'>;

/**
 * A function that takes a Cell Id and value from a Row in the 'todos' Table.
 */
export type TodosCellCallback = CellCallback<'todos'>;

/**
 * A function that takes a Row Id from the 'todos' Table, and a Cell iterator.
 */
export type TodosRowCallback = RowCallback<'todos'>;

/**
 * A function that takes a Cell Id from anywhere in the 'todos' Table, and a
 * count of how many times it appears.
 */
export type TodosTableCellCallback = TableCellCallback<'todos'>;

/**
 * Represents the keyed value content of the Store.
 */
export type Values = {mode: string};

/**
 * Represents the keyed value content of the Store when setting it.
 */
export type ValuesWhenSet = {mode?: string};

/**
 * A Value Id in the Store.
 */
export type ValueId = keyof Values;

/**
 * A Value Id in the Store.
 */
export type Value<VId extends ValueId> = NonNullable<Values[VId]>;

/**
 * Value Ids and types in the Store.
 */
type ValueIdValueArray<VId = ValueId> = VId extends ValueId
  ? [valueId: VId, value: Value<VId>]
  : never;

/**
 * A function that takes a Value Id, and Value.
 */
export type ValueCallback = (...[valueId, value]: ValueIdValueArray) => void;

/**
 * A function for returning information about any Value's changes during a
 * transaction.
 */
export type GetValueChange = (valueId: ValueId) => ValueChange;

/**
 * A function for listening to changes to the existence of Values in the Store.
 */
export type HasValuesListener = (brain: Brain, hasValues: boolean) => void;

/**
 * A function for listening to changes to Values in the Store.
 */
export type ValuesListener = (
  brain: Brain,
  getValueChange: GetValueChange | undefined,
) => void;

/**
 * A function for listening to changes to the Value Ids in the Store.
 */
export type ValueIdsListener = (brain: Brain) => void;

/**
 * A function for listening to changes to the existence of a Value in the Store.
 */
export type HasValueListener = (
  brain: Brain,
  valueId: ValueId,
  hasValue: boolean,
) => void;

/**
 * Value args for ValueListener.
 */
type ValueListenerArgsArray<VId = ValueId> = VId extends ValueId
  ? [
      brain: Brain,
      valueId: VId,
      newValue: Value<VId> | undefined,
      oldValue: Value<VId> | undefined,
      getValueChange: GetValueChange | undefined,
    ]
  : never;

/**
 * A function for listening to changes to a Value in the Store.
 */
export type ValueListener = (
  ...[
    brain,
    valueId,
    newValue,
    oldValue,
    getValueChange,
  ]: ValueListenerArgsArray
) => void;

/**
 * A function for listening to changes to invalid Value changes in the Store.
 */
export type InvalidValueListener = (
  brain: Brain,
  valueId: Id,
  invalidValues: any[],
) => void;

/**
 * Takes a string Cell value and returns another.
 */
export type MapString = (cell: string | undefined) => string;

/**
 * Takes a boolean Cell value and returns another.
 */
export type MapBoolean = (cell: boolean | undefined) => boolean;

/**
 * A function for listening to the completion of a transaction.
 */
export type TransactionListener = (
  brain: Brain,
  getTransactionChanges: GetTransactionChanges,
  getTransactionLog: GetTransactionLog,
) => void;

export interface Brain {
  /**
   * Gets the tabular content of the Store.
   */
  getTables(): Tables;

  /**
   * Checks existence of the tabular content of the Store.
   */
  hasTables(): boolean;

  /**
   * Sets the tabular content of the Store.
   */
  setTables(tables: TablesWhenSet): Brain;

  /**
   * Deletes the tabular content of the Store.
   */
  delTables(): Brain;

  /**
   * Gets the Ids of the Tables in the Store.
   */
  getTableIds(): TableId[];

  /**
   * Calls a function for each Table in the Store.
   */
  forEachTable(tableCallback: TableCallback): void;

  /**
   * Gets the content of the 'todos' Table.
   */
  getTodosTable(): TodosTable;

  /**
   * Checks existence of the content of the 'todos' Table.
   */
  hasTodosTable(): boolean;

  /**
   * Sets the content of the 'todos' Table.
   */
  setTodosTable(table: TodosTableWhenSet): Brain;

  /**
   * Deletes the content of the 'todos' Table.
   */
  delTodosTable(): Brain;

  /**
   * Gets the Ids of the Cells in the whole of the 'todos' Table.
   */
  getTodosTableCellIds(): Ids;

  /**
   * Calls a function for each TableCell in the whole of the 'todos' Table.
   */
  forEachTodosTableCell(tableCellCallback: TodosTableCellCallback): void;

  /**
   * Gets the number of Rows in the the 'todos' Table.
   */
  getTodosRowCount(): number;

  /**
   * Gets the Ids of the Rows in the 'todos' Table.
   */
  getTodosRowIds(): Ids;

  /**
   * Gets sorted, paginated Ids of the Rows in the 'todos' Table.
   */
  getTodosSortedRowIds(
    cellId?: TodosCellId,
    descending?: boolean,
    offset?: number,
    limit?: number,
  ): Ids;

  /**
   * Calls a function for each Row in the 'todos' Table.
   */
  forEachTodosRow(rowCallback: TodosRowCallback): void;

  /**
   * Gets the content of the specified Row in the 'todos' Table.
   */
  getTodosRow(rowId: Id): TodosRow;

  /**
   * Checks existence of the content of the specified Row in the 'todos' Table.
   */
  hasTodosRow(rowId: Id): boolean;

  /**
   * Sets the content of the specified Row in the 'todos' Table.
   */
  setTodosRow(rowId: Id, row: TodosRowWhenSet): Brain;

  /**
   * Deletes the content of the specified Row in the 'todos' Table.
   */
  delTodosRow(rowId: Id): Brain;

  /**
   * Sets part of the content of the specified Row in the 'todos' Table.
   */
  setTodosPartialRow(rowId: Id, partialRow: TodosRowWhenSet): Brain;

  /**
   * Add a new Row to the 'todos' Table.
   */
  addTodosRow(row: TodosRowWhenSet, reuseIds?: boolean): Id | undefined;

  /**
   * Gets the Ids of the Cells in the specified Row in the 'todos' Table.
   */
  getTodosCellIds(rowId: Id): TodosCellId[];

  /**
   * Calls a function for each Cell in the specified Row in the 'todos' Table.
   */
  forEachTodosCell(rowId: Id, cellCallback: TodosCellCallback): void;

  /**
   * Gets the 'id' Cell for the specified Row in the 'todos' Table.
   */
  getTodosIdCell(rowId: Id): string | undefined;

  /**
   * Checks existence of the 'id' Cell for the specified Row in the 'todos'
   * Table.
   */
  hasTodosIdCell(rowId: Id): boolean;

  /**
   * Sets the 'id' Cell for the specified Row in the 'todos' Table.
   */
  setTodosIdCell(rowId: Id, cell: string | MapString): Brain;

  /**
   * Deletes the 'id' Cell for the specified Row in the 'todos' Table.
   */
  delTodosIdCell(rowId: Id): Brain;

  /**
   * Checks existence of the 'id' Cell anywhere in the 'todos' Table.
   */
  hasTodosIdTableCell(): boolean;

  /**
   * Gets the 'text' Cell for the specified Row in the 'todos' Table.
   */
  getTodosTextCell(rowId: Id): string | undefined;

  /**
   * Checks existence of the 'text' Cell for the specified Row in the 'todos'
   * Table.
   */
  hasTodosTextCell(rowId: Id): boolean;

  /**
   * Sets the 'text' Cell for the specified Row in the 'todos' Table.
   */
  setTodosTextCell(rowId: Id, cell: string | MapString): Brain;

  /**
   * Deletes the 'text' Cell for the specified Row in the 'todos' Table.
   */
  delTodosTextCell(rowId: Id): Brain;

  /**
   * Checks existence of the 'text' Cell anywhere in the 'todos' Table.
   */
  hasTodosTextTableCell(): boolean;

  /**
   * Gets the 'done' Cell for the specified Row in the 'todos' Table.
   */
  getTodosDoneCell(rowId: Id): boolean | undefined;

  /**
   * Checks existence of the 'done' Cell for the specified Row in the 'todos'
   * Table.
   */
  hasTodosDoneCell(rowId: Id): boolean;

  /**
   * Sets the 'done' Cell for the specified Row in the 'todos' Table.
   */
  setTodosDoneCell(rowId: Id, cell: boolean | MapBoolean): Brain;

  /**
   * Deletes the 'done' Cell for the specified Row in the 'todos' Table.
   */
  delTodosDoneCell(rowId: Id): Brain;

  /**
   * Checks existence of the 'done' Cell anywhere in the 'todos' Table.
   */
  hasTodosDoneTableCell(): boolean;

  /**
   * Gets a string serialization of the tabular content of the Store.
   */
  getTablesJson(): Json;

  /**
   * Sets a string serialization of the tabular content of the Store.
   */
  setTablesJson(tablesJson: Json): Brain;

  /**
   * Registers a listener that will be called whenever the existence of the
   * tabular content of the Store changes.
   */
  addHasTablesListener(listener: HasTablesListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the tabular content of
   * the Store changes.
   */
  addTablesListener(listener: TablesListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the Table Ids in the
   * Store change.
   */
  addTableIdsListener(listener: TableIdsListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the existence of a Table
   * in the Store changes.
   */
  addHasTableListener(
    tableId: TableId | null,
    listener: HasTableListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever a Table in the Store
   * changes.
   */
  addTableListener(
    tableId: TableId | null,
    listener: TableListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the Cell Ids anywhere in
   * a Table change.
   */
  addTableCellIdsListener(
    tableId: TableId | null,
    listener: TableCellIdsListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the existence of a Cell
   * anywhere in a Table changes.
   */
  addHasTableCellListener(
    tableId: TableId | null,
    cellId: TodosCellId | null,
    listener: HasTableCellListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the number of Rows in a
   * Table changes.
   */
  addRowCountListener(
    tableId: TableId | null,
    listener: RowCountListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the Row Ids in a Table
   * change.
   */
  addRowIdsListener(
    tableId: TableId | null,
    listener: RowIdsListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the sorted Row Ids in a
   * Table change.
   */
  addSortedRowIdsListener<TId extends TableId>(
    tableId: TId,
    cellId: CellId<TId> | undefined,
    descending: boolean,
    offset: number,
    limit: number | undefined,
    listener: SortedRowIdsListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the existence of a Row in
   * a Table changes.
   */
  addHasRowListener(
    tableId: TableId | null,
    rowId: IdOrNull,
    listener: HasRowListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever a Row in a Table changes.
   */
  addRowListener(
    tableId: TableId | null,
    rowId: IdOrNull,
    listener: RowListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the Cell Ids in a Row
   * change.
   */
  addCellIdsListener(
    tableId: TableId | null,
    rowId: IdOrNull,
    listener: CellIdsListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever the existence of a Cell
   * in a Row changes.
   */
  addHasCellListener(
    tableId: TableId | null,
    rowId: IdOrNull,
    cellId: TodosCellId | null,
    listener: HasCellListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever a Cell in a Row changes.
   */
  addCellListener(
    tableId: TableId | null,
    rowId: IdOrNull,
    cellId: TodosCellId | null,
    listener: CellListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever an invalid Cell change
   * was attempted.
   */
  addInvalidCellListener(
    tableId: IdOrNull,
    rowId: IdOrNull,
    cellId: IdOrNull,
    listener: InvalidCellListener,
    mutator?: boolean,
  ): Id;

  /**
   * Gets the keyed value content of the Store.
   */
  getValues(): Values;

  /**
   * Checks existence of the keyed value content of the Store.
   */
  hasValues(): boolean;

  /**
   * Sets the keyed value content of the Store.
   */
  setValues(values: ValuesWhenSet): Brain;

  /**
   * Deletes the keyed value content of the Store.
   */
  delValues(): Brain;

  /**
   * Sets part of the keyed value content of the Store.
   */
  setPartialValues(partialValues: ValuesWhenSet): Brain;

  /**
   * Gets the Ids of the Values in the Store.
   */
  getValueIds(): ValueId[];

  /**
   * Calls a function for each Value in the Store.
   */
  forEachValue(valueCallback: ValueCallback): void;

  /**
   * Gets the 'mode' Value.
   */
  getModeValue(): string;

  /**
   * Checks existence of the 'mode' Value.
   */
  hasModeValue(): boolean;

  /**
   * Sets the 'mode' Value.
   */
  setModeValue(value: string | MapString): Brain;

  /**
   * Deletes the 'mode' Value.
   */
  delModeValue(): Brain;

  /**
   * Gets a string serialization of the keyed value content of the Store.
   */
  getValuesJson(): Json;

  /**
   * Sets a string serialization of the keyed value content of the Store.
   */
  setValuesJson(valuesJson: Json): Brain;

  /**
   * Registers a listener that will be called whenever the existence of the
   * keyed value content of the Store changes.
   */
  addHasValuesListener(listener: HasValuesListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the keyed value content
   * of the Store changes.
   */
  addValuesListener(listener: ValuesListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the Value Ids in the
   * Store change.
   */
  addValueIdsListener(listener: ValueIdsListener, mutator?: boolean): Id;

  /**
   * Registers a listener that will be called whenever the existence of a Value
   * in the Store changes.
   */
  addHasValueListener(
    valueId: ValueId | null,
    listener: HasValueListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever a Value in the Store
   * changes.
   */
  addValueListener(
    valueId: ValueId | null,
    listener: ValueListener,
    mutator?: boolean,
  ): Id;

  /**
   * Registers a listener that will be called whenever an invalid Value change
   * was attempted.
   */
  addInvalidValueListener(
    valueId: IdOrNull,
    listener: InvalidValueListener,
    mutator?: boolean,
  ): Id;

  /**
   * Gets the content of the Store.
   */
  getContent(): [Tables, Values];

  /**
   * Sets the content of the Store.
   */
  setContent([tables, values]: [Tables, Values]): Brain;

  /**
   * Applies a set of TransactionChanges to the Store.
   */
  setTransactionChanges(transactionChanges: TransactionChanges): Brain;

  /**
   * Gets a string serialization of the content of the Store.
   */
  getJson(): Json;

  /**
   * Sets a string serialization of the content of the Store.
   */
  setJson(tablesAndValuesJson: Json): Brain;

  /**
   * Execute a transaction to make multiple mutations.
   */
  transaction<Return>(actions: () => Return, doRollback?: DoRollback): Return;

  /**
   * Explicitly starts a transaction.
   */
  startTransaction(): Brain;

  /**
   * Explicitly finishes a transaction.
   */
  finishTransaction(doRollback?: DoRollback): Brain;

  /**
   * Registers a listener that will be called just before the start of the
   * transaction.
   */
  addStartTransactionListener(listener: TransactionListener): Id;

  /**
   * Registers a listener that will be called just before the end of the
   * transaction.
   */
  addWillFinishTransactionListener(listener: TransactionListener): Id;

  /**
   * Registers a listener that will be called just after the end of the
   * transaction.
   */
  addDidFinishTransactionListener(listener: TransactionListener): Id;

  /**
   * Manually provoke a listener to be called.
   */
  callListener(listenerId: Id): Brain;

  /**
   * Remove a listener that was previously added to the Store.
   */
  delListener(listenerId: Id): Brain;

  /**
   * Gets the underlying Store object.
   */
  getStore(): Store;
}

/**
 * Creates a Brain object.
 */
export function createBrain(): Brain;
