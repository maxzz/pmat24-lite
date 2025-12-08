export type LaunchData = {
    url: string | undefined;
    exe: string | undefined;
    isWeb: boolean;
};

export type LaunchDataAll = {
    login: LaunchData;
    cpass: LaunchData;
    loginDomain: string;
};
