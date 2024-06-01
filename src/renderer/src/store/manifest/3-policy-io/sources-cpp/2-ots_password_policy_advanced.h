//#include "ots_password_policy_advanced.h"
//
#pragma once
#include "ots_password_policy.h"

namespace advancedpswpolicy
{
	/////////////////////////////////////////////////////////////////////////

	class rangeEntry_t			// Specifies a repetition range like {n,m}.
	{
	public:
		// We have four possible cases: missing both; {n}; {n,}; {n,m}.
		// missing both -> {-1,-1}	-> min = 1; max = 1;
		// {n}			-> {n,-1}	-> min = n, max = n;
		// {n,}			-> {n,-2}	-> min = n and max is determined using the final password length and other open ranges in rule.
		// {n,m}		-> {n,m}	-> min = n, max = m;

		int m_min;				// Minimum length of repetition. -1 if value is undefined by rule; -2 if value is ommited by rule.
		int m_max;				// Maximum length of repetition. -1 if value is undefined by rule; -2 if value is ommited by rule.

		rangeEntry_t() : m_min(-1), m_max(-1)
		{
		}
	};

	class ruleEntry_t;
	typedef std::list<ruleEntry_t> ruleEntries_t;

	class chsetEntry_t			// Character set element as a simplest rule like: [a-z]{1,} with repetition.
	{
	public:
		wstring_t m_charset;	// A set of characters.
		rangeEntry_t m_rangeEntry;
	};

	class groupEntry_t			// Group element as a complex rule like: ([a-z]{1,}\A{3}\d{1,3}) with repetition.
	{
	public:
		ruleEntries_t m_ruleEntries;	// Rules inside this group.
		rangeEntry_t m_rangeEntry;
		bool m_mix;				// True if permutation (rearranging) is allowed for this set.
		// TODO: nested level. 0 for the lowest level, i.e. most nested group.
		// TODO: group start in source text.

		groupEntry_t() : m_mix(true) {}
	};

	class ruleEntry_t			// Element that has either chsetEntry_t or groupEntry_t.
	{
	public:
		bool m_isgroup;
		chsetEntry_t m_chsetEntry;	// Character set element.
		groupEntry_t m_groupEntry;	// Group element.

		ruleEntry_t() : m_isgroup(false)
		{
		}
	};

	class rulesSet_t
	{
	public:
		ruleEntries_t m_ruleEntries;
		rangeEntry_t m_pswlenSet; // Final total length of password.
		bool         m_avoidConsecutiveChars:1; // Whether to disallow repetition of same character consecutively. 
		bool         m_checkPrevPasswordCharPosition:1; // Avoid same character in the same position as its recent (predecessor) value.
		rulesSet_t() : m_avoidConsecutiveChars(false), m_checkPrevPasswordCharPosition(false)
		{
		}
	};

	__declspec(selectany) wchar_t WSHORTHAND_d[] = L"0123456789";
	__declspec(selectany) wchar_t WSHORTHAND_a[] = L"abcdefghijklmnopqrstuvwxyz";
	__declspec(selectany) wchar_t WSHORTHAND_A[] = L"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	__declspec(selectany) wchar_t WSHORTHAND_s[] = L"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 21-2F, 3A-40, 5B-60, 7B-7E

	/////////////////////////////////////////////////////////////////////////

	class parseError : public std::runtime_error
	{
	public:
		enum errorType_t {
			errNone,					// No errors as a default value.
			errUnexpected,				// Any unexpected error that is thrown as a general exeption.
			errUnexpShorthand,			// "unexpected shorthand"
			errUnexpChar,				// "unexpected char" character that is defined in m_expected member.
			errExpChar,					// "expected" character that is defined in m_expected member.
			errExpCharALessB,			// "expected character in set as a <= b"
			errExpMoreText,				// "no more text"
			errExpNum,					// "expected number"
			errInvRange,				// "invalid range", i.e. min > max
			errExpDigit,				// "expected digit"
			errExp4Digits,				// "expected 4 hex digits"
			errUnexpChSetClose,			// "unexpected '[' before ']'", i.e. close without open.
			errChSetEmpty,				// "unexpected empty charset"
			errExpLowBoundCh,			// "expected lower boundary char before '-'"
			errUnexpDoubleSet,			// "unexpected double '--'". Use escape character i.e. "\-"
			errMoreThen1024,			// "expected less then 1024 per charset"
			errLastError,				// A highest number of error.
		} m_errorType;

		size_t m_errorPos;
		wchar_t m_expected;

		parseError() :
			std::runtime_error(""), m_errorPos(0), m_errorType(errNone), m_expected(0)
		{
		}

		parseError(const string_t& Message_, errorType_t errorType_ = errNone, wchar_t expected_ = 0) :
			std::runtime_error(Message_), m_errorPos(0), m_errorType(errorType_), m_expected(expected_)
		{
		}

	};

	class apparser_t
	{
		/*static*/ void generateShorthandSet(__in wchar_t shorthand_, __out wstring_t& rv_) const throw(...)
		{
			switch (shorthand_)
			{
				case 'd': rv_ = WSHORTHAND_d; break;
				case 'a': rv_ = WSHORTHAND_a; break;
				case 'A': rv_ = WSHORTHAND_A; break;
				case 's': rv_ = WSHORTHAND_s; break;
				default:
					throw parseError("unexpected shorthand", parseError::errUnexpShorthand);
			}//switch
		}
		
