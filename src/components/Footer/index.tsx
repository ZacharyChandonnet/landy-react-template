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
            <a href="tel:+14383662833" aria-label="phone" style={{ marginRight: 0 }}>
              438-366-2833 - 
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.6 10.8C8.1 13.6 10.4 15.9 13.2 17.4L14.8 15.8C15 15.6 15.3 15.5 15.6 15.5H18.5C18.8 15.5 19 15.7 19 16V18.5C19 19.9 17.9 21 16.5 21C9.5 21 3 14.5 3 7.5C3 6.1 4.1 5 5.5 5H8C8.3 5 8.5 5.2 8.5 5.5V8.4C8.5 8.7 8.4 9 8.2 9.2L6.6 10.8Z"
                  fill="#0D3A5C"
                />
              </svg>
            </a>
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