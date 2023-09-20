# DML
> https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/customizing-debugger-output-using-dml    
>
> how to use    
> .dml_start xxx\mycommands.txt    
```
<link cmd="r rax">don't click me with nothing
<altlink name="disassembly (u)" cmd="u" />u</altlink>
	<altlink name="subdisassembly1 (u)" cmd="u" />disassembly1</altlink>
	<altlink name="subdisassembly2 (u)" cmd="u" />disassembly2</altlink>
<altlink name="r" cmd="r" />read register</altlink>
<altlink name="list parameters during call function" cmd="dd rsp" />dd rsp</altlink>
</link>
```
