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