import { ModelAttributeColumnOptions, TableName } from "sequelize"

export interface ModelDefaultKeysProps {
  [key: string]: ModelAttributeColumnOptions;
}

export interface DefaultColumnsProps {
  created_at: ModelAttributeColumnOptions;
  updated_at: ModelAttributeColumnOptions;
  deleted_at?: ModelAttributeColumnOptions;
  created_by?: ModelAttributeColumnOptions;
  updated_by?: ModelAttributeColumnOptions;
  deleted_by?: ModelAttributeColumnOptions;
}

export interface ModelDefaultProps {
  withUser: boolean;
  paranoid: boolean;
  isUser: boolean;
}

export interface ModelRelationshipProps {
  modelName: TableName;
  key: string;
  // = false
  allowNull?: boolean;
  // = false
  unique?: boolean;
  // = "CASCADE"
  onDelete?: string;
  // = "CASCADE"
  onUpdate?: string;
  defaultValue?: unknown;
}
