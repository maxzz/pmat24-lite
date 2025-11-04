import { dt, type LanguageMessages } from "../lib";

export default {
    locale: "en",
    greetings: "Hello {name}! Your last login was {lastLoginDate:date}.",
    inboxMessages: dt("Hello {name}, you have {messages:plural}.", {
        plural: { messages: { one: "1 message", other: "{?} messages" } },
    }),
    hobby: dt("You chose {hobby:enum} as your hobby.", {
        enum: { hobby: { runner: "runner", developer: "developer" } },
    }),
    nested: {
        greetings: "Hello {names:list}!",
    },
    missingES: "This is a missing translation in es-ES",
} as const satisfies LanguageMessages;
