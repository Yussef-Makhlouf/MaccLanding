import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { ContactItem } from "./ContactItem";

export const ContactInfo: React.FC = () => {
  const t = useTranslations("Contact.contactInfo");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <h2
        className="font-bold uppercase mb-4 leading-tight whitespace-pre-line"
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: isRTL ? "0" : "8px",
          fontWeight: 400,
        }}
      >
        {t("title")}
      </h2>

      <div className="mt-6">
        <ContactItem
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6497 23.9569H21.8497C23.0378 23.9569 24.1774 23.4848 25.0175 22.6447C25.8576 21.8044 26.3297 20.6651 26.3297 19.4769V8.27687C26.3297 7.08871 25.8576 5.94913 25.0175 5.10897C24.1774 4.26881 23.0378 3.79688 21.8497 3.79688H8.40969C7.22151 3.79688 6.082 4.26881 5.24185 5.10897C4.40168 5.94913 3.92969 7.08871 3.92969 8.27687V13.8769"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.69141 20.5967H12.8914"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.69141 17.2373H6.17141"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.435 6.07031C19.1518 17.9871 11.0879 17.9759 4.80469 6.07031"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title={t("infoEmail.title")}
          value={t("infoEmail.value")}
          link={`mailto:${t("infoEmail.value")}`}
          linkText={t("infoEmail.value")}
          isRTL={isRTL}
        />

        <ContactItem
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6497 23.9569H21.8497C23.0378 23.9569 24.1774 23.4848 25.0175 22.6447C25.8576 21.8044 26.3297 20.6651 26.3297 19.4769V8.27687C26.3297 7.08871 25.8576 5.94913 25.0175 5.10897C24.1774 4.26881 23.0378 3.79688 21.8497 3.79688H8.40969C7.22151 3.79688 6.082 4.26881 5.24185 5.10897C4.40168 5.94913 3.92969 7.08871 3.92969 8.27687V13.8769"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.69141 20.5967H12.8914"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.69141 17.2373H6.17141"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.435 6.07031C19.1518 17.9871 11.0879 17.9759 4.80469 6.07031"
                stroke="#15AC9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title={t("businessEmail.title")}
          value={t("businessEmail.value")}
          link={`mailto:${t("businessEmail.value")}`}
          linkText={t("businessEmail.value")}
          isRTL={isRTL}
        />

        <ContactItem
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.12914 3.67739C7.50535 3.55992 7.89568 3.5 8.28865 3.5C10.1775 3.5 11.5769 5.16326 11.5769 7.04423V11.2635C11.5769 13.1445 10.1775 14.8077 8.28865 14.8077C7.89567 14.8077 7.50535 14.7478 7.12914 14.6303L6.84154 14.5405C6.74336 14.5098 6.64674 14.4759 6.55181 14.4387C8.05012 17.4814 10.5186 19.9499 13.5613 21.4482C13.5241 21.3533 13.4902 21.2567 13.4595 21.1584L13.3696 20.8708C13.2522 20.4946 13.1923 20.1043 13.1923 19.7113C13.1923 17.8225 14.8555 16.423 16.7365 16.423H20.9558C22.8367 16.423 24.5 17.8225 24.5 19.7113C24.5 20.1043 24.44 20.4946 24.3225 20.8708L24.2328 21.1584C23.7097 22.8336 22.2134 24.0469 20.4237 24.3623C19.3816 24.5458 18.3107 24.546 17.2686 24.3623C17.2276 24.3551 17.1867 24.3474 17.146 24.3392C10.3167 23.0252 4.97471 17.6833 3.66079 10.8538C3.65263 10.8132 3.64495 10.7723 3.63772 10.7314C3.45409 9.68928 3.45409 8.61841 3.63772 7.57633C3.9531 5.78654 5.16632 4.29029 6.84156 3.76719L7.12914 3.67739Z"
                fill="#15AC9E"
              />
              <path
                d="M15.2988 5.35605C17.3682 4.76642 19.6216 5.25961 21.1811 6.81911C22.7407 8.37862 23.2338 10.6321 22.6442 12.7015C22.5219 13.1306 22.7707 13.5774 23.1997 13.6997C23.6286 13.8218 24.0755 13.5732 24.1977 13.1442C24.9353 10.5555 24.3291 7.68262 22.3234 5.67686C20.3176 3.67111 17.4448 3.06491 14.8561 3.8025C14.427 3.92473 14.1784 4.3716 14.3007 4.8006C14.4228 5.2296 14.8698 5.47829 15.2988 5.35605Z"
                fill="#15AC9E"
              />
              <path
                d="M17.3211 8.29214C17.866 8.18359 18.5564 8.36662 19.0952 8.90549C19.6341 9.44436 19.8172 10.1347 19.7087 10.6797C19.6215 11.1171 19.9055 11.5424 20.343 11.6296C20.7805 11.7167 21.2057 11.4327 21.2929 10.9952C21.5157 9.87646 21.1248 8.65048 20.2375 7.76324C19.3503 6.876 18.1243 6.48505 17.0055 6.70788C16.5681 6.79501 16.284 7.2203 16.3712 7.65779C16.4583 8.09526 16.8836 8.37928 17.3211 8.29214Z"
                fill="#15AC9E"
              />
            </svg>
          }
          title={t("phone.title")}
          value={t("phone.value")}
          link={`tel:${t("phone.value")}`}
          linkText={t("phone.value")}
          isRTL={isRTL}
        />

        <ContactItem
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.04058 23.9582C5.74912 25.6668 8.49897 25.6668 13.9987 25.6668C19.4984 25.6668 22.2483 25.6668 23.9568 23.9582C25.6654 22.2498 25.6654 19.4998 25.6654 14.0002C25.6654 8.50044 25.6654 5.75058 23.9568 4.04204C22.2483 2.3335 19.4984 2.3335 13.9987 2.3335C8.49897 2.3335 5.74912 2.3335 4.04058 4.04204C2.33203 5.75058 2.33203 8.50044 2.33203 14.0002C2.33203 19.4998 2.33203 22.2498 4.04058 23.9582ZM11.082 10.2085C8.98795 10.2085 7.29036 11.9061 7.29036 14.0002C7.29036 16.0942 8.98795 17.7918 11.082 17.7918C13.1761 17.7918 14.8737 16.0942 14.8737 14.0002C14.8737 13.5169 15.2655 13.1252 15.7487 13.1252C16.2319 13.1252 16.6237 13.5169 16.6237 14.0002C16.6237 17.0608 14.1427 19.5418 11.082 19.5418C8.02146 19.5418 5.54036 17.0608 5.54036 14.0002C5.54036 10.9396 8.02146 8.4585 11.082 8.4585C11.5653 8.4585 11.957 8.85025 11.957 9.3335C11.957 9.81674 11.5653 10.2085 11.082 10.2085ZM20.707 14.0002C20.707 16.0942 19.0094 17.7918 16.9154 17.7918C16.4321 17.7918 16.0404 18.1836 16.0404 18.6668C16.0404 19.1501 16.4321 19.5418 16.9154 19.5418C19.976 19.5418 22.457 17.0608 22.457 14.0002C22.457 10.9396 19.976 8.4585 16.9154 8.4585C13.8547 8.4585 11.3737 10.9396 11.3737 14.0002C11.3737 14.4834 11.7655 14.8752 12.2487 14.8752C12.7319 14.8752 13.1237 14.4834 13.1237 14.0002C13.1237 11.9061 14.8213 10.2085 16.9154 10.2085C19.0094 10.2085 20.707 11.9061 20.707 14.0002Z"
                fill="#15AC9E"
              />
            </svg>
          }
          title={t("website.title")}
          value={t("website.value")}
          link={`https://forms.office.com/pages/responsepage.aspx?id=fNcx2bDDs0eOtL9yigsLMpPIq0LONVBLtrCs8sJcHixUN09SSjVKM0g3Q1dQRUlRSjk5UTRFNzUwMC4u&route=shorturl`}
          linkText={t("website.value")}
          isRTL={isRTL}
        />
      </div>
    </div>
  );
};