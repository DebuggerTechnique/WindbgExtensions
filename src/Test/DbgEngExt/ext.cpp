// https://stackoverflow.com/questions/33541274/windbg-extension-c-dprintf-doesnt-display-until-function-exits
#include <windows.h>
#include <dbgeng.h>

PDEBUG_CLIENT2   g_Client = NULL;
PDEBUG_CONTROL2  g_Control = NULL;
/// Step 1. 加载dll
HRESULT CALLBACK  DebugExtensionInitialize(PULONG Version, PULONG Flags)
{
	*Version = DEBUG_EXTENSION_VERSION(1, 0);
	*Flags = 0;
	DebugCreate(__uuidof(IDebugClient2), (void**)&g_Client);
	return g_Client->QueryInterface(__uuidof(IDebugControl2), (void**)&g_Control);
}

///
/// 可选的导出
/// Step 0. 卸载dll
VOID CALLBACK DebugExtensionUninitialize()
{
	g_Control->Output(DEBUG_OUTPUT_NORMAL,"unload dll\n");
}

///
/// IDebugEventCallbacks
/// https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/dbgeng/nn-dbgeng-idebugeventcallbacks
/// 
void DebugExtensionNotify(
	ULONG Notify,
	ULONG64 Argument
)
{
	switch (Notify)
	{
		case DEBUG_NOTIFY_SESSION_ACTIVE:
		{
			g_Control->Output(DEBUG_OUTPUT_NORMAL, "A debugging session is active. The session may not necessarily be suspended\n");
			break;
		}
		case DEBUG_NOTIFY_SESSION_INACTIVE:
		{
			g_Control->Output(DEBUG_OUTPUT_NORMAL, "No debugging session is active.\n");
			break;
		}
		case DEBUG_NOTIFY_SESSION_ACCESSIBLE:
		{

			g_Control->Output(DEBUG_OUTPUT_NORMAL, "The debugging session has suspended and is now accessible.\n");
			break;
		}
		case DEBUG_NOTIFY_SESSION_INACCESSIBLE:
		{
			g_Control->Output(DEBUG_OUTPUT_NORMAL, "The debugging session has started running and is now inaccessible\n");
			break;
		}
		default:
			break;
	}

}


HRESULT CALLBACK testsleep(PDEBUG_CLIENT pDebugClient, PCSTR)
{
	ULONG now = 0;
	g_Control->GetCurrentSystemUpTime(&now);
	g_Control->Output(DEBUG_OUTPUT_NORMAL, "sleep %x or %d now at %d\n", 5000, 5000, now);
	// windbg busy
	Sleep(5000);
	g_Control->GetCurrentSystemUpTime(&now);
	g_Control->Output(DEBUG_OUTPUT_NORMAL, "woke  %x or %d now at %d\n", 5000, 5000, now);
	return S_OK;
}