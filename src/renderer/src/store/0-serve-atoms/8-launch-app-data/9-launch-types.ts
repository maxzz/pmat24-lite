// used by maniAtoms

export type LaunchData = {
    url: string | undefined; // This is URL for web applications
    exe: string | undefined; // This is command line for Windows applications
    isWeb: boolean;
};

export type LaunchDataAll = {
    login: LaunchData;
    cpass: LaunchData;
    loginDomain: string;    // This is domain (visaonline.com) from URL to show in the right header
    loginHost: string;      // This is host (gvol.visaonline.com) from URL to show in the right header
};
