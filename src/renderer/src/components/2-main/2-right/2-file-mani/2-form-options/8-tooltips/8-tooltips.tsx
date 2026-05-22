// Options page tooltips

export const manifestName      /**/ = "Specifies the name of the managed login template for the login screen—exactly as it will appear in the Password Manager Admin Tool.";
export const extendedAuthPolicy/**/ = "Select an additional authentication credential for this application. This additional credential will be used in conjunction with existing session policy credential(s) when accessing this application.";
export const baloonCount       /**/ = "Determines how many times the tooltip is displayed when the login screen appears.";
export const autoPrompt        /**/ = "Prompts the user to verify their identity immediately after the login screen appears.";
export const testMode          /**/ = "Determines whether the login screen is in test or production mode (and, accordingly, whether it is accessible to users).";
// export const autoPromptReload  /**/ = "Prompts to verify your identity upon browser reload.";

// Form fields submit options tooltips

export const lockoutFields     /**/ = "Disable the login form fields to prevent the user from entering data.";

// Form detection tooltips

export const windowCaption     /**/ = "Specifies the caption of the logon screen window.";
export const monitor           /**/ = "Monitor for any changes to the screen, when the caption and/or URL may be insufficient to uniquely identify the screen.";

export const matchUrl          /**/ = "Defines the URL matching method. This can be either the source URL or a regular expression. If you use a regular expression, you can remove parameters from the URL or restrict the match to a specific part of the URL. However, the domain corresponding to the original URL will always be used. For additional examples, see the tooltip for the regular expression input field.";

// Icon position

export const iconPosition      /**/ = "Specifies the corner of the login screen where the Password Manager icon is positioned (relative to that screen). This is useful in cases where the Password Manager icon obscures an important part of the login screen.";

// Quick link tooltips

export const optionsNeedQl     /**/ = "Determines whether this login screen appears in the Quick Links list within the One Touch menu (mini-dashboard).";
export const quicklinkName     /**/ = "Specifies the name displayed in the One Touch menu (mini-dashboard).";
export const quicklink         /**/ = "Specifies the URL of the page that will be loaded using this quick link. By default, if the field is empty, the URL of the source website is used.";


// Not used anymore

// export const userHint          /**/ = "Text shown to the user when a screen is being automatically specified.";
// export const description       /**/ = "Text shown to the user to describe screen.";

// export const extMatch          /**/ = "Extended Match Fileds\n(not for a web applications)";
// export const emuMatch          /**/ = "Terminal Emulator Screen Match\n(for terminal emulator applications only)";
// export const matchOnOff        /**/ = "Enable URL matching\r\nIf window caption is the same for multiple Web sites, URL matching can be used to resolve any ambiguity.";
