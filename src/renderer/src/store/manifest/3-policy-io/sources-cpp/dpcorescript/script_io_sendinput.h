// #include <script_io_sendinput.h>
//
#pragma once

#include <script_io.h>
#include <atl_sendinput++.h>
#include <stack>

namespace sendinput_io
{
	using namespace script_io;

	namespace ritex
	{
		class modifierstoinput_t
		{

			void push_modifier(VK::type_t vk_)
			{
				back_inserter(rv) = rit::prepare::makekeydown(vk_);
				stack.push(vk_);

			} //push_modifier()

			void pop_modifier(VK::type_t vk_)
			{
				back_inserter(rv) = rit::prepare::makekeyup(vk_);
				stack.pop();

			} //pop_modifier()

			std::stack< VK::type_t, std::vector<VK::type_t> > stack;
			rit::inputs_t& rv;
		public:

			modifierstoinput_t(const modifiers::modifiers_t& modifiers_, rit::inputs_t& rv_) :
				rv(rv_)
			{
				if (modifiers_.shift.g) push_modifier(VK::shift);
				if (modifiers_.shift.l) push_modifier(VK::lshift);
				if (modifiers_.shift.r) push_modifier(VK::rshift);

				if (modifiers_.ctrl.g) push_modifier(VK::control);
				if (modifiers_.ctrl.l) push_modifier(VK::lcontrol);
				if (modifiers_.ctrl.r) push_modifier(VK::rcontrol);

				if (modifiers_.alt.g) push_modifier(VK::alt);
				if (modifiers_.alt.l) push_modifier(VK::lalt);
				if (modifiers_.alt.r) push_modifier(VK::ralt);

			} //modifierstoinput_t()

			~modifierstoinput_t()
			{
				while (!stack.empty())
				{
					VK::type_t vk = stack.top();
					pop_modifier(vk);

				} //while

			} //~modifierstoinput_t()

		}; //class modifierstoinput_t

		inline void toinput(const linedata::keys_t& v_, rit::inputs_t& rv_)
		{
			VK::type_t vk = VKNAMES::cast(v_.key);

			if (vk == VK::none)
			{
				for (size_t i = 0; i < v_.repeat; ++i)
				{
					modifierstoinput_t modifiers(v_.modifiers, rv_);
				}
			}
			else
			{
				modifierstoinput_t modifiers(v_.modifiers, rv_);
				rit::prepare::appendkeystroke(vk, v_.repeat, rv_);
			}

		} //toinput()

		inline void toinput(const linedata::pos_t& v_, rit::inputs_t& rv_)
		{
			rit::prepare::mouseevent(point_t(v_.x, v_.y), rit::member::MOUSEACTION::lclick, rv_);

		} //toinput()

		inline void toinput(const linedata::delay_t& v_, rit::inputs_t& rv_)
		{
			back_inserter(rv_) = rit::delay_t(v_.ms);

		} //toinput()

	} //namespace ritex

	inline rit::inputs_t convertlines(const lines_t& v_, bool isWindowUnicode_)
	{
		rit::inputs_t rv;

		for (lines_t::const_iterator it = v_.begin(); it != v_.end(); ++it)
		{
			const script_io::line_t& currentline = *it;

			switch (currentline.action)
			{
				case ACTION::keys:
					{
						linedata::keys_t item;
						item.set(currentline.line);
						ritex::toinput(item, rv);
					}
					break;
				case ACTION::pos:
					{
						linedata::pos_t item;
						item.set(currentline.line);
						ritex::toinput(item, rv);
					}
					break;
				case ACTION::delay:
					{
						linedata::delay_t item;
						item.set(currentline.line);
						ritex::toinput(item, rv);
					}
					break;
				case ACTION::field:
					{
						rit::prepare::shifts::shift_t shiftstate(rv);
						rit::prepare::keystroke_wstring(currentline.line, shiftstate, rit::prepare::usepump, isWindowUnicode_, rv);
					}
					break;
			} //switch

		} //for

		return rv;
	} //convertlines()

} //namespace sendinput_io
