//#include "ots_pattern_pwd.h"
//
#pragma once

#include "ots_password_policy.h"
//
namespace patternpsw
{
	namespace impl
	{
		inline int FindFirstUnescapedChar(__in const string_t& v_, __in const char searchChar_)
		{
			int rv = -1;
			for (string_t::const_iterator it = v_.begin(); it != v_.end(); ++it)
			{
				const char& chCur = *it;
				if(chCur == '\\') continue; // Next char is escaped, so skip it.
				
				if (chCur == searchChar_)
				{
					rv = (int)std::distance(v_.begin(), it);
					break;
				}
			}

			return rv;
		} // FindFirstUnescapedChar()

		/////////////////////////////////////////////////////////////////////////////
		//
		const string_t LowerCase = "abcdefghijklmnopqrstuvwxyz";
		const string_t UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const string_t Digits    = "0123456789";
		//

		class charset_t		// To hold each character set with bounds and group count (if any).
		{
			void clear()
			{
				m_lowerbound = 0;
				m_upperbound = 0;
				m_groupcount = 0;

			} // clear()
		public:
			string_t m_characters;
			int      m_lowerbound;
			int      m_upperbound;
			int      m_groupcount;

			string_t m_value;

			charset_t() 
			{
				clear();
			}

			string_t generate()	const // To generate once and reuse later.
			{
				int upperbound = m_upperbound;
				if (upperbound == 0)
				{
					upperbound = m_characters.length();
				}

				size_t finalPswLength = m_lowerbound + password::utils::getRandom(upperbound - m_lowerbound);

				string_t rv;
				string_t charset = m_characters;
				for (size_t i = 0; i < finalPswLength; i++)
				{
					rv += password::utils::genCharBySet<string_t, char>(charset, '\0');
				}

				return rv;

			} // generate()

		}; // class charset_t

		typedef std::map<string_t, charset_t, strings::lessstring_t> positions_t;

		//
		// To extract lower and upper bounds from format: {x, y}.
		//
		// Return value specify whether succeeded in parsing or not.
		inline bool extractbounds(__in const string_t& v_, __out int& lowerbound_, __out int& upperbound_)
		{
			lowerbound_ = 0;
			upperbound_ = 0;

			if (v_.empty())
			{
				return false;
			}

			string_t v = v_;

			int comma_pos = FindFirstUnescapedChar(v_, ',');
			if (comma_pos == -1)
			{
				v = strings::trim(v_);

				int bound = strings::conv_int(v);

				if (bound == 0)
				{
					return false;
				}

				lowerbound_ = upperbound_ = bound;

				return true;
			} // if

			string_t lower, upper;
			bool islowerchecked = false;
			for (string_t::const_iterator it = v_.begin(); it != v_.end(); ++it)
			{
				const char& currentCH = *it;

				if (currentCH == ',')
				{
					islowerchecked = true;
					continue;
				}

				if (!islowerchecked)
				{
					lower += currentCH;
				}
				else
				{
					upper += currentCH;
				}

			} // for

			int lowerbound = strings::conv_int(strings::trim(lower));
			int upperbound = strings::conv_int(strings::trim(upper));

			if ( (!lowerbound && !upperbound) || (lowerbound > upperbound && upperbound > 0) )
			{
				return false;
			}

			lowerbound_ = lowerbound;
			upperbound_ = upperbound;

			return true;
		} // extractbounds()

		typedef std::list<charset_t>  charsets_t;	// Ordered sequence of character set per position.
		typedef std::list<charsets_t> groups_t;		// Ordered sequence of group of character sets.

