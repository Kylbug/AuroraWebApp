export class TableDTO {
    id?: number;
    column: string;
    e3kDatatype: string;
    notNull: boolean;
    default: boolean;
    created: Date;
    updated: Date;
  
    constructor(
      id: number,
      column: string,
      e3kDatatype: string,
      notNull: boolean,
      defaultValue: boolean,
      created: Date,
      updated: Date
    ) 
    {
      this.id = id;
      this.column = column;
      this.e3kDatatype = e3kDatatype;
      this.notNull = notNull;
      this.default = defaultValue;
      this.created = created;
      this.updated = updated;
    }
  }
  