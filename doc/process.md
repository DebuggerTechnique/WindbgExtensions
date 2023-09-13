# process operation during usermode and kernel mode
> thanks to @yardenshafir from https://github.com/yardenshafir/WinDbg_Scripts/
```
// list process
dx -r2 @$cursession.Processes.Select(p => new {Name = p.Name, EPROCESS = &p.KernelObject})
```


```js
function listprocess(){
    let print = host.diagnostics.debugLog;
    let processes = host.currentSession.Processes;
    print("Id\tName\n");
    for(let process of processes){
        try{
            print(process.Id,"\t",process.Name,"\n");
        }
        catch(e){
            print("\tException parsing handler",process.Name,"!\n");
        }
    }
}

function searchprocess(proc){
    let print = host.diagnostics.debugLog;
    let processes = host.currentSession.Processes;
    print("Id\tName\n");
    for(let process of processes){
        try{
            if(process.Name == proc){
                print(process.Id,"\t",process.Name,"\n");
            }
        }
        catch(e){
            print("\tException parsing handler",process.Name,"!\n");
        }
    }
}

1: kd> !sp("avp.exe")
Id	Name
0x82c	avp.exe
@$sp("avp.exe") 
1: kd> !sp("node.exe")
Id	Name
0xa70	node.exe
0xa88	node.exe
0x914	node.exe
0xc08	node.exe
0x1acc	node.exe
0x2694	node.exe
0x25e4	node.exe
0x1ab0	node.exe
0x27fc	node.exe
0x1068	node.exe
0x2494	node.exe
0x880	node.exe
0x1148	node.exe
0x1620	node.exe
0x243c	node.exe
0x26dc	node.exe
0x20a8	node.exe
0x1640	node.exe
@$sp("node.exe")

```
