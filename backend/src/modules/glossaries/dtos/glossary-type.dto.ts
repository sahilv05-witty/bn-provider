import { registerEnumType } from '@nestjs/graphql';

export enum GlossaryType {
  PATIENTSTATUS = 'PATIENTSTATUS',
  ENTRYPOINT = 'ENTRYPOINT',
  PATHWAY = 'PATHWAY',
}

registerEnumType(GlossaryType, {
  name: 'GlossaryType',
  description: 'The supported colors.',
  valuesMap: {
    PATIENTSTATUS: {
      description: 'Glossary types belongs to the PATIENT STATUS',
    },
    ENTRYPOINT: {
      description: 'Glossary types belongs to the ENTRY POINT',
    },
    PATHWAY: {
      description: 'Glossary types belongs to the PATHWAY.',
    },
  },
});
