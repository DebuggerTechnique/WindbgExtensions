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

/// <summary>
/// PWINDBG_OUTPUT_ROUTINE DebugOutputToConsole
/// </summary>
/// <param name=""></param>
DECLARE_API(demo)
{
    dprintf("this is a demo\n");
}

/// <summary>
/// PWINDBG_READ_PROCESS_MEMORY_ROUTINE 读取当前进程(被调试)内存
/// </summary>
/// <param name=""></param>
DECLARE_API(read)
{
    PVOID tmpBuf = LocalAlloc(LPTR,MAX_PATH);
    ULONG size = 0;
    ReadMemory((ULONG_PTR)GetModuleHandle(NULL), tmpBuf,MAX_PATH, &size);
    if (size > 0)
    {
        dprintf("your input args: %s\n", args);
        dprintf("read result: %s\n", tmpBuf);
    }
    else
    {
        ErrorCode(GetLastError());
    }
    LocalFree(tmpBuf);
}

VOID ErrorCode(int errorcode)
{
    if (errorcode != 0)
    {
        char buf[256];
        FormatMessageA(FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
            NULL, errorcode, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
            buf, (sizeof(buf) / sizeof(char)), NULL);

        dprintf("%s\n", buf);
    }
}