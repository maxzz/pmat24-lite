export namespace customRule2 {
	// using namespace advancedpswpolicy;

	// typedef std::vector<const chsetEntry_t*> undef_chsetEntries_t; /* Pointer to undefined character set entries */

    /** / not yet
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
    /** / not yet

    /** / not yet
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
    /** / not yet

    /** / not yet
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
		} // generate()

		wstring_t generateValue(__in const wstring_t& excludeChars_) throw(...)  // To generate unique values
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
    /** / not yet

	typedef std::map<const chsetEntry_t*, chsetData_t*> chsetEntriesHolder_t;
	typedef std::list<chsetData_t> chsetEntries_t;

    /** / not yet
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
    /** / not yet

    /** / not yet
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
    /** / not yet

    /** / not yet
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
    /** / not yet

    /** / not yet
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
    /** / not yet

    /** / not yet
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
    /** / not yet

    /** / not yet
	////////////////////////////////////////////////////////////////////////////
	inline void parseExtPolicy2RulesSet(__in const password::policy_t& policy_, __out rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_)
	{
		string_t pattern_withMinMaxRange = policy_.GetExtendedPolicyStr() + sformat("<%d, %d>", policy_.GetMinLength(), policy_.GetMaxLength());

		parseExtPattern2RulesSet(pattern_withMinMaxRange, rv_rulesSet_, rv_parseError_);

	} //parseExtPolicy2RulesSet()
    /** / not yet

    /** / not yet
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
				if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
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
				if (isSameCharAsPreviousOne) // Current & previous character are repeated and hence invalid
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
    /** / not yet

    /** / not yet
	inline bool sort_ascendingByCharSetLength(const chsetData_t& first, const chsetData_t& second)
	{
		bool isLowerCharSetLength = first.m_pChsetEntry->m_charset.length() < second.m_pChsetEntry->m_charset.length();
		return isLowerCharSetLength ? true : false;
	}
    /** / not yet

    /** / not yet
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

			generateForChSetEntriesHolderRecursively(rulesSet_.m_ruleEntries, chsetEntriesHolder, chsetEntries_generated, chsetEntries_togenerate, totalLengthGenerated, minLengthToGenerate);

			// Sort ruleEntries whose max is undefined 
			// in ascending order of their character set length.
			//
			chsetEntries_togenerate.sort(sort_ascendingByCharSetLength);

			size_t entriesCount = chsetEntries_togenerate.size();
			if (entriesCount > 0)
			{	
				for (chsetEntries_t::iterator it = chsetEntries_togenerate.begin(); it != chsetEntries_togenerate.end(); ++it)
				{
					size_t maxAvbl = (size_t)floor((double)(rulesSet_.m_pswlenSet.m_max - totalLengthGenerated) / (double) (entriesCount > 0 ? entriesCount : 1) );

					chsetData_t& chsetData = (*it);

					if (chsetData.m_isgenerated) 
					{
						// Skip entries if already generated.

						continue;
					}

					if (maxAvbl <= 0) // No more extra characters available so set minimum length
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
			if (rulesSet_.m_checkPrevPasswordCharPosition) // Check previous password character by character if requested
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
    /** / not yet
    /**/

}//namespace customRule2
