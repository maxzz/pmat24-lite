// Order is important to keep the same order as in manifest. see oti_manifest_io.h

```js
    out_begin(os, "<field");
        out(os, "displayname", field_.displayname);
        out(os, "type", internal_io::mapping::MAP_FIELD_TYPE::cast(field_.type));
        out(os, "dbname", field_.dbname);
        out(os, "path", oldPath_);
        out(os, "path_ext", field_.path);

        out(os, "policy", policyOld);
        out(os, "policy2", policyExt);
        out(os, "options", customRuleOptions);

        out(os, "value", textchars::low::remove_illegal(field_.value.memvalue));
        out(os, "choosevalue", textchars::low::remove_illegal(field_.value.choosevalue));

        out(os, "rfield", internal_io::mapping::MAP_RDIRECTION_TYPE::cast(field_.rdir));
        out(os, "rfieldform", internal_io::mapping::MAP_FORMNAME_TYPE::cast(field_.rfield.rmemid.form));
        out(os, "rfieldindex", internal_io::mapping::MAP_NUMBER_TYPE::cast(field_.rfield.rindex));

        out(os, "askalways", field_.value.askalways77);
        out(os, "onetvalue", field_.value.onetvalue77);
        out(os, "password", field_.password);
        out(os, "submit", field_.controltosubmitdata);
        out(os, "useit", field_.useit);

        out(os, "accid", strings::conv_int(field_.ids.accid));
    out_end(os);
```

```js
    out_begin(os, "<detection");
        out(os, "caption", temp.caption);
        out(os, "variablecaption", temp.variablecaption);
        if (!detection_.web.ourliscopy)			// Save only original value
        out(os, "web_ourl", detection_.web.ourl);
        out(os, "web_murl", detection_.web.murl);
        out(os, "web_qurl", detection_.web.qurl);
        out(os, "web_checkurl", detection_.web.checkurl);
        out(os, "dlg_tab", detection_.dlg.tab);
        out(os, "dlg_class", detection_.dlg.classname);
        out(os, "dlg_checkexe", detection_.dlg.matchprocessname);
        out(os, "emu_pattern", detection_.emu.pattern);
        out(os, "names", textchars::low::remove_illegal(oldnames_));
        out(os, "names_ext", textchars::low::remove_illegal(detection_.names));
        out(os, "monitor", detection_.monitor);
        out(os, "processname", textchars::low::remove_illegal(detection_.processname));
        out(os, "commandline", textchars::low::remove_illegal(detection_.commandline));
    out_end(os);
```

```js
    out_begin(os, "<options");
        out(os, "choosename", options_.choosename);
        out(os, "sidekick", options_.sidekick);
        out(os, "ownernote", options_.ownernote);
        out(os, "quicklink", options_.qlmenuname);
        out(os, "auth_pl", options_.auth_pl);
        if (options_.baloon_counter != manifest::DEFAULTS::balloon_counter_defvalue)
        out(os, "balooncount", strings::conv_int(options_.baloon_counter));
        out(os, "autoprompt", options_.auto_prompt);
        out(os, "lockfields", options_.lock_fields);
        out(os, "submittype", internal_io::mapping::submittype_type::cast(options_.submittype));
        out(os, "iconkey", options_.iconkey);
        out(os, "iconlocation", options_.iconlocation);
        out(os, "usequicklink", internal_io::mapping::usequicklinktype_type::cast(options_.useQuickLink));
        out(os, "recheckwindowafterfillin", options_.recheckwindowafterfillin);
        out(os, "qlwocred", options_.qlwocred);
        if (!options_.unknownattributes.empty())
        os << options_.unknownattributes;
    out_end(os);
```

```js
    void save_fcontext(__inout std::ostream& os, __in const manifest::fcontext_t& fcontext_)
    {
        if (fcontext_.blank() || (fcontext_.formtype == manifest::FORMTYPE::signon && fcontext_.name == manifest::FORMNAME::signon))
            return;

        out_begin(os, "<fcontext");
            out(os, "type", internal_io::mapping::MAP_FORMTYPE_TYPE::cast(fcontext_.formtype));
            out(os, "name", internal_io::mapping::MAP_FORMNAME_TYPE::cast(fcontext_.name));
            out(os, "parent", internal_io::mapping::MAP_FORMNAME_TYPE::cast(fcontext_.parent));
        out_end(os);
    }
```

```js
    out_begin(os, "<form>");
        save_fcontext(os, form_.fcontext);
        save_detection(os, form_.detection, string_t());
        save_options(os, form_.options);
        save_fields(os, form_.fields);
    out_end(os, "</form>");
```

```js
    out_begin(os, "<descriptor");
        out(os, "id", descriptor_.id);
        out(os, "created", descriptor_.created);
        out(os, "modified", descriptor_.modified);
        out(os, "integrity", descriptor_.integrity);
        out(os, "integrity_ext", newintegrity_);
        out(os, "source", descriptor_.source);
        out(os, "size", descriptor_.size);
        out(os, "storage_id", descriptor_.storage_id);
        out(os, "version", version_);
    out_end(os);
```

```js
    os << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    os << "<manifest>\n";

    inc_level();
        save_descriptor(os, mainfest_.descriptor, string_t(), mainfest_.descriptor.version);
        save_forms(os, mainfest_.forms);
    dec_level();

    os << "</manifest>\n";
```
