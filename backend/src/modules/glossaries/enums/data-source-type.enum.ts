import { registerEnumType } from '@nestjs/graphql';

export enum DataSourceType {
  BN = 'BN',
  BT = 'BT',
}

registerEnumType(DataSourceType, {
  name: 'DataSourceType',
  description: 'The supported data source types.',
  valuesMap: {
    BN: {
      description: 'Better Night',
    },
    BT: {
      description: 'Bright Tree',
    },
  },
});
