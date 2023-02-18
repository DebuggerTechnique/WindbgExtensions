#include "helloworld.h"
#include "framework.h"
#include "pch.h"

LPEXT_API_VERSION WDBGAPI kdbg_ExtensionApiVersion(void)
{
    return &g_ExtApiVersion;
}

VOID WDBGAPI kdbg_WinDbgExtensionDllInit(PWINDBG_EXTENSION_APIS lpExtensionApis, USHORT usMajorVersion, USHORT usMinorVersion)
{
    ExtensionApis = *lpExtensionApis;
    NtBuildNumber = usMinorVersion;
    // printf to windbg console
    dprintf("\nhello world! Windows build %hu\n",NtBuildNumber);
}

DECLARE_API(demo)
{
    dprintf("this is a demo\n");
}