// https://stackoverflow.com/questions/33541274/windbg-extension-c-dprintf-doesnt-display-until-function-exits
// lnk 2001 error when engextcpp.cpp missing
// example at https://github.com/tpn/winsdk-10/ Awesome project!
#include <engextcpp.hpp>

class EXT_CLASS : public ExtExtension {
public:
	EXT_COMMAND_METHOD(demo);
};

EXT_DECLARE_GLOBALS();

// https://github.com/tpn/winsdk-10/blob/master/Debuggers/x64/sdk/samples/extcpp/extcpp.cpp
EXT_COMMAND(demo, 
	"show a demo",
	"")
{
	Out("this is a demo");
}