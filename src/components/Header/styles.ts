import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export const HeaderSection = styled("header")`
  padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: var(--primary);
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  margin: 0 0 0.5rem;
`;

export const DrawerMenu = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: var(--primary);
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;
  text-align: left;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 0;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: var(--primary);
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 0.5rem;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: var(--secondary);
    text-underline-position: under;
    text-decoration: var(--secondary) wavy underline;
  }
`;
