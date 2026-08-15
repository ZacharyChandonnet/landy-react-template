import styled from "styled-components";

export const ContactContainer = styled("div")`
  padding: 5rem 0;

  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
`;

export const FullWidthBanner = styled("div")`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: var(--primary);
  color: #fff;
  text-align: center;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
  @media only screen and (max-width: 1024px) {
    margin-bottom: 5rem;
  }
`;

export const BannerContent = styled("div")`
  width: 100%;
  padding: 0 1rem;
`;

export const BannerTitle = styled("h6")`
  color: #fff;
  margin: 0 0 2rem 0;
`;

export const HighlightedWord = styled("span")`
  color: var(--secondary);
`;

export const BannerList = styled("ul")`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FormGroup = styled("form")`
  width: 100%;
  max-width: 520px;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

export const Span = styled("span")`
  display: block;
  font-weight: 600;
  color: var(--secondary);
  height: 0.775rem;
  padding: 0 0.675rem;
`;

export const ButtonContainer = styled("div")`
  text-align: end;
  position: relative;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`;