		/*static*/ void generateCharRange(__in wchar_t A_, __in wchar_t B_, __inout wstring_t& rv_) const throw(...)
		{
			// 0. Generate, make sure that characters are unique in set, and sort.

			if (A_ > B_)
				throw parseError("expected set n <= m", parseError::errExpCharALessB);
			
			for (wchar_t a = A_; a <= B_; a++)
			{
				bool isNew = rv_.find_first_of(a) == wstring_t::npos;
				if (!isNew)
				{
					continue;
				}

				rv_ += a;
			}//for

			std::sort(rv_.begin(), rv_.end(), std::less<wchar_t>()); // i.e. "abc"
		}
		
		void skipWhitespace() throw()
		{
			while (m_sourceTextPos < m_sourceText.length())
			{
				wchar_t ch = 0;
				if (!getCharNoThrow(ch))
					return;

				switch (ch)
				{
					case ' ':
					case '\t':
						break;
					default:
						{
							ungetChar();
							return;
						}
				}//switch
			}//while
		}

		bool hasChar() const throw() // hasNextChar
		{
			bool rv = m_sourceTextPos < m_sourceText.length();
			return rv;
		}

		void ungetChar() throw()
		{
			if (m_sourceTextPos <= 0)
			{
				atltrace::impossible("no more unget"); // This is just internal error and should be fixed in logic.
				return;
			}
			m_sourceTextPos--;
		}

		wchar_t getChar() throw(...) // getNextChar
		{
			if (!hasChar())
			{
				throw parseError("no more text", parseError::errExpMoreText);
			}

			wchar_t rv = m_sourceText[m_sourceTextPos];
			m_sourceTextPos++;

			return rv;
		}

		bool getCharNoThrow(__out wchar_t& rv_) throw() // Internal method to avoid recursion with skipWhitespace and getNumberIfExistWs.
		{
			if (!hasChar())
			{
				return false;
			}

			rv_ = m_sourceText[m_sourceTextPos];
			m_sourceTextPos++;

			return true;
		}

		bool getCharIfExistWs(__out wchar_t& rv_) throw() // Skip whitespace and get next character.
		{
			skipWhitespace();

			bool rv = getCharNoThrow(rv_);
			return rv;
		}

		void ExpectedCharWs(__in wchar_t expected_) throw(...) // Skip whitespace and check next character.
		{
			skipWhitespace();

			wchar_t ch = getChar();
			if (ch != expected_)
				throw parseError("expected" + expected_, parseError::errExpChar, expected_);
		}

		bool getNumberIfExistWs(__out int& rv_) throw() // Skip whitespace and get number.
		{
			rv_ = 0;

			skipWhitespace();

			wstring_t buffer;
			while (true)
			{
				wchar_t ch = 0;
				bool gotChar = getCharNoThrow(ch);
				if (!gotChar)
				{
					break;
				}

				bool gotDigit = iswdigit(ch) != 0;
				if (!gotDigit)
				{
					ungetChar();
					break;
				}

				buffer += ch;
			}//while

			if (buffer.empty())
			{
				return false;
			}

			convert_int(buffer, rv_);
			return true;
		}

		void getRangeEntryWs(__in wchar_t OPEN_,  __in wchar_t CLOSE_,  __inout rangeEntry_t& rangeEntry_) throw(...) // Get range if exist.
		{
			wchar_t ch = 0;
			if (!getCharIfExistWs(ch))
			{
				return;
			}

			if (ch != OPEN_)
			{
				ungetChar();
				return;
			}

			bool hasN = getNumberIfExistWs(rangeEntry_.m_min);
			if (!hasN)
				throw parseError("expected number", parseError::errExpNum);

			skipWhitespace();
			if (getChar() == CLOSE_)
			{
				rangeEntry_.m_max = rangeEntry_.m_min; // Simplified version of length <2,2> as <2>.
				return;
			}
			ungetChar();
			ExpectedCharWs(',');

			bool hasM = getNumberIfExistWs(rangeEntry_.m_max);
			if (!hasM)
			{
				rangeEntry_.m_max = -2; //rangeEntry_.m_min;
			}

			ExpectedCharWs(CLOSE_);
			if (hasM)
			{
			    if (rangeEntry_.m_min > rangeEntry_.m_max)
    				throw parseError("invalid range", parseError::errInvRange); 
			}
		}

		void parse_finalPswLength(__inout rangeEntry_t& rangeEntry_) throw(...) // Get final length of password: <2,2> or <2>.
		{
			getRangeEntryWs('<', '>', rangeEntry_);
			
			if (rangeEntry_.m_max == -1)
				rangeEntry_.m_max = rangeEntry_.m_min;
		}

		void parse_range(__inout rangeEntry_t& rangeEntry_) throw(...) // Allowed notation for ranges: {2,4} or {2,2} or {2} or {2,}
		{
			getRangeEntryWs('{', '}', rangeEntry_);
		}

