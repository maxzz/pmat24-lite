// Options page tooltips

export const manifestName      /**/ = "Specifies a managed logon name for a logon screen.";
export const extendedAuthPolicy/**/ = "Select an additional authentication credential for this application. This additional credential will be used in conjunction with existing session policy credential(s) when accessing this application.";
export const baloonCount       /**/ = "Specifies the number of times the balloon help is shown when logon screen displays.";
export const autoPrompt        /**/ = "Prompts to verify your identity immediately after logon screen displays.";
export const testMode          /**/ = "Specifies whether the logon screen is in test mode.";
// export const autoPromptReload  /**/ = "Prompts to verify your identity upon browser reload.";

// Form fields submit options tooltips

export const lockoutFields     /**/ = "Prevents user from typing data in logon fields.";

// Form detection tooltips

export const windowCaption     /**/ = "Specifies the caption of the logon screen window.";
export const monitor           /**/ = "Monitor for any changes to the screen, when the caption and/or URL may be insufficient to uniquely identify the screen.";

// export const matchUrl          /**/ = "Defines the URL matching method. This can be either the source URL or a regular expression. If you use a regular expression, you can remove parameters from the URL or restrict the match to a specific part of the URL. However, the domain corresponding to the original URL will always be used. For additional examples, see the tooltip for the regular expression input field.";
export const matchUrl          /**/ = <div>
    Defines the URL matching method. <br/>This can be either the source URL or a regular expression. If you use a regular expression, you can remove parameters from the URL or restrict the match to a specific part of the URL. <br/>However, the domain corresponding to the original URL will always be used. For additional examples, see the tooltip for the regular expression input field.
    </div>;

// Quick link tooltips

export const optionsNeedQl     /**/ = "Determines whether this login screen appears in the Quick Links list within the One Touch menu.";
export const quicklinkName     /**/ = "Specifies the name displayed in the One Touch menu.";
export const quicklink         /**/ = "Specifies the URL of the page that will be loaded using this quick link. By default, if the field is empty, the URL of the source website is used.";


// Not used anymore

// export const userHint          /**/ = "Text shown to the user when a screen is being automatically specified.";
// export const description       /**/ = "Text shown to the user to describe screen.";

// export const extMatch          /**/ = "Extended Match Fileds\n(not for a web applications)";
// export const emuMatch          /**/ = "Terminal Emulator Screen Match\n(for terminal emulator applications only)";
// export const matchOnOff        /**/ = "Enable URL matching\r\nIf window caption is the same for multiple Web sites, URL matching can be used to resolve any ambiguity.";