		inline void updateCharSetsnGroups(__inout string_t& charset_, __inout int& lowerbound_, __inout int& upperbound_, 
			                              __inout charsets_t& rv_charsets_, int groupcount_, __inout groups_t& rv_groups_) throw()
		{
			if (!charset_.empty())
			{
				charset_t newcharset;
				newcharset.m_characters = charset_;
				newcharset.m_lowerbound = lowerbound_;
				newcharset.m_upperbound = upperbound_;

				rv_charsets_.push_back(newcharset);

				charset_.clear();
				lowerbound_ = 0;
				upperbound_ = 0;
			}

			if (rv_charsets_.empty() || groupcount_ > 0)
			{
				return;
			}

			rv_groups_.push_back(rv_charsets_);
			rv_charsets_.clear();

		} // updateCharSetsnGroups()

		//
		// Parse pattern string to positions with group, expanded character set and bounds.
		//
		// Returns failed position if parsing failed otherwise contains positions.
		//
		void parse(const string_t& pattern_, __out groups_t& rv_groups_, __out string_t::size_type& pos_)
		{
			bool bParseFailed = false;
			rv_groups_.clear();

			bool bInCharSet = false;
			bool bIsCharSetRange = false;
			bool bIsPlaceHolder = false;
			bool bIsInGroup = false;

			int lowerbound = 0;
			int upperbound = 0;
			int groupcount = 0;
			int index = 0;

			pos_ = string_t::npos;
			string_t currentCharSet;

			charsets_t currentcharsets;

			string_t::const_iterator it = pattern_.begin();
			do
			{
				const char& currentCH = *it;

				switch (currentCH)
				{
					case '\\':
					{
						// Escape sequence is only allowed within character set.
						if (!bInCharSet)
						{
							bParseFailed = true;
							break;
						}

						currentCharSet += currentCH;
					}
					break;
					case ' ':
						{
							// Space is ignored if specified outside a character set.
							if (bInCharSet)
							{
								// Do not skip spaces if within character set i.e. '[a b]'.
								currentCharSet += currentCH;
							}
						}
						break;
					case '(':
					{
						if (bInCharSet)
						{
							// Parenthesis is allowed within a character set.
							currentCharSet += currentCH;
						}
						else
						{
							// Parenthesis outside a character set is considered 
							// as a group token.
							//
							// A group token will radomize position of values within
							// that group.
							updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);

							groupcount++;
						}
					}
					break;
					case ')':
					{
						if (bInCharSet)
						{
							currentCharSet += currentCH;
						}
						else
						{
							// Parenthesis represents a group token.
							//
							if (groupcount <= 0)
							{
								bParseFailed = true;
								break;
							}

							groupcount--;

							updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);
						} // 
					}
					break;
					case '[':
					{
						// Square bracket representing as a new character set.
						// So store previous character set if non-empty.
						if (!bInCharSet)
						{
							// Place the previous charset to positional array.
							updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);
						}
						else
						{
							// We should not be here since it should have been escaped character.
							//
							bParseFailed = true;
							break;
						}

						bInCharSet = true;
						bIsCharSetRange = false;
						bIsPlaceHolder = false;
					}
					break;
					case ']':
					{
						if (!bInCharSet)
						{
							bParseFailed = true;
							break;
						}
						
						bInCharSet = false;
						bIsCharSetRange = false;
						bIsPlaceHolder = false;
					}
					break;
					case '-':
					{
						if (!bInCharSet)
						{
							// Hypen should always be escaped if not represented within a character set.
							//
							bParseFailed = true;
							break;
						}
						
						// Remove previously stored character from the set
						// as it is a range and place the range of characters
						// within the character set string.
						if (!currentCharSet.empty())
						{
							currentCharSet.erase(currentCharSet.end() - 1);
						}

						string_t::const_iterator itprev = it;
						string_t::const_iterator itnext = it;

						// Check the previous character and next character.
						char prevChar = --itprev != pattern_.begin() ? *itprev : '\0';
						char nextChar = ++itnext != pattern_.end() ? *itnext : '\0';

						if ( (prevChar >= 'a' && prevChar <= 'z' &&
							  nextChar >= 'a' && nextChar <= 'z' ) ||
							 (prevChar >= 'A' && prevChar <= 'Z' &&
							  nextChar >= 'A' && nextChar <= 'Z' ) ||
							 (prevChar >= '0' && prevChar <= '9' &&
							  nextChar >= '0' && nextChar <= '9' ) )
						{
							char cur = prevChar; 
							do
							{
								currentCharSet += cur;
							}
							while (++cur <= nextChar);

							it += 1;

							lowerbound = 1;
							upperbound = 1;
						}
						else
						{
							// Illegal sequence specified.
							// Only ranges between: a-z or A-Z or 0-9 are allowed.
							bParseFailed = true;
							break;
						}
					}
					break;
					case '{':
					{
						if (bInCharSet)
						{
							currentCharSet += currentCH;
							continue;
						}
						else
						if (!bIsCharSetRange)
						{
							bIsCharSetRange = true;

							string_t::size_type pos = std::distance(pattern_.begin(), it);
							string_t substr = pattern_.substr(pos + 1); 

							int closebr_pos = FindFirstUnescapedChar(substr, '}');
							if (closebr_pos != -1)
							{
								string_t rangeStr = substr.substr(0, closebr_pos);

								bool isparsed = extractbounds(rangeStr, lowerbound, upperbound);
								if (isparsed)
								{
									// Move iterator beyond the end token of charset range.
									it += rangeStr.length(); /* '{' & '}' */
									continue;
								}
							} //
						}

						// Failure case.
						{
							bParseFailed = true;
							break;
						}
					}
					break;
					case '}':
					{
						if (bInCharSet)
						{
							currentCharSet += currentCH;
							continue;
						}
						else
						if (bIsCharSetRange)
						{
							// Place the previous charset to positional array.
							updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);

						}
						else
						{
							bParseFailed = true;
							break;
						}

