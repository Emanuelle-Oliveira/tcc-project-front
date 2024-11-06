import React, {createContext, ReactNode, useContext, useState} from 'react';
import { Table } from '@/interfaces/Itable';

interface TableContextType {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }: TableProviderProps) => {
  const [tables, setTables] = useState<Table[]>([]);

  return (
    <TableContext.Provider value={{ tables, setTables }}>
      {children}
    </TableContext.Provider>
  );
};