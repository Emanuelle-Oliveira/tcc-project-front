import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Query} from '@/interfaces/Iquery';

interface QueryContextType {
  queries: Query[];
  setQueries: React.Dispatch<React.SetStateAction<Query[]>>;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }: QueryProviderProps) => {
  const [queries, setQueries] = useState<Query[]>([]);

  return (
    <QueryContext.Provider value={{ queries, setQueries }}>
      {children}
    </QueryContext.Provider>
  );
};