		void getCharOfCharset(__out wchar_t& rv_char_) throw(...) // single character like: a b \u1234 \U1234 \u+1234 \U+1234 \u-1234 \U-1234
		{
			rv_char_ = 0;
			wchar_t ch = 0;

			ch = getChar();
			if (ch != '\\')
			{
				rv_char_ = ch; // Not an escape then return as it is.
				return;
			}

			ch = getChar();
			if (ch != 'u' && ch != 'U')
			{
				rv_char_ = ch; // Not an unicode then return as it is.
				return;
			}

			ch = getChar();
			if (ch != '+' && ch != '-')
			{
				ungetChar(); // Don't eat if it is not an optional '+' or '-'.
			}

			// Get 4 hexidecimal digits.

			wstring_t buffer;
			int i = 0;
			while (i++ < 4)
			{
				ch = getChar();

				bool gotDigit = iswdigit(ch) != 0 || (ch >= 'A' && ch <= 'F') || (ch >= 'a' && ch <= 'f');
				if (!gotDigit)
					throw parseError("expected digit", parseError::errExpDigit);

				buffer += ch;
			}//while

			// Convert to wchar_t
			
			int number = -1;
			convert_hex(buffer, -1, number); // TODO: Check that we can handle lower and upper case.

			if (number > 0xFFFF || number < 0)
				throw parseError("expected 4 hex digits", parseError::errExp4Digits);

			rv_char_ = (wchar_t)number;
		}

		void parse_charset(__out wstring_t& rv_charset_) throw(...) // single character sets (don't skip whitespace) like: [a-z02 A-M-ZZY02-1]
		{
			rv_charset_.clear();

			wchar_t ch = getChar();
			bool isSquareBrStart = ch == '[';
			if (ch != '[')
			{
				ungetChar(); // Eat only '['
			}

			while (true)
			{
				ch = getChar();
				if (ch == ']') // Check if it is the end of character set and we started with '['.
				{
					if (!isSquareBrStart)
						throw parseError("unexpected '[' before ']'", parseError::errUnexpChSetClose); // expected charset beging before closing.
					if (rv_charset_.empty())
						throw parseError("unexpected empty charset", parseError::errChSetEmpty);
					return;
				}

				bool isRange = false;

				if (ch == '-') // If it is a range of characters then eat this character.
				{
					if (rv_charset_.empty())
						throw parseError("expected lower boundary char before '-'", parseError::errExpLowBoundCh);

					ch = getChar(); // Check that we don't have '[--1]'. '-' should be escaped.
					if (ch == '-')
						throw parseError("unexpected double '--'", parseError::errUnexpDoubleSet);
					ungetChar();

					isRange = true;
				}
				else
				{
					ungetChar();
				}

				wchar_t chCharset = 0;
				getCharOfCharset(chCharset);

				if (isRange)
				{
					wchar_t chFirst = rv_charset_[rv_charset_.length()-1]; // Cut the last char and use it as a first of range.
					rv_charset_.erase(rv_charset_.length()-1);
					
					generateCharRange(chFirst, chCharset, rv_charset_);
					isRange = false;
					continue;
				}

				rv_charset_ += chCharset;
			}//while (true)
		}

		void parse_group(__inout ruleEntry_t& ruleEntry_) throw(...) // '(' Rules ')' '.' // Range is handled outside.
		{
			wchar_t ch = getChar();
			if (ch != '(')
			{
				throw parseError("expected '('", parseError::errExpChar, '('); // This is just internal error and should be fixed in logic. //ungetChar(); // Eat only '('
			}

			parse_rules(ruleEntry_.m_groupEntry.m_ruleEntries);

			ch = getChar();
			if (ch != ')')
			{
				throw parseError("expected ')'", parseError::errExpChar, ')'); // Expected end of group.
			}

			ch = 0;
			if (getCharIfExistWs(ch))
			{
				if (ch == '.')
				{
					ruleEntry_.m_groupEntry.m_mix = false;
				}
				else
				{
					ungetChar();
				}
			}
		}

		void parse_rule(__inout ruleEntry_t& ruleEntry_) throw(...) // single rule like: 'a{1,2}' 'A{1,1}' '[0-9]{1,1}' '(a{1,2}).{1,2}'
		{
			wchar_t ch = 0;
			if (!getCharIfExistWs(ch))
			{
				return;
			}

			switch (ch)
			{
				case '(': // group
					{
						ungetChar();
						ruleEntry_.m_isgroup = true;
						parse_group(ruleEntry_);
						parse_range(ruleEntry_.m_groupEntry.m_rangeEntry);
					}
					break;
				case '[': // charset
					{
						ungetChar();
						ruleEntry_.m_isgroup = false;
						parse_charset(ruleEntry_.m_chsetEntry.m_charset);
						parse_range(ruleEntry_.m_chsetEntry.m_rangeEntry);

						if (ruleEntry_.m_chsetEntry.m_charset.size() > 1024)
							throw parseError("expected less then 1024 per charset", parseError::errMoreThen1024); // Charsets can be splited into different sets and then grouped together.
					}
					break;
				case 'd': // shorthand d
				case 'a': // shorthand a
				case 'A': // shorthand A
				case 's': // shorthand s
					{
						ruleEntry_.m_isgroup = false;
						generateShorthandSet(ch, ruleEntry_.m_chsetEntry.m_charset);
						parse_range(ruleEntry_.m_chsetEntry.m_rangeEntry);
					}
					break;
				default:
					throw parseError("unexpected char", parseError::errUnexpChar, ch);
			}//switch
		}

