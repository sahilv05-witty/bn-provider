import React from "react";
import { Container, Item } from "semantic-ui-react";
import {
  ProviderFooter,
  ProviderHeader,
  ProviderSubHeader,
} from "../../controls/sharedComponents";

const PageTitle = [
  { key: "Term of Use", content: "Term of Use", active: true },
];

export const TermOfUse = () => {
  return (
    <Item as="div" className="Term-of-Use">
      <ProviderHeader toggleMenu={() => {}} />
      <ProviderSubHeader PageTitle={PageTitle} />
      <Container fluid>
        <Item as="p">
          <i>Last revised [date last revised]</i>
        </Item>
        <Item as="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget
          est lorem ipsum dolor sit amet. Elementum pulvinar etiam non quam
          lacus. Ipsum dolor sit amet consectetur. Porttitor eget dolor morbi
          non arcu risus quis varius. Purus sit amet luctus venenatis lectus
          magna fringilla urna. Orci phasellus egestas tellus rutrum tellus
          pellentesque eu tincidunt. Egestas quis ipsum suspendisse ultrices.
          Cursus mattis molestie a iaculis at erat. Tincidunt praesent semper
          feugiat nibh sed pulvinar proin. In nulla posuere sollicitudin aliquam
          ultrices sagittis. Eget felis eget nunc lobortis mattis aliquam
          faucibus purus in. Placerat orci nulla pellentesque dignissim enim sit
          amet venenatis urna. Nec feugiat in fermentum posuere urna nec
          tincidunt praesent. Et tortor at risus viverra adipiscing at. A
          condimentum vitae sapien pellentesque habitant morbi tristique. Id
          neque aliquam vestibulum morbi blandit. Malesuada nunc vel risus
          commodo viverra. Enim nunc faucibus a pellentesque sit. Eu feugiat
          pretium nibh ipsum consequat nisl vel pretium. Arcu risus quis varius
          quam quisque id diam. Mattis vulputate enim nulla aliquet porttitor.
          Amet consectetur adipiscing elit ut. Ut eu sem integer vitae justo
          eget magna fermentum. Vestibulum lectus mauris ultrices eros in
          cursus. Aliquam vestibulum morbi blandit cursus risus at ultrices.
          Bibendum neque egestas congue quisque. Purus in mollis nunc sed id.
          Morbi tristique senectus et netus. Quis auctor elit sed vulputate mi
          sit. Vestibulum lorem sed risus ultricies. Tincidunt vitae semper quis
          lectus nulla at volutpat. Porta non pulvinar neque laoreet.
          Scelerisque eu ultrices vitae auctor eu augue. Pretium viverra
          suspendisse potenti nullam ac tortor vitae. Duis ultricies lacus sed
          turpis tincidunt id aliquet risus. Pulvinar pellentesque habitant
          morbi tristique senectus et netus et malesuada. Quam viverra orci
          sagittis eu volutpat odio. Feugiat scelerisque varius morbi enim.
          Viverra aliquet eget sit amet tellus. Eget gravida cum sociis natoque.
          Vel facilisis volutpat est velit egestas dui. Maecenas ultricies mi
          eget mauris. Nulla facilisi cras fermentum odio eu feugiat pretium
          nibh ipsum. Ornare arcu odio ut sem nulla pharetra diam sit amet. Et
          odio pellentesque diam volutpat commodo sed egestas egestas. Eget
          lorem dolor sed viverra ipsum. Ligula ullamcorper malesuada proin
          libero nunc consequat interdum varius sit. Ut etiam sit amet nisl
          purus in mollis nunc. Consequat interdum varius sit amet mattis. Lorem
          ipsum dolor sit amet. In iaculis nunc sed augue. Augue interdum velit
          euismod in pellentesque massa placerat duis ultricies. Ac tincidunt
          vitae semper quis lectus nulla. Libero volutpat sed cras ornare arcu
          dui vivamus arcu. Erat pellentesque adipiscing commodo elit at
          imperdiet dui accumsan sit. Massa eget egestas purus viverra. Euismod
          in pellentesque massa placerat duis ultricies lacus sed. Mattis
          pellentesque id nibh tortor id aliquet lectus proin. Vel facilisis
          volutpat est velit egestas dui id ornare. Sit amet volutpat consequat
          mauris nunc congue nisi. Id diam maecenas ultricies mi eget mauris
          pharetra et. Egestas diam in arcu cursus euismod. Neque aliquam
          vestibulum morbi blandit. Platea dictumst quisque sagittis purus sit.
          Ut diam quam nulla porttitor massa id. Ultrices mi tempus imperdiet
          nulla malesuada pellentesque elit eget gravida. Risus in hendrerit
          gravida rutrum quisque non. Feugiat in fermentum posuere urna nec
          tincidunt. Viverra maecenas accumsan lacus vel facilisis volutpat.
          Sagittis orci a scelerisque purus. Nunc consequat interdum varius sit
          amet mattis vulputate enim. Ultrices in iaculis nunc sed. Phasellus
          faucibus scelerisque eleifend donec pretium. Elit sed vulputate mi
          sit. Blandit massa enim nec dui nunc mattis enim. Et netus et
          malesuada fames. Nec ultrices dui sapien eget. Id venenatis a
          condimentum vitae. Ipsum faucibus vitae
        </Item>
      </Container>
      <ProviderFooter />
    </Item>
  );
};
