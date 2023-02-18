#pragma once
#include "framework.h"

#include <DbgEng.h>
#include <string>
#include <sstream>
#include <delayimp.h>
#include <WDBGEXTS.H>

WINDBG_EXTENSION_APIS ExtensionApis = { 0 };
EXT_API_VERSION g_ExtApiVersion = { 5 , 5 ,
#if defined(_M_X64) || defined(_M_ARM64)
	EXT_API_VERSION_NUMBER64
#elif defined(_M_IX86)
	EXT_API_VERSION_NUMBER32
#endif
, 0 };
USHORT NtBuildNumber = 0;

LPEXT_API_VERSION WDBGAPI kdbg_ExtensionApiVersion(void);

VOID WDBGAPI kdbg_WinDbgExtensionDllInit(PWINDBG_EXTENSION_APIS lpExtensionApis, USHORT usMajorVersion, USHORT usMinorVersion);

DECLARE_API(demo);
DECLARE_API(read);

VOID ErrorCode(int errorcode);