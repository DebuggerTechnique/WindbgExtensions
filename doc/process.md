# process operation during usermode and kernel mode
> thanks to @yardenshafir from https://github.com/yardenshafir/WinDbg_Scripts/
```
// list process
dx -r2 @$cursession.Processes.Select(p => new {Name = p.Name, EPROCESS = &p.KernelObject})
```
