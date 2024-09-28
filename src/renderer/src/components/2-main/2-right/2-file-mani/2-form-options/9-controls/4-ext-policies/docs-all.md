```js
//---------------------------------------------------------------------------
/* 
 AUTHENTICATION POLICIES
 The low-order word specifies the Authentication Tokens enabled in the policy. See Authentication Tokens supported. 
 The high-order word specifies the relationship between Authentication Tokens. See Authentication Token relationships supported. 
*/
/* Authentication Tokens supported */
// #define DP_AUTH_TOKEN_PASSWORD       0x0001 // Password based Authentication Token
// #define DP_AUTH_TOKEN_FINGERPRINT    0x0002 // Fingerprint based Authentication Token
// #define DP_AUTH_TOKEN_SMARTCARD      0x0004 // Smart Card based Authentication Token
// #define DP_AUTH_TOKEN_SPAREKEY       0x0008 // HP Spare Key Authentication Token
// #define DP_AUTH_TOKEN_FACE           0x0010 // Face Recognition Authentication Token
// #define DP_AUTH_TOKEN_CONTACTLESS    0x0020 // Contactless Card based Authentication Token
// #define DP_AUTH_USR_RECOVERY_PWD     0x0040 // Windows user recovery password
// #define DP_AUTH_TOKEN_PIN            0x0080 // PIN Auxiliary Token
// #define DP_AUTH_TOKEN_PROXIMITY      0x0100 // Proximity Card Auxiliary Token
// #define DP_AUTH_TOKEN_BLUETOOTH      0x0200 // Bluetooth Auxiliary Token
// #define DP_AUTH_TOKEN_PALM           0x0400 // Palm based Authentication Token
// #define DP_AUTH_TOKEN_OTP            0x0800 // One Time Password based Authentication Token #define DP_AUTH_TOKEN_RSA DP_AUTH_TOKEN_OTP // OTP, RSA implementation
// #define DP_AUTH_TOKEN_VIRT_SMARTCARD 0x1000 // Virtual Smart Card (TPM) based Authentication Token
// #define DP_AUTH_TOKEN_WIA            0x2000 // Windows Integrated Authentication (WIA) Authentication Token
// #define DP_AUTH_TOKEN_MAIL           0x4000 // E-Mail Authentication Token
// #define DP_AUTH_TOKEN_U2F            0x8000 // U2F Token
/* 
 Authentication Tokens Relationships
*/
// #define DP_AUTH_RULE_OR     0x0  // Authentication rule is OR
// #define DP_AUTH_RULE_AND    0x1  // Authentication rule is AND
```
```js
//---------------------------------------------------------------------------

// tokens.push_back(SToken(IDI_ICON_PASSWORD,    rstring(IDS_PASSWORD_TOKEN).c_str(),          DP_AUTH_TOKEN_PASSWORD));
// tokens.push_back(SToken(IDI_ICON_FINGERPRINT, rstring(IDS_FINGERPRINTS_TOKEN).c_str(),      DP_AUTH_TOKEN_FINGERPRINT));
// tokens.push_back(SToken(IDI_ICON_SMARTCARD,   rstring(IDS_SMARTCARD_TOKEN).c_str(),         DP_AUTH_TOKEN_SMARTCARD));
// tokens.push_back(SToken(IDI_ICON_CONTACTLESS, rstring(IDS_CONTACTLESSCARD_TOKEN).c_str(),   DP_AUTH_TOKEN_CONTACTLESS));
// tokens.push_back(SToken(IDI_ICON_PIN,         rstring(IDS_PIN_TOKEN).c_str(),               DP_AUTH_TOKEN_PIN));
// tokens.push_back(SToken(IDI_ICON_OTP,         rstring(IDS_OTP_TOKEN).c_str(),               DP_AUTH_TOKEN_OTP));
// tokens.push_back(SToken(IDI_ICON_PROXIMITY,   rstring(IDS_PROXIMITYCARD_TOKEN).c_str(),     DP_AUTH_TOKEN_PROXIMITY));
// tokens.push_back(SToken(IDI_ICON_FIDOKEY,     rstring(IDS_FIDOKEY_TOKEN).c_str(),           DP_AUTH_TOKEN_U2F));
// tokens.push_back(SToken(IDI_ICON_BLUETOOTH,   rstring(IDS_BLUETOOTH_TOKEN).c_str(),         DP_AUTH_TOKEN_BLUETOOTH));
// tokens.push_back(SToken(IDI_ICON_FACE,        rstring(IDS_FACE_TOKEN).c_str(),              DP_AUTH_TOKEN_FACE));
```
```js
//---------------------------------------------------------------------------

// IDS_PASSWORD_TOKEN           "Password"
// IDS_FINGERPRINTS_TOKEN       "Fingerprints"
// IDS_SMARTCARD_TOKEN          "PKI Smart card"
// IDS_CONTACTLESSCARD_TOKEN    "Contactless Writable card"
// IDS_PIN_TOKEN                "PIN"
// IDS_OTP_TOKEN                "One-Time Password"
// IDS_PROXIMITYCARD_TOKEN      "Contactless ID card"
// IDS_FIDOKEY_TOKEN            "FIDO Key"
// IDS_BLUETOOTH_TOKEN          "Bluetooth"
// IDS_FACE_TOKEN               "Face"
```
```js
//---------------------------------------------------------------------------

// IDI_PASSWORDMANAGER   ICON   "Res\\Digital Persona PM Icon.ico"
// IDI_DLLMAIN32         ICON   "Res\\Digital Persona Icon.ico"
// IDI_ICON_BLUETOOTH    ICON   "Res\\Bluetooth.ico"
// IDI_ICON_CONTACTLESS  ICON   "Res\\CONTACTLESS.ico"
// IDI_ICON_FACE         ICON   "Res\\Face.ico"
// IDI_ICON_FIDOKEY      ICON   "Res\\Fido.ico"
// IDI_ICON_FINGERPRINT  ICON   "Res\\Fingerprint.ico"
// IDI_ICON_OTP          ICON   "Res\\OTP.ico"
// IDI_ICON_PASSWORD     ICON   "Res\\Password.ico"
// IDI_ICON_PIN          ICON   "Res\\PIN.ico"
// IDI_ICON_PROXIMITY    ICON   "Res\\PROX.ico"
// IDI_ICON_SMARTCARD    ICON   "Res\\Smartcard.ico"

//---------------------------------------------------------------------------
```