						bInCharSet = false;
						bIsCharSetRange = false;
						bIsPlaceHolder = false;
					}
					break;
					case 'a': // Placeholder for lowercase alphabets a-z.
					case 'A': // Placeholder for uppercase alphabets A-Z.
					case 'd': // Placeholder for digits 0-9.
					{
						if (bInCharSet)
						{
							currentCharSet += currentCH;
						}
						else
						{
							// Place the previous charset to positional array.
							if (!currentCharSet.empty())
							{
								updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);
							}

							switch (currentCH)
							{		
								case 'a': currentCharSet += LowerCase; break;
								case 'A': currentCharSet += UpperCase; break;
								case 'd': currentCharSet += Digits; break;
							} // switch()

							lowerbound = upperbound = 1;
							bIsPlaceHolder = true;
						}
					}
					break;
					default:
					{
						if (bInCharSet)
						{
							currentCharSet += currentCH;
						}
						else
						{
							bParseFailed = true;
							break;
						}

					} // default
				} // switch()

			} while (++it != pattern_.end());

			if (bParseFailed)
			{
				pos_ = std::distance(pattern_.begin(), it) + 1;
				return;
			}

			if (groupcount > 0)
			{
				pos_ = pattern_.length();
				return;
			}

			updateCharSetsnGroups(currentCharSet, lowerbound, upperbound, currentcharsets, groupcount, rv_groups_);

		} // parse()

		inline void generate(const positions_t& positions_,__out string_t& rv_)
		{
			atltrace::unnamedscope_t scope(atltrace::ACTIVETYPE::byparent);

			rv_.clear();

			typedef std::list<string_t> valuelist_t;
			valuelist_t values;

			string_t delimiter("\n");

			scope.text("==========================================================");
			scope.text("[group][index]='charset',lower,upper,'generated value'.");
			scope.text("==========================================================");

			for (positions_t::const_iterator it = positions_.begin(); it != positions_.end(); ++it)
			{
				const string_t& index = it->first;
				const charset_t& charset = it->second;

				string_t generated = charset.generate();

				scope.text(L"[%d][%d]='%26hs',%d,%d,'%hs'.", charset.m_groupcount, strings::conv_int(index),
					charset.m_characters.c_str(), charset.m_lowerbound, charset.m_upperbound, generated.c_str());

				// Store as: <count\n'text'> form.
				values.push_back(strings::conv_int(charset.m_groupcount) + string_t(1, '\n') + generated);
			} // for

			string_t grouptext;
			int currentgroupid = -1;
			valuelist_t::iterator itv = values.begin();

			do 
			{
				string_t& currentvalue = *itv;

				strings_t currentvalues;
				strings::split(currentvalue, delimiter, currentvalues);

				if (currentvalues.size() != 2)
				{
					throw std::exception("unexpected.");
				}

				int groupid = strings::conv_int(currentvalues[0]);
				string_t value = currentvalues[1];

				if ( currentgroupid == -1 ) 
				{
					currentgroupid = groupid;
				}

				//
				if (currentgroupid < 0)
				{
					throw std::exception("invalid.group.");
				}
				else
					if (currentgroupid == groupid)
					{
						grouptext += value;

						valuelist_t::iterator itR = itv;
						++itv;

						values.erase(itR);

						if (itv == values.end())
						{

							if (currentgroupid > 0)
							{
								currentgroupid--;

								grouptext = password::utils::randomize<string_t, char>(grouptext);
							}

							string_t newvalue = strings::conv_int(currentgroupid) + string_t(1, '\n') + grouptext;
							values.insert(values.end(), newvalue);

							grouptext.clear();
							currentgroupid = -1;

							if (values.size() == 1)
							{
								break;
							}

							itv = values.begin();
						} // if
					}
					else
					{
						if (currentgroupid > 0)
						{
							currentgroupid--;
							grouptext = password::utils::randomize<string_t, char>(grouptext);
						}

						string_t newvalue = strings::conv_int(currentgroupid) + string_t(1, '\n') + grouptext;
						values.insert(values.begin(), newvalue);

						itv = values.begin();
						if (currentgroupid == 0 && groupid > 0)
						{
							itv++;
						}

						grouptext.clear();
						currentgroupid = -1;

					} //

			} while (itv != values.end());

			for (valuelist_t::const_iterator it = values.begin(); it != values.end(); ++it)
			{
				const string_t& currentvalue = *it;

				strings_t valuelst;
				strings::split(currentvalue, delimiter, valuelst);

				if (valuelst.size() == 2)
				{
					rv_ += valuelst[1];
				}

			} // for

		} // generate()

		inline void generate(const groups_t& groups_,__out string_t& rv_)
		{
			atltrace::unnamedscope_t scope(atltrace::ACTIVETYPE::byparent);

			rv_.clear();

			for (impl::groups_t::const_iterator it = groups_.begin(); it != groups_.end(); ++it)
			{
				const charsets_t& charsets = *it;

				string_t grouptext;
				for (charsets_t::const_iterator itc = charsets.begin(); itc != charsets.end(); ++itc)
				{
					const charset_t& currentcharset = *itc;

					grouptext += currentcharset.generate();
				}

				rv_ += password::utils::randomize<string_t, char>(grouptext);

			} // for

		} // generate()

	} // namespace impl

	inline bool isvalid(const string_t& pattern_, string_t::size_type& pos_)
	{
		bool rv = true;

		pos_ = string_t::npos;

		// Parse pattern string.
		impl::groups_t groups;
		impl::parse(pattern_, groups, pos_);

		return pos_ == string_t::npos;
	} // isvalid()

	inline bool verify(const string_t& pattern_, const string_t& value_)
	{
		bool rv = true;

		// TODO: How to verify input by pattern.
		//
		return rv;
	} // verify()

	inline string_t generate(const string_t& pattern_)
	{
		string_t rv;

		string_t::size_type pos = string_t::npos;

		// Parse pattern string.
		impl::groups_t groups;
		impl::parse(pattern_, groups, pos );

		// Generate value for the string.
		impl::generate(groups, rv);

		return rv;
	} // generate()

} // namespace patternpsw
