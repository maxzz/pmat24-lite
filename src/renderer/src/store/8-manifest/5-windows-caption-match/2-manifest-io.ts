// Common helpers
const strings = {
    pack: (v: string[], delim: string, encoder: (s: string) => string): string => {
        return v.map(encoder).join(delim);
    },
    unpack: (v: string, delim: string, decoder: (s: string) => string): string[] => {
        if (!v) return [];
        return v.split(delim).map(decoder);
    }
};

export namespace manifest_io {
    export namespace textchars {
        /////////////////////////////////////////////////////////////////////

        export namespace dbname {
            //manifest filed dbname
            export function remove_illegal(v: string): string {
                let sr = "";
                for (let i = 0; i < v.length; i++) {
                    const chr = v[i];
                    switch (chr) {
                        case '^': sr += "^up;"; break;
                        case '@': sr += "^at;"; break;
                        case '.': sr += "^dot;"; break;
                        case ':': sr += "^2dot;"; break;
                        default: sr += chr; break;
                    }//switch
                }//for
                return sr;
            } //remove_illegal()

            export function restore_illegal(v: string): string {
                let sr = "";
                const len = v.length;

                for (let i = 0; i < len; i++) {
                    const chr = v[i];
                    if (chr !== '^')
                        sr += chr;
                    else
                        if (i < len - 1) {
                            i++;
                            let entity = "";
                            while (i < len && v[i] !== ';')
                                entity += v[i++];

                            if (entity === "up") sr += '^'; else
                                if (entity === "at") sr += '@'; else
                                    if (entity === "dot") sr += '.'; else
                                        if (entity === "2dot") sr += ':'; else
                                            if (i < len)
                                                sr += entity + ';';
                                            else
                                                sr += entity;
                        }
                        else
                            sr += '^';
                }//for
                return sr;
            } //restore_illegal()

        } //namespace dbname

        /////////////////////////////////////////////////////////////////////

        export namespace path {
            //manifest filed path
            export function remove_illegal(v: string): string {
                return dbname.remove_illegal(v);
            } //remove_illegal()

            export function wremove_illegal(v: string): string {
                return dbname.remove_illegal(v);
            } //wremove_illegal()

            export function restore_illegal(v: string): string {
                return dbname.restore_illegal(v);
            } //restore_illegal()

            export function wrestore_illegal(v: string): string {
                return dbname.restore_illegal(v);
            } //wrestore_illegal()

        } //namespace path

        /////////////////////////////////////////////////////////////////////

        export namespace match {
            //match compatibility
            export function restore_illegal(v_: string): string {
                let rv = "";
                const len = v_.length;

                for (let i = 0; i < len; i++) {
                    const chr = v_[i];
                    if (chr !== '^')
                        rv += chr;
                    else
                        if (i < len - 1) {
                            i++;
                            let entity = "";
                            while (i < len && v_[i] !== ';')
                                entity += v_[i++];

                            if (entity === "up") rv += '^'; else
                                if (entity === "2dot") rv += ':'; else
                                    if (i < len)
                                        rv += entity + ';';
                                    else
                                        rv += entity;
                        }
                        else
                            rv += '^';
                }//for
                return rv;
            } //restore_illegal()

            export function remove_illegal(v_: string): string {
                let rv = "";
                for (let i = 0; i < v_.length; i++) {
                    const chr = v_[i];
                    switch (chr) {
                        case '^': rv += "^up;"; break;
                        case ':': rv += "^2dot;"; break;
                        default: rv += chr; break;
                    }//switch
                }//for
                return rv;
            } //remove_illegal()

        } //namespace match

        /////////////////////////////////////////////////////////////////////

        export namespace low {
            //low characters from 1..31, and %, for choosevalue, names, value
            export function remove_illegal(v_: string): string {
                let rv = "";
                // rv.reserve(v_.size());

                for (let i = 0; i < v_.length; i++) {
                    const code = v_.charCodeAt(i);
                    const char = v_[i];
                    if ((code <= 31 && code !== 0) || char === '%') {
                        rv += '%' + code.toString(16).padStart(2, '0');
                    }
                    else {
                        rv += char;
                    }
                }//for

                return rv;
            } //remove_illegal()

