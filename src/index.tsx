import { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import * as CookieConsent from "vanilla-cookieconsent";

import "antd/dist/antd.min.css";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import Router from "./router";
import i18n from "./translation";

const App = () => {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },

        analytics: {},
      },

      language: {
        default: "fr",

        translations: {
          fr: {
            consentModal: {
              title: "🍪 Nous utilisons des cookies",

              description:
                "Nous utilisons des cookies essentiels au fonctionnement du site ainsi que des cookies analytiques afin d'améliorer votre expérience.",

              acceptAllBtn: "Tout accepter",

              acceptNecessaryBtn: "Refuser",

              showPreferencesBtn: "Préférences",
            },

            preferencesModal: {
              title: "Préférences des cookies",

              acceptAllBtn: "Tout accepter",

              acceptNecessaryBtn: "Tout refuser",

              savePreferencesBtn: "Enregistrer",

              closeIconLabel: "Fermer",

              sections: [
                {
                  title: "Cookies essentiels",

                  description:
                    "Ces cookies sont indispensables au fonctionnement du site.",

                  linkedCategory: "necessary",
                },

                {
                  title: "Cookies analytiques",

                  description:
                    "Ces cookies nous permettent d'améliorer le site en analysant son utilisation.",

                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));