		void parse_rules(__inout ruleEntries_t& ruleEntries_) throw(...) // sequence of character sets like: a{1,2}A{1,1}[0-9]{1,1}
		{
			while (true)
			{
				wchar_t ch = 0;
				bool gotChar = getCharNoThrow(ch);
				if (!gotChar)
				{
					return;
				}

				switch (ch)
				{
					case '(': // group
					case 'd': // shorthand d
					case 'a': // shorthand a
					case 'A': // shorthand A
					case 's': // shorthand s
					case '[': // charset
						{
							ungetChar();
							ruleEntry_t ruleEntry;
							parse_rule(ruleEntry);
							ruleEntries_.push_back(ruleEntry);
						}
						break;
					default:
						{
							ungetChar();
							return;
						}
				}//switch
			}//while (true)
		}

		void parse_start() throw(...)
		{
			while (true)
			{
				wchar_t ch = 0;
				if (!getCharIfExistWs(ch))
				{
					return;
				}

				switch (ch)
				{
					case '~': // To avoid the same character be used consecutively (global),
						{
							m_rulesSet.m_avoidConsecutiveChars = true;
						}
					break;
					case '&': // To avoid the same character in the same position from its previous value (recent one only).
						{
							m_rulesSet.m_checkPrevPasswordCharPosition = true;
						}
					break;
					case '(': // group
					case '[': // charset
					case 'd': // shorthand d
					case 'a': // shorthand a
					case 'A': // shorthand A
					case 's': // shorthand s
						{
							ungetChar();
							parse_rules(m_rulesSet.m_ruleEntries);
						}
					break;
					case '<': // final psw length can be at the begin or at the end of input string.
						{
							ungetChar();
							parse_finalPswLength(m_rulesSet.m_pswlenSet);
						}
					break;
					default:
						throw parseError("unexpected char", parseError::errUnexpChar, ch);
				}//switch
			}//while (true)
		}

	public:
		wstring_t m_sourceText;
		rulesSet_t m_rulesSet;
		size_t m_sourceTextPos; // Current parsing position starting from 0, but at error time it's +1 already.

		apparser_t() : m_sourceTextPos(0)
		{
		}

		void doparse() throw(...)
		{
			m_sourceTextPos = 0;
			m_rulesSet.m_ruleEntries.clear();

			parse_start();

			atltrace::text("Done");
		}

	}; //class apparser_t

	inline void parse_advpolicy(__in const string_t& advpolicy_, __inout rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_) throw()
	{
		rv_parseError_.m_errorType = parseError::errNone;

		apparser_t apparser;
		apparser.m_sourceText = utf8(advpolicy_);
		try
		{
			apparser.doparse();
		}
		catch(parseError& er_)
		{
			rv_parseError_ = er_;
			rv_parseError_.m_errorPos = apparser.m_sourceTextPos;

			atltrace::error(wformat(L"parse error: %hs", er_.what()));
		}
		catch(...)
		{
			rv_parseError_.m_errorType = parseError::errUnexpected;
			rv_parseError_.m_errorPos = apparser.m_sourceTextPos;

			atltrace::error("parse error [all]");
		}

		if (rv_parseError_.m_errorType == parseError::errNone)
			rv_rulesSet_ = apparser.m_rulesSet; // TODO: use ref instead of copy
		else
			rv_rulesSet_.m_ruleEntries.clear();
	}

}//namespace advancedpswpolicy

//TOD0: create unit tests: string -> success or failure ID.
//TODO: define shorthand for spesials, but what is common specials?
//TODO: If range is -1,-1 after parsing then set it as 1,1 during verigy/generate.

namespace customRule
{
	using namespace advancedpswpolicy;

	typedef std::vector<const chsetEntry_t*> undef_chsetEntries_t; /* Pointer to undefined character set entries */

	inline void getBoundsRecursively(__in const ruleEntries_t& rulesEntries_, __out undef_chsetEntries_t& undefchSetEntries_, __inout int& entriesMinTotal_, __inout int& entriesMaxTotal_)
	{
		for (ruleEntries_t::const_iterator it = rulesEntries_.begin(); it != rulesEntries_.end(); ++it)
		{
			const ruleEntry_t& ruleEntry = *it;

			if (ruleEntry.m_isgroup)
			{
				getBoundsRecursively(ruleEntry.m_groupEntry.m_ruleEntries, undefchSetEntries_, entriesMinTotal_, entriesMaxTotal_);
			}
			else
			{
				const int& minRange = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
				const int& maxRange = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;

				// We have min and max range set -1 if the pattern has placeholders.
				// In that case, we have to set the range to 1 only.
				if (minRange == -1 && maxRange == -1)
				{
					entriesMinTotal_++;
					entriesMaxTotal_++;

					continue;
				}

				if (minRange > 0)
				{
					entriesMinTotal_ += minRange;
				}

				if (maxRange > 0)
				{
					entriesMaxTotal_ += maxRange;
				}
				else
				if (maxRange == -2)
				{
					// Add to the list of undefined rule entries.
					// If we are here then the max range is not set for the current entry.
					//
					entriesMaxTotal_ += minRange; // Add min range to max total (at least).
					undefchSetEntries_.push_back(&ruleEntry.m_chsetEntry);
				}
			} // 
		}//for
	}

