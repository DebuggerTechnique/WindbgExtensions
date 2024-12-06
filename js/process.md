## alpc
credits to https://github.com/yardenshafir/WinDbg_Scripts
```
// lambda functions
dx @$getPortsForProcess = (p => Debugger.Utility.Control.ExecuteCommand("!alpc /lpp " + ((__int64)p).ToDisplayString("x")))

// parse the specified process
dx -r3 @$cursession.Processes.Where(x => x.Name == "lsass.exe").Select(p => new {Name = p.Name, Ports = @$getPortsForProcess(&p.KernelObject)})
```