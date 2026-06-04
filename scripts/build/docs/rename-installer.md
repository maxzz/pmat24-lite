# Installer Renaming Script (`rename-installer.ts`)

This post-build script runs automatically after `electron-builder` compiles the Windows installer. It renames the default built setup file and its blockmap to a customized naming convention that appends the build timestamp.

---

## Purpose
By default, `electron-builder` generates the NSIS installer according to a static name pattern (e.g., `pmat-setup-<version>.exe`). To maintain an audit trail of build times and distinguish between multiple builds of the same version, this script renames the outputs to:
`pmat-setup-v<version>_at_<YY.MM.DD-HHMM>.exe`

Additionally, it preserves the integrity of Electron's auto-update checks by automatically renaming the associated `.blockmap` file and updating references in the auto-update metadata file (`latest.yml`).

---

## Execution Flow

The script executes the following steps sequentially:

1. **Get Current Version**:
   - Reads `package.json` to get the current application `"version"` (e.g., `1.26.24`).
2. **Generate Time Stamp**:
   - Generates a timestamp based on the local time when the build completed.
   - Formats the timestamp to `YY.MM.DD-HHMM` (e.g., `26.06.04-1514`).
3. **Locate Target Files**:
   - Targets the `release/<version>/` directory.
   - Identifies the default built installer: `pmat-setup-<version>.exe`
   - Identifies the default blockmap file: `pmat-setup-<version>.exe.blockmap`
4. **Rename Installer & Blockmap**:
   - Renames `pmat-setup-<version>.exe` to `pmat-setup-v<version>_at_<YY.MM.DD-HHMM>.exe`.
   - Renames `pmat-setup-<version>.exe.blockmap` to `pmat-setup-v<version>_at_<YY.MM.DD-HHMM>.exe.blockmap`.
5. **Update Auto-Updater Metadata**:
   - Reads `release/<version>/latest.yml` (if it exists).
   - Replaces all occurrences of the original filename `pmat-setup-<version>.exe` with the new file name `pmat-setup-v<version>_at_<YY.MM.DD-HHMM>.exe`.
   - Overwrites `latest.yml` with the updated content to ensure auto-updating remains fully functional.

---

## Demo Data / Example

### Initial State (Before script execution, right after `electron-builder` completes)
**Directory Contents of `release/1.26.24/`**:
- `pmat-setup-1.26.24.exe`
- `pmat-setup-1.26.24.exe.blockmap`
- `latest.yml`

**Contents of `release/1.26.24/latest.yml`**:
```yaml
version: 1.26.24
files:
  - url: pmat-setup-1.26.24.exe
    sha512: d8924b...
    size: 4894408
path: pmat-setup-1.26.24.exe
sha512: d8924b...
```

---

### Script Execution & Output
```text
Using version: 1.26.24
Formatted build time: 26.06.04-1514
Successfully renamed installer: "pmat-setup-1.26.24.exe" -> "pmat-setup-v1.26.24_at_26.06.04-1514.exe"
Successfully renamed blockmap: "pmat-setup-1.26.24.exe.blockmap" -> "pmat-setup-v1.26.24_at_26.06.04-1514.exe.blockmap"
Successfully updated references in "C:\y\c\dp\pmat\release\1.26.24\latest.yml"
```

---

### Final State (After Script Execution)
**Directory Contents of `release/1.26.24/`**:
- `pmat-setup-v1.26.24_at_26.06.04-1514.exe`
- `pmat-setup-v1.26.24_at_26.06.04-1514.exe.blockmap`
- `latest.yml`

**Updated Contents of `release/1.26.24/latest.yml`**:
```yaml
version: 1.26.24
files:
  - url: pmat-setup-v1.26.24_at_26.06.04-1514.exe
    sha512: d8924b...
    size: 4894408
path: pmat-setup-v1.26.24_at_26.06.04-1514.exe
sha512: d8924b...
```