	inline void checkRulesBoundsForGenerate(__in const rulesSet_t& rulesSet_, __inout bool& rv_minValid_, __inout bool& rv_maxValid_) throw()
	{
		// Initialize return values with the assumption that the min and max values are valid.

		rv_minValid_ = true;
		rv_maxValid_ = true;

		// 0. To get min and max bounds.

		int min, max;
		min = max = 0;
		undef_chsetEntries_t undefinedChSetEntries; // Rule entries without any max bound value.

		getBoundsRecursively(rulesSet_.m_ruleEntries, undefinedChSetEntries, min, max);

		if (min < rulesSet_.m_pswlenSet.m_min)
		{
			// Determine whether there are any Rule entries without max value to accommodate missing places.
			//
			int maxCharactersAvailable = min;
			for (undef_chsetEntries_t::iterator it = undefinedChSetEntries.begin(); it != undefinedChSetEntries.end(); ++it)
			{
				if (*it == 0)
				{
					// Invalid pointer.
					continue;
				}

				const chsetEntry_t& currentChEntry =  *(*it);

				maxCharactersAvailable += (int)currentChEntry.m_charset.length();
			}

			rv_minValid_ = maxCharactersAvailable > rulesSet_.m_pswlenSet.m_min;
		}
		else
		if (min > rulesSet_.m_pswlenSet.m_max)
		{
			rv_minValid_ = false;
		}

		if (max < rulesSet_.m_pswlenSet.m_min)
		{
			// Determine whether there are any Rule entries without max value to accommodate missing places.
			//
			int maxCharactersAvailable = max;
			for (undef_chsetEntries_t::iterator it = undefinedChSetEntries.begin(); it != undefinedChSetEntries.end(); ++it)
			{
				if (*it == 0)
				{
					// Invalid pointer.
					continue;
				}

				const chsetEntry_t& currentChEntry =  *(*it);

				maxCharactersAvailable += (int)currentChEntry.m_charset.length();
			}

			rv_maxValid_ = maxCharactersAvailable > rulesSet_.m_pswlenSet.m_min;
		}

		if (max > rulesSet_.m_pswlenSet.m_max)
		{
			rv_maxValid_ = false;
		}

	}

	struct chsetData_t
	{
		const chsetEntry_t* m_pChsetEntry = nullptr;
		bool m_isgenerated = false;
		size_t m_min = -1;
		size_t m_max = -1;
		size_t m_generatedLen = -1;

		chsetData_t() {}
		chsetData_t(const chsetEntry_t* pChsetEntry_, int min_, int max_)
			: m_pChsetEntry(pChsetEntry_), m_min(min_), m_max(max_) {}

		bool generateLength() throw(...)
		{
			if (m_isgenerated)
			{
				return m_isgenerated;
			}

			if (!m_pChsetEntry)
			{
				throw std::runtime_error("chsetEntry_t is null.");
			}

			if (m_min == -1 && m_max == -1)
			{
				m_min = m_max = 1;
			}

			if (m_max == -2)
			{
				return false;
			}

			m_generatedLen = password::utils::getRandomInRange(m_min, m_max);
			m_isgenerated = m_generatedLen >= m_min && m_generatedLen <= m_max;

			return m_isgenerated;
		}

		wstring_t generateValue(__in const wstring_t& excludeChars_) throw(...)  /* To generate unique values */
		{
			if (!m_pChsetEntry)
			{
				throw std::runtime_error("chsetEntry_t is null.");
			}

			if (m_generatedLen <=0 )
			{
				throw std::runtime_error("Invalid length.");
			}

			wstring_t generatedValue;
			password::utils::genSubSet((*m_pChsetEntry).m_charset, excludeChars_, m_generatedLen, generatedValue);

			return generatedValue;
		}
	};

	typedef std::map<const chsetEntry_t*, chsetData_t*> chsetEntriesHolder_t;
	typedef std::list<chsetData_t> chsetEntries_t;

	inline void findCharsetEntryHolder(const wchar_t& wchar_, __in const chsetEntriesHolder_t& chSetEntriesHolder_, const ruleEntries_t& ruleEntries_, chsetEntriesHolder_t::const_iterator& itchsetEntry_)
	{
		// Find which character set the current character belongs.
		// 
		for (const advancedpswpolicy::ruleEntry_t& curRuleEntry : ruleEntries_)
		{
			if (curRuleEntry.m_isgroup)
			{
				findCharsetEntryHolder(wchar_, __in chSetEntriesHolder_, curRuleEntry.m_groupEntry.m_ruleEntries, itchsetEntry_);
			}

			if (curRuleEntry.m_chsetEntry.m_charset.find(wchar_) == wstring_t::npos)
			{
				// Skip current character set entry if character is not found.
				continue;
			}

			// Find corresponding entry in the character set entries holder.
			itchsetEntry_ = chSetEntriesHolder_.find(&curRuleEntry.m_chsetEntry);
			break;
		} // for
	}

