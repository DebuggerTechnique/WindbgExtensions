/*
windbg js script for process operations
!lp    list process(iterator process through windbg datamodel)
!sp("lsass.exe")  search process
!jp(0x222)   switch to process when kernel mode rather than ugly stuff which "!process 0 0 xxx.exe; .process /r /p [eprocess_address]"


*/


"use strict";

function initializeScript()
{
    //
    // Return an array of registration objects to modify the object model of the debugger
    // See the following for more details:
    //
    //     https://aka.ms/JsDbgExt
    //
    return [
        new host.apiVersionSupport(1, 7),
        new host.functionAlias(mulbp,'mulbp'),
        new host.functionAlias(searchprocess,'sp'),
        new host.functionAlias(listprocess,'lp'),
        new host.functionAlias(switchtoProcess,'jp'),
        ];
}

/*

js  String prototype ext functions
https://www.cnblogs.com/xdp-gacl/p/3702898.html
*/
String.prototype.startswith = function(str,prefix){
    if(!str && prefix){
        
    }
}

function mulbp(){
    // retrieve args info and register
    return true;
}

function print_info(msg){
    print("[*] " + msg);
}

function print_debug(msg){
    print(`[+] ${msg}`);
}

function print_warn(msg){
    print(`[!] ${msg}`);
}

function print_error(msg){
    print(`[-] ${msg}`);
}

function print(msg){
    var tmp = new String(msg);
    if(!tmp.endsWith('\n')){
        tmp = tmp + '\n';
    }
    host.diagnostics.debugLog(tmp);
}

function exe(cmd){
    var result = [];
    var obj = host.namespace.Debugger.Utility.Control.ExecuteCommand("" + cmd);
    // js  of not in
    for(var l of obj){
        result.push(l);
    }
    return result;
}

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
            if(process.Name == proc || process.Id == proc){
                print(process.Id,"\t",process.Name,"\n");
            }
        }
        catch(e){
            print("\tException parsing handler",process.Name,"!\n");
        }
    }
}

function switchtoProcess(pid){
    exe("dx -s @$debuggerRootNamespace.Debugger.Sessions[0].Processes[" + pid + "].SwitchTo()");
    print(`switch to ${pid} successfully!`);
    return exe("dx @$curprocess");
}
