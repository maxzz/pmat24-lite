export function WelcomeHeroTitle({ allowHandleFiles }: { allowHandleFiles: boolean; }) {
    function t(s: string) {
        return s;
    }
    return (<>
        <div className="text-2xl font-extrabold opacity-30 scale-y-125 select-none" style={titleStyle}>
            Welcome to the Password Manager Admin Tool
            {/* {t("welcomeToThePasswordManagerAdminTool")} */}
            {t("Welcome to the Password Manager Admin Tool")}
            More info
        </div>

        <div className="text-xs text-balance select-none">
            {allowHandleFiles
                ? "Open the file or folder containing the template files to start working with the application."
                : "Open the folder containing the template files to start working with the application."
            }
        </div>
    </>);
}

const titleStyle = {
    color: 'black',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: '0.1px hsl(var(--foreground))',
    WebkitFontSmoothing: 'antialiased',
};
