import { manifest_io } from './2-manifest-io';

export namespace WINDOWTITLETYPE {
    export enum type_t {
        full = 0,
        left,
        right,
        both,
    }

    export function toString(v_: type_t): string {
        switch (v_) {
            case type_t.full: return "full";
            case type_t.left: return "left";
            case type_t.right: return "right";
            case type_t.both: return "both";
            default: return `NEW ${v_}`;
        }
    }
}

export class windowtitle_t {
    matchtype: WINDOWTITLETYPE.type_t;
    caption: string;
    variablecaption: string;

    constructor() {
        this.matchtype = WINDOWTITLETYPE.type_t.full;
        this.caption = "";
        this.variablecaption = "";
    }

    equals(r: windowtitle_t): boolean {
        return (
            this.matchtype === r.matchtype &&
            this.caption === r.caption &&
            this.variablecaption === r.variablecaption
        );
    }

    blank(): boolean {
        return (
            this.matchtype === WINDOWTITLETYPE.type_t.full &&
            !this.caption &&
            !this.variablecaption
        );
    }
}

export function internal_unpack_afterload_detection(windowtitle_: windowtitle_t): void {
    const caption = windowtitle_.caption;

    if (caption.startsWith("[m0]:2:2:")) { // Variable caption with wildcard to the right
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.right;
        windowtitle_.variablecaption = manifest_io.textchars.match.restore_illegal(caption.substring(9));
        windowtitle_.caption = windowtitle_.variablecaption + "*";
    }
    else if (caption.startsWith("[m0]:2:1:")) { // Variable caption with wildcard to the left
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.left;
        windowtitle_.variablecaption = manifest_io.textchars.match.restore_illegal(caption.substring(9));
        windowtitle_.caption = "*" + windowtitle_.variablecaption;
    }
    else if (caption.startsWith("[m0]:2:3:")) { // Variable caption with wildcard at both end
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.both;
        windowtitle_.variablecaption = manifest_io.textchars.match.restore_illegal(caption.substring(9));
        windowtitle_.caption = "*" + windowtitle_.variablecaption + "*";
    }
}

export function internal_pack_beforesave_detection(windowtitle_: windowtitle_t): void {
    const caption_ = windowtitle_.caption;

    const n = caption_.indexOf("*");
    if (n === -1) {
        return;
    }

    const n2 = caption_.lastIndexOf("*");

    // First check the multiple wildcard
    if (n2 !== n && caption_[n2 - 1] !== '\\' && n === 0 && n2 === caption_.length - 1) {
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.both;
        windowtitle_.variablecaption = manifest_io.textchars.match.remove_illegal(caption_.substring(n + 1, n2));
        windowtitle_.caption = "[m0]:2:3:" + windowtitle_.variablecaption;
    }
    // Second check the wildcard at the beginning (wildcard at end of string in logic? No, n > 0 means wildcard is not at start)
    else if (n > 0 && caption_[n - 1] !== '\\' && n === caption_.length - 1) {
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.right;
        windowtitle_.variablecaption = manifest_io.textchars.match.remove_illegal(caption_.substring(0, n));
        windowtitle_.caption = "[m0]:2:2:" + windowtitle_.variablecaption;
    }
    // Third check the wildcard at the end (logic says n == 0, so wildcard at start)
    else if (n === 0) {
        windowtitle_.matchtype = WINDOWTITLETYPE.type_t.left;
        windowtitle_.variablecaption = manifest_io.textchars.match.remove_illegal(caption_.substring(n + 1));
        windowtitle_.caption = "[m0]:2:1:" + windowtitle_.variablecaption;
    }
}

/*
    namespace WINDOWTITLETYPE		// window string match, this is for window caption
    {
        enum type_t
        {
            full,
            left,
            right,
            both,
        };

        inline string_t toString(const WINDOWTITLETYPE::type_t& v_)
        {
            const char* rv;
            switch (v_)
            {
                case WINDOWTITLETYPE::full : rv = "full"; break;
                case WINDOWTITLETYPE::left : rv = "left"; break;
                case WINDOWTITLETYPE::right: rv = "right"; break;
                case WINDOWTITLETYPE::both : rv = "both"; break;
                default: return sformat("NEW %d", (unsigned int)v_);
            }
            return rv;
        }
    }


class windowtitle_t				// window caption
{
public:
    WINDOWTITLETYPE::type_t matchtype;
    string_t caption;
    string_t variablecaption;	// if variablecaption is not empty and different from caption field then we are using vcm (variable cation match)

    windowtitle_t() : matchtype(WINDOWTITLETYPE::full)
    {
    }

    bool operator==(const windowtitle_t& r) const
    {
        return
            matchtype == r.matchtype &&
            caption == r.caption &&
            variablecaption == r.variablecaption;
    }

    bool blank() const
    {
        return
            matchtype == WINDOWTITLETYPE::full &&
            caption.empty() &&
            variablecaption.empty();
    }

}; //class windowtitle_t

inline void internal_unpack_afterload_detection(__inout windowtitle_t& windowtitle_)
{
    string_t caption = windowtitle_.caption;

    if (caption.find("[m0]:2:2:") == 0)			// Vairable caption with wildcard to the right
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::right;

        windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
        windowtitle_.caption = windowtitle_.variablecaption + "*";
    }
    else
    if (caption.find("[m0]:2:1:") == 0)			// Variable caption with wildcard to the left
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::left;

        windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
        windowtitle_.caption = "*" + windowtitle_.variablecaption;
    }
    else
    if (caption.find("[m0]:2:3:") == 0)			// Variable caption with wildcard at both end
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::both;

        windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
        windowtitle_.caption = "*" + windowtitle_.variablecaption + "*";
    }

} //internal_unpack_afterload_detection()

inline void internal_pack_beforesave_detection(__inout windowtitle_t& windowtitle_)
{
    const string_t& caption_ = windowtitle_.caption;

    size_t n = caption_.find("*");
    if (n == string_t::npos)
    {
        return;
    }

    size_t n2 = caption_.rfind("*");

    if (n2 != n && caption_[n2-1] != '\\' && n == 0 && n2 == caption_.length()-1)	// First check the multiple wildcard
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::both;

        windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(n+1, n2-n-1));
        windowtitle_.caption = "[m0]:2:3:" + windowtitle_.variablecaption;
    }
    else
    if (n > 0 && caption_[n-1] != '\\' && n == caption_.length()-1)					// Second check the wildcard at the beginning
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::right;

        windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(0, n));
        windowtitle_.caption = "[m0]:2:2:" + windowtitle_.variablecaption;
    }
    else
    if (n == 0)																		// Third check the wildcard at the end
    {
        windowtitle_.matchtype = manifest::WINDOWTITLETYPE::left;

        windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(n+1, caption_.length()-1));
        windowtitle_.caption = "[m0]:2:1:" + windowtitle_.variablecaption;
    }

} //internal_pack_beforesave_detection()
*/
