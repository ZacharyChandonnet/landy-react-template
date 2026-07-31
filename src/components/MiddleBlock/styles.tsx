import styled from "styled-components";

export const MiddleBlockSection = styled("section")`
  position: relative;
  padding: 7.5rem 0 3rem;
  display: flex;
  justify-content: center;
   text-align: justify;
  text-align-last: center;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0 3rem;
  }
`;

export const Content = styled("p")`
  padding: 0.75rem 0 0.75rem;
`;

export const ContentWrapper = styled("div")`
  max-width: 100%;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
      text-align: left !important;
  }
`;
