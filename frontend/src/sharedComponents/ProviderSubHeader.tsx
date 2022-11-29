import { Breadcrumb, Item } from 'semantic-ui-react';
import { InputButton } from '../controls';
import './ProviderSubHeader.scss';

const sections = [
  { key: 'Administrators', content: 'Administrators', link: true },
  { key: 'Create New User', content: 'Create New User', link: true },
];

interface ProviderSubHeader {
  ActionButton?: Boolean;
}

const ProviderSubHeader = ({ ActionButton }: ProviderSubHeader) => {
  return (
    <Item as='div' className='provider-subheader'>
      <div className='titles'>
        <Breadcrumb icon='right angle' size='big' sections={sections} />
      </div>

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

export default ProviderSubHeader;