            function xdigit2hex(v_: string): number {
                const code = v_.charCodeAt(0);
                // return (isdigit(v_) ? v_ - '0' : 10 + tolower(v_) - 'a') & 0x0f;
                if (code >= 48 && code <= 57) return code - 48; // 0-9
                if (code >= 97 && code <= 102) return 10 + code - 97; // a-f
                if (code >= 65 && code <= 70) return 10 + code - 65; // A-F
                return 0;
            } //xdigit2hex()

            export function restore_illegal(v_: string): string {
                let rv = "";
                // rv.reserve(v_.size());

                let i = 0;
                const len = v_.length;
                while (i < len) {
                    if (v_[i] === '%') {
                        i++;
                        if (i === len)
                            break;

                        const hb = xdigit2hex(v_[i]);

                        i++;
                        if (i === len)
                            break;

                        const lb = xdigit2hex(v_[i]);

                        const b = (hb << 4) | lb;

                        // The correct version is without this check, but we pack only lowest chars
                        // ( in remove_illegal() ), then we need to restore only lowest chars
                        // otherwise it will couse the problem (for example we'll
                        // change %3a to ':' and then do for uppack::cpp(':'))
                        //
                        if (b <= 31 || b === 37) { // 37 is '%'
                            rv += String.fromCharCode(b);
                        }
                        else {
                            rv += '%' + b.toString(16).padStart(2, '0');
                        }
                    }
                    else
                        rv += v_[i];
                    i++;
                }//while
                return rv;
            } //restore_illegal()

        } //namespace low

        /////////////////////////////////////////////////////////////////////

        export namespace names {
            // manifest field names
            export function pack(v_: string[]): string { return strings.pack(v_, ':', path.remove_illegal); }
            export function unpack(v_: string): string[] { return strings.unpack(v_, ':', path.restore_illegal); }

        } //namespace names

        export namespace choosevalue {
            // manifest field choosevalue //TODO: temp: combine unicode and ansi, or clean up to only one
            export function pack(v_: string[]): string { return strings.pack(v_, ':', path.remove_illegal); }
            export function wpack(v_: string[]): string { return strings.pack(v_, ':', path.wremove_illegal); }
            export function unpack(v_: string): string[] { return strings.unpack(v_, ':', path.restore_illegal); }
            export function wunpack(v_: string): string[] { return strings.unpack(v_, ':', path.wrestore_illegal); }

        } //namespace choosevalue

    } //namespace textchars
}

