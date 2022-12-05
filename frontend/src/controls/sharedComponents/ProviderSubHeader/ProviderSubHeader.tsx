import { Breadcrumb, Item } from "semantic-ui-react";
import "./ProviderSubHeader.scss";

// const sections = [
//   { key: "Administrators", content: "Administrators", link: true },
//   { key: "Create New User", content: "Create New User", link: true },
// ];

interface ProviderSubHeaderProps {
  ActionButton?: any;
  PageTitle: any;
  pageTitleHint?: any;
}

export const ProviderSubHeader = ({
  ActionButton,
  PageTitle,
  pageTitleHint,
}: ProviderSubHeaderProps) => {
  return (
    <Item as="div" className="provider-subheader">
      <Item as="div" className="titles">
        <Breadcrumb icon="right angle" size="big" sections={PageTitle} />
        {pageTitleHint ? (
          <Item as="div" className="hint">
            {pageTitleHint}{" "}
          </Item>
        ) : (
          ""
        )}
      </Item>

      {ActionButton ? (
        <Item as="div" className="actions">
          {/* <InputButton text='Export' AddClass='mb-0' />
          <InputButton icon='plus' circular size='mini' /> */}
          {ActionButton}
        </Item>
      ) : (
        ""
      )}
    </Item>
  );
};
