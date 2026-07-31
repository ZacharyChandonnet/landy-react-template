import { Row } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import {
  NavLink,
  Extra,
  LogoContainer,
  FooterContainer,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = ({ t }: { t: TFunction }) => {
  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Extra>
      <Container border>
        <Row
          justify="space-between"
          align="middle"
          style={{ paddingTop: "3rem" }}
        >
          <NavLink to="/">
            <LogoContainer>
              <SvgIcon
                src="logo.png"
                aria-label="homepage"
                width="301px"
                height="150px"
              />
            </LogoContainer>
          </NavLink>

          <FooterContainer>
            <SocialLink
              href="https://www.linkedin.com/in/caroline-gosselin-951b91416/"
              src="linkedin.svg"
            />
          </FooterContainer>
        </Row>
      </Container>
    </Extra>
  );
};

export default withTranslation()(Footer);