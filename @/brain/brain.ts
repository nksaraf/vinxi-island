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
  InvalidCellListener,
  InvalidValueListener,
  MapBoolean,
  MapString,
  RowCountListener,
  RowIdsListener,
  RowListener,
  SortedRowIdsListener,
  TableCallback,
  TableCellIdsListener,
  TableId,
  TableIdsListener,
  TableListener,
  Tables,
  TablesListener,
  TablesWhenSet,
  TodosCellCallback,
  TodosCellId,
  TodosRow,
  TodosRowCallback,
  TodosRowWhenSet,
  TodosTable,
  TodosTableCellCallback,
  TodosTableWhenSet,
  TransactionListener,
  ValueCallback,
  ValueId,
  ValueIdsListener,
  ValueListener,
  Values,
  ValuesListener,
  ValuesWhenSet,
  createBrain as createBrainDecl,
} from './brain.d';
import {
  DoRollback,
  Id,
  IdOrNull,
  Ids,
  Json,
  Store,
  TransactionChanges,
  createStore,
} from 'tinybase';

export const createBrain: typeof createBrainDecl = () => {
  const TODOS = 'todos';

  const ID = 'id';

  const TEXT = 'text';

  const DONE = 'done';

  const TYPE = 'type';

  const STRING = 'string';

  const BOOLEAN = 'boolean';

  const MODE = 'mode';

  const DEFAULT = 'default';

  const IDLE = 'idle';

  const store = createStore()
    .setTablesSchema({
      [TODOS]: {
        [ID]: {[TYPE]: STRING},
        [TEXT]: {[TYPE]: STRING},
        [DONE]: {[TYPE]: BOOLEAN},
      },
    })
    .setValuesSchema({
      [MODE]: {[TYPE]: STRING, [DEFAULT]: IDLE},
    });

  const fluent = (actions: () => Store) => {
    actions();
    return brain;
  };

  const proxy =
    (listener: any) =>
    (_: Store, ...params: any[]) =>
      listener(brain, ...params);

  const brain = {
    getTables: (): Tables => store.getTables() as Tables,

    hasTables: (): boolean => store.hasTables(),

    setTables: (tables: TablesWhenSet): Brain =>
      fluent(() => store.setTables(tables)),

    delTables: (): Brain => fluent(() => store.delTables()),

    getTableIds: (): TableId[] => store.getTableIds() as TableId[],

    forEachTable: (tableCallback: TableCallback): void =>
      store.forEachTable(tableCallback as any),

    getTodosTable: (): TodosTable => store.getTable(TODOS) as TodosTable,

    hasTodosTable: (): boolean => store.hasTable(TODOS),

    setTodosTable: (table: TodosTableWhenSet): Brain =>
      fluent(() => store.setTable(TODOS, table)),

    delTodosTable: (): Brain => fluent(() => store.delTable(TODOS)),

    getTodosTableCellIds: (): Ids => store.getTableCellIds(TODOS) as Ids,

    forEachTodosTableCell: (tableCellCallback: TodosTableCellCallback): void =>
      store.forEachTableCell(TODOS, tableCellCallback as any),

    getTodosRowCount: (): number => store.getRowCount(TODOS) as number,

    getTodosRowIds: (): Ids => store.getRowIds(TODOS) as Ids,

    getTodosSortedRowIds: (
      cellId?: TodosCellId,
      descending?: boolean,
      offset?: number,
      limit?: number,
    ): Ids =>
      store.getSortedRowIds(TODOS, cellId, descending, offset, limit) as Ids,

    forEachTodosRow: (rowCallback: TodosRowCallback): void =>
      store.forEachRow(TODOS, rowCallback as any),

    getTodosRow: (rowId: Id): TodosRow =>
      store.getRow(TODOS, rowId) as TodosRow,

    hasTodosRow: (rowId: Id): boolean => store.hasRow(TODOS, rowId),

    setTodosRow: (rowId: Id, row: TodosRowWhenSet): Brain =>
      fluent(() => store.setRow(TODOS, rowId, row)),

    delTodosRow: (rowId: Id): Brain => fluent(() => store.delRow(TODOS, rowId)),

    setTodosPartialRow: (rowId: Id, partialRow: TodosRowWhenSet): Brain =>
      fluent(() => store.setPartialRow(TODOS, rowId, partialRow)),

    addTodosRow: (row: TodosRowWhenSet, reuseIds?: boolean): Id | undefined =>
      store.addRow(TODOS, row, reuseIds),

    getTodosCellIds: (rowId: Id): TodosCellId[] =>
      store.getCellIds(TODOS, rowId) as TodosCellId[],

    forEachTodosCell: (rowId: Id, cellCallback: TodosCellCallback): void =>
      store.forEachCell(TODOS, rowId, cellCallback as any),

    getTodosIdCell: (rowId: Id): string | undefined =>
      store.getCell(TODOS, rowId, ID) as string | undefined,

    hasTodosIdCell: (rowId: Id): boolean => store.hasCell(TODOS, rowId, ID),

    setTodosIdCell: (rowId: Id, cell: string | MapString): Brain =>
      fluent(() => store.setCell(TODOS, rowId, ID, cell as any)),

    delTodosIdCell: (rowId: Id): Brain =>
      fluent(() => store.delCell(TODOS, rowId, ID)),

    hasTodosIdTableCell: (): boolean => store.hasTableCell(TODOS, ID),

    getTodosTextCell: (rowId: Id): string | undefined =>
      store.getCell(TODOS, rowId, TEXT) as string | undefined,

    hasTodosTextCell: (rowId: Id): boolean => store.hasCell(TODOS, rowId, TEXT),

    setTodosTextCell: (rowId: Id, cell: string | MapString): Brain =>
      fluent(() => store.setCell(TODOS, rowId, TEXT, cell as any)),

    delTodosTextCell: (rowId: Id): Brain =>
      fluent(() => store.delCell(TODOS, rowId, TEXT)),

    hasTodosTextTableCell: (): boolean => store.hasTableCell(TODOS, TEXT),

    getTodosDoneCell: (rowId: Id): boolean | undefined =>
      store.getCell(TODOS, rowId, DONE) as boolean | undefined,

    hasTodosDoneCell: (rowId: Id): boolean => store.hasCell(TODOS, rowId, DONE),

    setTodosDoneCell: (rowId: Id, cell: boolean | MapBoolean): Brain =>
      fluent(() => store.setCell(TODOS, rowId, DONE, cell as any)),

    delTodosDoneCell: (rowId: Id): Brain =>
      fluent(() => store.delCell(TODOS, rowId, DONE)),

    hasTodosDoneTableCell: (): boolean => store.hasTableCell(TODOS, DONE),

    getTablesJson: (): Json => store.getTablesJson() as Json,

    setTablesJson: (tablesJson: Json): Brain =>
      fluent(() => store.setTablesJson(tablesJson)),

    addHasTablesListener: (
      listener: HasTablesListener,
      mutator?: boolean,
    ): Id => store.addHasTablesListener(proxy(listener), mutator),

    addTablesListener: (listener: TablesListener, mutator?: boolean): Id =>
      store.addTablesListener(proxy(listener), mutator),

    addTableIdsListener: (listener: TableIdsListener, mutator?: boolean): Id =>
      store.addTableIdsListener(proxy(listener), mutator),

    addHasTableListener: (
      tableId: TableId | null,
      listener: HasTableListener,
      mutator?: boolean,
    ): Id => store.addHasTableListener(tableId, proxy(listener), mutator),

    addTableListener: (
      tableId: TableId | null,
      listener: TableListener,
      mutator?: boolean,
    ): Id => store.addTableListener(tableId, proxy(listener), mutator),

    addTableCellIdsListener: (
      tableId: TableId | null,
      listener: TableCellIdsListener,
      mutator?: boolean,
    ): Id => store.addTableCellIdsListener(tableId, proxy(listener), mutator),

    addHasTableCellListener: (
      tableId: TableId | null,
      cellId: TodosCellId | null,
      listener: HasTableCellListener,
      mutator?: boolean,
    ): Id =>
      store.addHasTableCellListener(tableId, cellId, proxy(listener), mutator),

    addRowCountListener: (
      tableId: TableId | null,
      listener: RowCountListener,
      mutator?: boolean,
    ): Id => store.addRowCountListener(tableId, proxy(listener), mutator),

    addRowIdsListener: (
      tableId: TableId | null,
      listener: RowIdsListener,
      mutator?: boolean,
    ): Id => store.addRowIdsListener(tableId, proxy(listener), mutator),

    addSortedRowIdsListener: <TId extends TableId>(
      tableId: TId,
      cellId: CellId<TId> | undefined,
      descending: boolean,
      offset: number,
      limit: number | undefined,
      listener: SortedRowIdsListener,
      mutator?: boolean,
    ): Id =>
      store.addSortedRowIdsListener(
        tableId,
        cellId,
        descending,
        offset,
        limit,
        proxy(listener),
        mutator,
      ),

    addHasRowListener: (
      tableId: TableId | null,
      rowId: IdOrNull,
      listener: HasRowListener,
      mutator?: boolean,
    ): Id => store.addHasRowListener(tableId, rowId, proxy(listener), mutator),

    addRowListener: (
      tableId: TableId | null,
      rowId: IdOrNull,
      listener: RowListener,
      mutator?: boolean,
    ): Id => store.addRowListener(tableId, rowId, proxy(listener), mutator),

    addCellIdsListener: (
      tableId: TableId | null,
      rowId: IdOrNull,
      listener: CellIdsListener,
      mutator?: boolean,
    ): Id => store.addCellIdsListener(tableId, rowId, proxy(listener), mutator),

    addHasCellListener: (
      tableId: TableId | null,
      rowId: IdOrNull,
      cellId: TodosCellId | null,
      listener: HasCellListener,
      mutator?: boolean,
    ): Id =>
      store.addHasCellListener(
        tableId,
        rowId,
        cellId,
        proxy(listener),
        mutator,
      ),

    addCellListener: (
      tableId: TableId | null,
      rowId: IdOrNull,
      cellId: TodosCellId | null,
      listener: CellListener,
      mutator?: boolean,
    ): Id =>
      store.addCellListener(tableId, rowId, cellId, proxy(listener), mutator),

    addInvalidCellListener: (
      tableId: IdOrNull,
      rowId: IdOrNull,
      cellId: IdOrNull,
      listener: InvalidCellListener,
      mutator?: boolean,
    ): Id =>
      store.addInvalidCellListener(
        tableId,
        rowId,
        cellId,
        proxy(listener),
        mutator,
      ),

    getValues: (): Values => store.getValues() as Values,

    hasValues: (): boolean => store.hasValues(),

    setValues: (values: ValuesWhenSet): Brain =>
      fluent(() => store.setValues(values)),

    delValues: (): Brain => fluent(() => store.delValues()),

    setPartialValues: (partialValues: ValuesWhenSet): Brain =>
      fluent(() => store.setPartialValues(partialValues)),

    getValueIds: (): ValueId[] => store.getValueIds() as ValueId[],

    forEachValue: (valueCallback: ValueCallback): void =>
      store.forEachValue(valueCallback as any),

    getModeValue: (): string => store.getValue(MODE) as string,

    hasModeValue: (): boolean => store.hasValue(MODE),

    setModeValue: (value: string | MapString): Brain =>
      fluent(() => store.setValue(MODE, value as any)),

    delModeValue: (): Brain => fluent(() => store.delValue(MODE)),

    getValuesJson: (): Json => store.getValuesJson() as Json,

    setValuesJson: (valuesJson: Json): Brain =>
      fluent(() => store.setValuesJson(valuesJson)),

    addHasValuesListener: (
      listener: HasValuesListener,
      mutator?: boolean,
    ): Id => store.addHasValuesListener(proxy(listener), mutator),

    addValuesListener: (listener: ValuesListener, mutator?: boolean): Id =>
      store.addValuesListener(proxy(listener), mutator),

    addValueIdsListener: (listener: ValueIdsListener, mutator?: boolean): Id =>
      store.addValueIdsListener(proxy(listener), mutator),

    addHasValueListener: (
      valueId: ValueId | null,
      listener: HasValueListener,
      mutator?: boolean,
    ): Id => store.addHasValueListener(valueId, proxy(listener), mutator),

    addValueListener: (
      valueId: ValueId | null,
      listener: ValueListener,
      mutator?: boolean,
    ): Id => store.addValueListener(valueId, proxy(listener), mutator),

    addInvalidValueListener: (
      valueId: IdOrNull,
      listener: InvalidValueListener,
      mutator?: boolean,
    ): Id => store.addInvalidValueListener(valueId, proxy(listener), mutator),

    getContent: (): [Tables, Values] => store.getContent() as [Tables, Values],

    setContent: ([tables, values]: [Tables, Values]): Brain =>
      fluent(() => store.setContent([tables, values])),

    setTransactionChanges: (transactionChanges: TransactionChanges): Brain =>
      fluent(() => store.setTransactionChanges(transactionChanges)),

    getJson: (): Json => store.getJson() as Json,

    setJson: (tablesAndValuesJson: Json): Brain =>
      fluent(() => store.setJson(tablesAndValuesJson)),

    transaction: <Return>(
      actions: () => Return,
      doRollback?: DoRollback,
    ): Return => store.transaction(actions, doRollback),

    startTransaction: (): Brain => fluent(() => store.startTransaction()),

    finishTransaction: (doRollback?: DoRollback): Brain =>
      fluent(() => store.finishTransaction(doRollback)),

    addStartTransactionListener: (listener: TransactionListener): Id =>
      store.addStartTransactionListener(proxy(listener)),

    addWillFinishTransactionListener: (listener: TransactionListener): Id =>
      store.addWillFinishTransactionListener(proxy(listener)),

    addDidFinishTransactionListener: (listener: TransactionListener): Id =>
      store.addDidFinishTransactionListener(proxy(listener)),

    callListener: (listenerId: Id): Brain =>
      fluent(() => store.callListener(listenerId)),

    delListener: (listenerId: Id): Brain =>
      fluent(() => store.delListener(listenerId)),

    getStore: (): Store => store,
  };

  return Object.freeze(brain);
};