	inline void generatePasswordByRuleRecursively(__in const ruleEntries_t& ruleEntries_, __in const chsetEntriesHolder_t& chSetEntriesHolder_,
		__in bool noduplicates_,
		__in bool avoidConsecutiveChars_,
		__in const wstring_t& excludeChars_,
		__inout wstring_t& rv_password_) throw(...)
	{
		// 0. To generate password as per custom rule specified.

		for (ruleEntries_t::const_iterator it = ruleEntries_.begin(); it != ruleEntries_.end(); ++it)
		{
			atltrace::scope_t scope(__FUNCTION__);

			const ruleEntry_t& ruleEntry = *it;

			if (ruleEntry.m_isgroup)
			{
				wstring_t pswOutOfGroup;
				generatePasswordByRuleRecursively(ruleEntry.m_groupEntry.m_ruleEntries, chSetEntriesHolder_, noduplicates_, avoidConsecutiveChars_, excludeChars_, pswOutOfGroup);

				if (ruleEntry.m_groupEntry.m_mix)
				{
					password::utils::randomizeCharsInString(pswOutOfGroup);
				}

				rv_password_ += pswOutOfGroup; //atltrace::text(L"(group) psw = '%s'\n", rv_password_);

				if (avoidConsecutiveChars_)
				{
					wchar_t prevCh = '\0';
					for (wstring_t::iterator itChar = rv_password_.begin(); itChar != rv_password_.end(); ++itChar)
					{
						if (prevCh == *itChar)
						{
							chsetEntriesHolder_t::const_iterator itchsetEntry = chSetEntriesHolder_.end();

							findCharsetEntryHolder(*itChar, chSetEntriesHolder_, ruleEntry.m_groupEntry.m_ruleEntries, itchsetEntry);

							//if (itchsetEntry == chSetEntriesHolder_.end())
							//{
							//	throw std::runtime_error("NO.chsetEntry_t.1");
							//}

							if (itchsetEntry != chSetEntriesHolder_.end())
							{
								chsetData_t* pchsetData = (*itchsetEntry).second;
								if (pchsetData == nullptr)
								{
									throw std::runtime_error("NO.chsetEntry_t.2");
								}

								wstring_t excludeChars(1, prevCh);
								if ((itChar + 1) != rv_password_.end())
								{
									excludeChars += *(itChar + 1);
								}

								if (!excludeChars_.empty())
								{
									excludeChars += excludeChars_;
								}

								wstring_t generatedValue;
								password::utils::genSubSet(pchsetData->m_pChsetEntry->m_charset, excludeChars, 1, generatedValue);
								*itChar = generatedValue.empty() ? *itChar : generatedValue[0];
							}
						}

						prevCh = *itChar;
					}
				}
			}
			else
			{
				chsetEntriesHolder_t::const_iterator itchsetEntry = chSetEntriesHolder_.find(&ruleEntry.m_chsetEntry);
				if (itchsetEntry == chSetEntriesHolder_.end())
				{
					throw std::runtime_error("NO.chsetEntry_t.1");
				}

				chsetData_t* pchsetData = (*itchsetEntry).second;
				if (pchsetData == nullptr)
				{
					throw std::runtime_error("NO.chsetEntry_t.2");
				}

				wstring_t excludeChars = noduplicates_ ? rv_password_ : wstring_t();
				if (!excludeChars_.empty())
				{
					excludeChars += excludeChars_;
				}

				if (pchsetData->m_generatedLen > 0) { // SM: Fix for Bug 88016:PMAT password change create/edit regex pw gen returns rule error only some fraction on uses
					rv_password_ += pchsetData->generateValue(excludeChars);
				}

				if (avoidConsecutiveChars_)
				{
					wchar_t prevCh = '\0';
					for (wstring_t::iterator itChar = rv_password_.begin(); itChar != rv_password_.end(); ++itChar)
					{
						if (prevCh == *itChar)
						{
							wstring_t excludeChars(1, prevCh);
							if ( (itChar + 1) != rv_password_.end())
							{
								excludeChars += *(itChar+1);
							}

							if (!excludeChars_.empty())
							{
								excludeChars += excludeChars_;
							}

							wstring_t generatedValue;
							password::utils::genSubSet(pchsetData->m_pChsetEntry->m_charset, excludeChars, 1, generatedValue);
							*itChar = generatedValue.empty() ? *itChar : generatedValue[0];
						}

						prevCh = *itChar;

					} // for
				}
			}

		}//for

	}

