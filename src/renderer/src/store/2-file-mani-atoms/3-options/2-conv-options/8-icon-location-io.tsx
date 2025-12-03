/*
		inline void set_iconlocation(const long v_quadrant_, const int iconXloc_, const int iconYloc_, wstring_t& rv_iconlocation_)
		{
			//Initialize return value.
			rv_iconlocation_.clear();

			//Check if we have valid quadrant values (Quad 0 , quad 1, quad 2, quad 3 i.e. 1 to 4).
			//Note: We ignore "None" i.e. 0.
			if (v_quadrant_ < 1 || v_quadrant_ > 4)
				return;

			//Note: We need to subtract 1 to match with external quadrant values (Quad 1 to 4 equivalent 0 to 3).
			rv_iconlocation_ += wformat(L"Q:%d:%d:%d", v_quadrant_ - 1, iconXloc_, iconYloc_);
		}

		//Get icon location details from the input string.
		//Returns success/failure of the operation (true/false).
		inline bool get_iconlocation(const wstring_t& v_iconloc_, long& rv_quandrant_, int& rv_xcoordinate_, int& rv_ycoordinate_)
		{
			//Initialize return values.
			rv_quandrant_ = 0; //Default is None (No quadrant specified).
			rv_xcoordinate_ = rv_ycoordinate_ = 0; //Default co-ordinates (x:y).

			//Check if input parameter is valid.
			if (v_iconloc_.empty())
				return false;

			//Extract icon location details
			wstrings_t iconlocdetails;
			strings::split(v_iconloc_, wstring_t(L":"), iconlocdetails);
			
			//Check if input location format is valid.
			//Expected format: Q:<quad>:x:y.
			if (iconlocdetails.size() != 4)
				return false;

			//Update return values and return succeeded status.
			//Note: Add 1 to the input location (quadrant) to match with our internal list (None,quad 0,quad 1,quad 2,quad 3) etc.
			rv_quandrant_ = wstrings::conv_int(iconlocdetails[1]) + 1;
			rv_xcoordinate_ = wstrings::conv_int(iconlocdetails[2]);
			rv_ycoordinate_ = wstrings::conv_int(iconlocdetails[3]);

			return true;
		}
*/