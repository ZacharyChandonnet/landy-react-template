import React, { useState } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm as useFormSpree } from "@formspree/react";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>(
    {}
  );

  const [state, formspreeSubmit] = useFormSpree("xvzeqdeg");

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <Span>{ErrorMessage}</Span>;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const getVal = (key: string) => {
      return (
        (formData.get(key) as string) ||
        (formData.get(key.charAt(0).toUpperCase() + key.slice(1)) as string) ||
        ""
      );
    };

    const values = {
      name: getVal("name"),
      email: getVal("email"),
      message: getVal("message"),
    };

    const validationErrors = validate(values);
    setErrors(validationErrors as any);

    if (Object.keys(validationErrors).length === 0) {
      await formspreeSubmit(event as any);
    }
  };

  if (state.succeeded) {
    return (
      <ContactContainer id={id}>
        <Row justify="center">
          <Col>
            <p>Message envoyé, au plaisir de vous répondre sous peu.</p>
          </Col>
        </Row>
      </ContactContainer>
    );
  }

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left" triggerOnce>
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
            <FormGroup autoComplete="off" onSubmit={onSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Email"
                  placeholder="Your Email"
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  name="Message"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