	inline void generateForChSetEntriesHolderRecursively(__in const ruleEntries_t& ruleEntries_, __inout chsetEntriesHolder_t& chSetEntriesHolder_, 
		__inout chsetEntries_t& chsetEntries_generated_, 
		__inout chsetEntries_t& chsetEntries_togenerate_,
		__inout int& pswLenGenerated_, __inout int& pswLenFixedCount_) throw(...)
	{
		// 0. To generate password (only for one's with known range: min, max) as per custom rule specified.

		for (ruleEntries_t::const_iterator it = ruleEntries_.begin(); it != ruleEntries_.end(); ++it)
		{
			const ruleEntry_t& ruleEntry = *it;

			if (ruleEntry.m_isgroup)
			{
				generateForChSetEntriesHolderRecursively(ruleEntry.m_groupEntry.m_ruleEntries, chSetEntriesHolder_, 
					chsetEntries_generated_, chsetEntries_togenerate_, pswLenGenerated_, pswLenFixedCount_);
			}
			else
			{
				chsetData_t chsetData(
					&ruleEntry.m_chsetEntry, 
					ruleEntry.m_chsetEntry.m_rangeEntry.m_min, 
					ruleEntry.m_chsetEntry.m_rangeEntry.m_max);

				if (chsetData.generateLength())
				{
					chsetData_t& chsetDataSaved = *chsetEntries_generated_.insert(chsetEntries_generated_.end(), chsetData);
					chSetEntriesHolder_[&ruleEntry.m_chsetEntry] = &chsetDataSaved;

					pswLenGenerated_ += (int)chsetDataSaved.m_generatedLen;
				}
				else
				{
					chsetData_t& chsetDataToGenerate = *chsetEntries_togenerate_.insert(chsetEntries_togenerate_.end(), chsetData);
					chSetEntriesHolder_[&ruleEntry.m_chsetEntry] = &chsetDataToGenerate;

					pswLenFixedCount_ += (int)chsetDataToGenerate.m_min;
				}
			}

		}//for

	}

	inline bool verifyPasswordAgainstRuleRecursively(__in const ruleEntries_t& ruleEntries_, __in wstring_t& password_, __in bool mix_ = false)
	{
		// 0. To verify password if conforming to custom rule.

		bool rv = true;

		for (ruleEntries_t::const_iterator it = ruleEntries_.begin(); it != ruleEntries_.end(); ++it)
		{
			const ruleEntry_t& ruleEntry = *it;

			if (ruleEntry.m_isgroup)
			{
				rv = verifyPasswordAgainstRuleRecursively(ruleEntry.m_groupEntry.m_ruleEntries, password_, ruleEntry.m_groupEntry.m_mix);
				if (!rv)
				{
					break; // Break the loop if verification failed.
				}
			}
			else
			{
				int cur_passwordlength = (int)password_.length();

				int min = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
				int max = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;
				
				if (min == max && max == -1)
				{
					min = max = 1;
				}

				if (max == -2 )
				{
					max = cur_passwordlength;
				}

				int countCharsFound = 0;

				int index = 0;
				for (; index < cur_passwordlength && index < max; index++)
				{
					wstring_t::size_type pos = wstring_t::npos;

					if (!mix_)
					{
						wchar_t currentCH = password_[index];
						pos = ruleEntry.m_chsetEntry.m_charset.find(currentCH);
					}
					else
					{
						pos = password_.find_first_of(ruleEntry.m_chsetEntry.m_charset);
						if (pos != wstring_t::npos)
						{
							password_.replace(pos, 1, L"");
						}
					}

					if (pos != wstring_t::npos)
					{
						countCharsFound++;

						// A small optimization: To stop loop if we found more characters than expected.
						//
						if (countCharsFound > max)
						{
							break;
						}
					}

					if (!mix_ && pos == wstring_t::npos)
					{
						break;
					}
				}//for

				if (!mix_ && index > 0)
				{
					password_.replace(0, index, L"");
				}

				// Check whether characters found for current character set is range: min, max.
				//
				if (countCharsFound <  min || countCharsFound > max)
				{
					return false;
				}
			}

		}//for

		return rv;
	}

	inline void parseExtPattern2RulesSet(__in const string_t& pattern_, __out rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_)
	{
		rv_rulesSet_.m_ruleEntries.clear();

		parse_advpolicy(pattern_, rv_rulesSet_, rv_parseError_);
		
		if (rv_parseError_.m_errorType != rv_parseError_.errNone)
		{
			return;
		}

		//resolveRulesSetBounds(rv_rulesSet_);
	}

	////////////////////////////////////////////////////////////////////////////
	inline void parseExtPolicy2RulesSet(__in const password::policy_t& policy_, __out rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_)
	{
		string_t pattern_withMinMaxRange = policy_.GetExtendedPolicyStr() + sformat("<%d, %d>", policy_.GetMinLength(), policy_.GetMaxLength());

		parseExtPattern2RulesSet(pattern_withMinMaxRange, rv_rulesSet_, rv_parseError_);
	}

