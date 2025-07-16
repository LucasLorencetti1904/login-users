const errorMessage: Record<string, string> = {
    EMPTY: "cannot be empty.",
    CONTAINS_NUMBER: "cannot contains numbers.",
    STARTS_WITH_NUMBER: "cannot starts with number.",
    STARTS_WITH_INVALID_CHARACTER: "cannot starts with a invalid character.",
    CONTAINS_LESS_THEN_4_CHARACTERS: "must contains at least 4 characters.",
    CONTAINS_LESS_THEN_3_CHARACTERS: "must contains at least 3 characters.",
    CONTAINS_MORE_THAN_10_CHARACTERS: "must contains no more than 10 characters.",
    CONTAINS_MORE_THAN_14_CHARACTERS: "must contains no more than 14 characters.",
    CONTAINS_MORE_THAN_64_CHARACTERS: "must contains no more than 64 characters.",
    CONTAINS_SPACE: "cannot contains space.",
    CONTAINS_SPECIAL_CHARACTERS: "cannot contains special characters.",
    MISSING_SYMBOL: "missing '@' symbol."
} as const;

export default errorMessage;