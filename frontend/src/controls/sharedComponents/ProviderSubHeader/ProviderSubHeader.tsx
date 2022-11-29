import { Breadcrumb, Item } from 'semantic-ui-react';
import { InputButton } from '../../form';
import './ProviderSubHeader.scss';

const sections = [
  { key: 'Administrators', content: 'Administrators', link: true },
  { key: 'Create New User', content: 'Create New User', link: true },
];

interface ProviderSubHeaderProps {
  ActionButton?: Boolean;
}

export const ProviderSubHeader = ({ ActionButton }: ProviderSubHeaderProps) => {
  return (
    <Item as='div' className='provider-subheader'>
      <Item as='div' className='titles'>
        <Breadcrumb icon='right angle' size='big' sections={sections} />
      </Item>

      {ActionButton ? (
        <Item as='div' className='actions'>
          <InputButton text='Export' AddClass='mb-0' />
          <InputButton icon='plus' circular size='mini' />
        </Item>
      ) : (
        ''
      )}
    </Item>
  );
};
