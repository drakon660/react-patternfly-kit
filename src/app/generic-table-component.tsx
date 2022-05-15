import React from "react";

interface TableProps<TItem> {
    items: TItem[];
    renderItem : (item: TItem) => React.ReactNode; 
    firstName:string;   
}

export const Table = <TItem,>(props:TableProps<TItem>)=>{
    return null;
}

export const Component = () => {
    return (
      
      <Table
        items={[{ id: "1", firstName:"john" }]}
        renderItem={(item) => {
          return null;
        }}
      ></Table>
    );
  };


