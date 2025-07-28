import { EMAIL_TOP_LEVEL_DOMAIN } from "@shared/constants/emailDomains";
import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "@shared/constants/emailDomains";
import { EMAIL_SECOND_LEVEL_DOMAIN } from "@shared/constants/emailDomains";

export type EmailTopLevelDomain = typeof EMAIL_TOP_LEVEL_DOMAIN[number];

export type EmailTopLevelDomainCountryCode = typeof EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE[number];

export type EmailSecondLevelDomain = typeof EMAIL_SECOND_LEVEL_DOMAIN[number];