	inline bool verifyPasswordAgainstRuleNoThrow(__in const rulesSet_t& rulesSet_, __in const wstring_t& previousPassword_, __in const wstring_t& password_, __in bool noduplicates_) throw()
	{
		// Password is invalid if empty.
		if (password_.empty())
		{
			return false;
		}

		// Check length of the password is within min, max bounds.
		int pswLen = size2int(password_.length());
		if ((rulesSet_.m_pswlenSet.m_min != 0 && rulesSet_.m_pswlenSet.m_min > pswLen) || (rulesSet_.m_pswlenSet.m_max != 0 && rulesSet_.m_pswlenSet.m_max < pswLen))
		{
			return false;
		}

		// Check password has duplicates if specified.
		if (noduplicates_ && password::utils::hasDuplicateChars(password_))
		{
			return false;
		}

		if (rulesSet_.m_checkPrevPasswordCharPosition && 
			!previousPassword_.empty())
		{
			wstring_t::size_type maxLength = min(previousPassword_.length(), password_.length());
			for (wstring_t::size_type index = 0; index < maxLength; index++)
			{
				bool isSameCharAtSamePosition = previousPassword_[index] == password_[index];
				if (isSameCharAtSamePosition) /* Current & previous password have same character at the same position */
				{
					return false;
				}
			} // for
		}

		if (rulesSet_.m_avoidConsecutiveChars)
		{
			wchar_t prevChar = '\0';
			for (wstring_t::const_iterator it = password_.begin(); it != password_.end(); ++it)
			{
				bool isSameCharAsPreviousOne = (prevChar == *it);
				if (isSameCharAsPreviousOne) /* Current & previous character are repeated and hence invalid */
				{
					return false;
				}

				prevChar = *it;
			} // for
		}

		// Check password against custom rule.
		wstring_t password = password_;
		bool rv = verifyPasswordAgainstRuleRecursively(rulesSet_.m_ruleEntries, password, false);
		if (rv)
		{
			rv = password.length() == 0; // No characters should be left in the password if verified completely.
		}

		return rv;
	}

	inline bool sort_ascendingByCharSetLength(const chsetData_t& first, const chsetData_t& second)
	{
		bool isLowerCharSetLength = first.m_pChsetEntry->m_charset.length() < second.m_pChsetEntry->m_charset.length();
		return isLowerCharSetLength ? true : false;
	}

	inline void generatePasswordByRuleNoThrow(__in const rulesSet_t& rulesSet_, __in bool noduplicates_, __in const wstring_t& prevPassword_, __out wstring_t& rv_password_) throw()
	{
		rv_password_.clear();

		try
		{
			chsetEntriesHolder_t chsetEntriesHolder;
			chsetEntries_t chsetEntries_generated;
			chsetEntries_t chsetEntries_togenerate;

			int totalLengthGenerated = 0;
			int minLengthToGenerate = 0;

			generateForChSetEntriesHolderRecursively(
                rulesSet_.m_ruleEntries, 
                chsetEntriesHolder, 
                chsetEntries_generated, 
                chsetEntries_togenerate, 
                totalLengthGenerated, 
                minLengthToGenerate
            );

			// Sort ruleEntries whose max is undefined 
			// in ascending order of their character set length.
			//
			chsetEntries_togenerate.sort(sort_ascendingByCharSetLength);

			size_t entriesCount = chsetEntries_togenerate.size();
			if (entriesCount > 0)
			{	
				for (chsetEntries_t::iterator it = chsetEntries_togenerate.begin(); it != chsetEntries_togenerate.end(); ++it)
				{
					size_t maxAvbl = 
                        (size_t)floor((double)(rulesSet_.m_pswlenSet.m_max - totalLengthGenerated)
                            /  (double) (entriesCount > 0 ? entriesCount : 1) );

					chsetData_t& chsetData = (*it);

					if (chsetData.m_isgenerated) 
					{
						// Skip entries if already generated.

						continue;
					}

					if (maxAvbl <= 0) /* No more extra characters available so set minimum length */
					{
						chsetData.m_max = chsetData.m_min;
					}
					else
					{
						int isLastEntry = std::distance(it, chsetEntries_togenerate.end()) == 1;
						if (isLastEntry)
						{
							size_t moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

							// We have rule entries for whom password has to be generated.
							//
							if (totalLengthGenerated < rulesSet_.m_pswlenSet.m_min)
							{
								moreLengthToGenerate = rulesSet_.m_pswlenSet.m_min - totalLengthGenerated;
								size_t minimumLenToSatisfyRange = max(moreLengthToGenerate, chsetData.m_min);
								chsetData.m_min = min(minimumLenToSatisfyRange, chsetData.m_pChsetEntry->m_charset.length());
							}
						}

						chsetData.m_max = max(chsetData.m_min, min(size_t(maxAvbl), chsetData.m_pChsetEntry->m_charset.length()));

						if (isLastEntry && chsetData.m_max > size_t(rulesSet_.m_pswlenSet.m_max - totalLengthGenerated))
						{
							chsetData.m_max = rulesSet_.m_pswlenSet.m_max - totalLengthGenerated;
						}
					}

					if (chsetData.generateLength())
					{
						totalLengthGenerated += (int)chsetData.m_generatedLen;

						entriesCount--; 
					}
				} // for
			}

			wstring_t excludeChars;
			if (rulesSet_.m_checkPrevPasswordCharPosition) /* Check previous password character by character if requested */
			{
				excludeChars = prevPassword_;
			}

			generatePasswordByRuleRecursively(rulesSet_.m_ruleEntries, chsetEntriesHolder, noduplicates_, rulesSet_.m_avoidConsecutiveChars, excludeChars, rv_password_);

		}
		catch(...)
		{
			rv_password_.clear();
		}

	}
}//namespace customRule