/*
namespace manifest_io {
	namespace textchars
	{
		/////////////////////////////////////////////////////////////////////

		namespace dbname		//manifest filed dbname
		{
			inline string_t remove_illegal(__in const string_t& v)
			{
				string_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					char chr = v[i];
					switch (chr)
					{
						case '^': sr += "^up;"; break;
						case '@': sr += "^at;"; break;
						case '.': sr += "^dot;"; break;
						case ':': sr += "^2dot;"; break;
						default: sr += chr; break;
					}//switch
				}//for
				return sr;
			} //remove_illegal()

			inline string_t restore_illegal(__in const string_t& v)
			{
				string_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == "up") sr += '^'; else
						if (entity == "at") sr += '@'; else
						if (entity == "dot") sr += '.'; else
						if (entity == "2dot") sr += ':'; else
						if (i < len)
							sr += entity + ';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			} //restore_illegal()

		} //namespace dbname

		/////////////////////////////////////////////////////////////////////

		namespace path			//manifest filed path
		{
			inline string_t remove_illegal(__in const string_t& v)
			{
				string_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					char chr = v[i];
					switch (chr)
					{
						case '^': sr += "^up;"; break;
						case '@': sr += "^at;"; break;
						case '.': sr += "^dot;"; break;
						case ':': sr += "^2dot;"; break;
						default: sr += chr; break;
					}//switch
				}//for
				return sr;
			} //remove_illegal()

			inline wstring_t wremove_illegal(__in const wstring_t& v)
			{
				wstring_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					wchar_t chr = v[i];
					switch (chr)
					{
						case '^': sr += L"^up;"; break;
						case '@': sr += L"^at;"; break;
						case '.': sr += L"^dot;"; break;
						case ':': sr += L"^2dot;"; break;
						default: sr += chr; break;
					}//switch
				}//for
				return sr;
			} //wremove_illegal()

			inline string_t restore_illegal(__in const string_t& v)
			{
				string_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == "up") sr += '^'; else
						if (entity == "at") sr += '@'; else
						if (entity == "dot") sr += '.'; else
						if (entity == "2dot") sr += ':'; else
						if (i < len)
							sr += entity + ';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			} //restore_illegal()

			inline wstring_t wrestore_illegal(__in const wstring_t& v)
			{
				wstring_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					wchar_t chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						wstring_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == L"up") sr += '^'; else
						if (entity == L"at") sr += '@'; else
						if (entity == L"dot") sr += '.'; else
						if (entity == L"2dot") sr += ':'; else
						if (i < len)
							sr += entity + L';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			} //wrestore_illegal()

		} //namespace path

		/////////////////////////////////////////////////////////////////////

		namespace match			//match compatibility
		{
			static inline string_t restore_illegal(__in const string_t& v_)
			{
				string_t rv;
				size_t len = v_.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v_[i];
					if (chr != '^')
						rv += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v_[i] != ';')
							entity += v_[i++];

						if (entity == "up") rv += '^'; else
						if (entity == "2dot") rv += ':'; else
						if (i < len)
							rv += entity + ';';
						else
							rv += entity;
					}
					else
						rv += '^';
				}//for
				return rv;
			} //restore_illegal()

			static inline string_t remove_illegal(__in const string_t& v_)
			{
				string_t rv;
				for (unsigned int i=0; i<v_.size(); i++)
				{
					char chr = v_[i];
					switch (chr)
					{
						case '^': rv += "^up;"; break;
						case ':': rv += "^2dot;"; break;
						default: rv += chr; break;
					}//switch
				}//for
				return rv;
			} //remove_illegal()

		} //namespace match

		/////////////////////////////////////////////////////////////////////

		namespace low			//low characters from 1..31, and %, for choosevalue, names, value
		{
			inline string_t remove_illegal(__in const string_t& v_)
			{
				string_t rv; rv.reserve(v_.size());

				for (string_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
				{
					if ((unsigned(*it) <= 31 && *it != 0) || *it == '%')
					{
						rv += sformat("%%%02x", unsigned(*it));
					}
					else
					{
						rv += *it;
					}
				}//for

				return rv;
			} //remove_illegal()

			inline int xdigit2hex(__in char v_)
			{
				return (isdigit(v_) ? v_ - '0' : 10 + tolower(v_) - 'a') & 0x0f;

			} //xdigit2hex()

			inline string_t restore_illegal(__in const string_t& v_)
			{
				string_t rv; rv.reserve(v_.size());

				string_t::const_iterator it = v_.begin();
				while (it != v_.end())
				{
					if (*it == '%')
					{
						++it;
						if (it == v_.end())
							break;

						int hb = xdigit2hex(*it);

						++it;
						if (it == v_.end())
							break;

						int lb = xdigit2hex(*it);

						int b = (hb << 4) | lb;

						// The correct version is without this check, but we pack only lowest chars
						// ( in remove_illegal() ), then we need to restore only lowest chars
						// otherwise it will couse the problem (for example we'll
						// change %3a to ':' and then do for uppack::cpp(':'))
						//
						if (b <= 31 || b == '%')
						{
							rv += char(b);
						}
						else
						{
							rv += sformat("%%%02x", unsigned(b));
						}
					}
					else
						rv += *it;
					++it;
				}//while
				return rv;
			} //restore_illegal()

		} //namespace low

		/////////////////////////////////////////////////////////////////////

		namespace names			// manifest field names
		{
			inline string_t pack(const strings_t& v_)                {return strings::pack(v_, string_t(1,':'), path::remove_illegal);}
			inline void unpack(const string_t& v_, strings_t& rv_)   {strings::unpack(v_, string_t(1,':'), rv_, path::restore_illegal);}

		} //namespace names

		namespace choosevalue	// manifest field choosevalue //TODO: temp: combine unicode and ansi, or clean up to only one
		{
			inline string_t pack(const strings_t& v_)                {return strings::pack(v_, string_t(1,':'), path::remove_illegal);}
			inline wstring_t pack(const wstrings_t& v_)              {return strings::pack(v_, wstring_t(1,':'), path::wremove_illegal);}
			inline void unpack(const string_t& v_, strings_t& rv_)   {strings::unpack(v_, string_t(1,':'), rv_, path::restore_illegal);}
			inline void unpack(const wstring_t& v_, wstrings_t& rv_) {strings::unpack(v_, wstring_t(1,':'), rv_, path::wrestore_illegal);}

		} //namespace choosevalue

	} //namespace textchars
}
*/
