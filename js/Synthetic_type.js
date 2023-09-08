/*
https://github.com/microsoft/WinDbg-Samples/blob/master/SyntheticTypes/readme.md
非内置结构体 内存解析
*/
"use strict";
"use SynTypes";

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
        new host.functionAlias(ldtp,'ldtp'),
        new host.functionAlias(parse,'parse'),
        new host.functionAlias(exe,'exe'),
        ];
}


/*
https://blog.csdn.net/oShuangYue12/article/details/131107611?spm=1001.2014.3001.5501


show mem into struct of c
*/

function ldtp(path,boundModule,attributes){
    return null;
}

function output(msg){
    host.diagnostics.debugLog(msg)
}

function exe(cmd)
{
    var result = [];
    var obj = host.namespace.Debugger.Utility.Control.ExecuteCommand(cmd);
    // js  of not in
    for(var l of obj){
        result.push(l);
    }
    return result;
}


function parse(structpath,structname,addr){
    output("start :)\n");
    output(`[*] load ${structpath} structs\n`);
    output(`[*] struct name: ${structname}\n`);

    exe(".scriptload D:\\Desktop\\petools\\windbgExt\\js\sys\\SynTypes.js");

    // var strs = "dx Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("`${structpath}`",\"ntdll\")";
    exe("dx Debugger.Utility.Analysis.SyntheticTypes.ReadHeader(\"D:\\Desktop\\petools\\windbgExt\\js\\demo-struct.h\",\"ntdll\")");

    exe("dx -r2 Debugger.Utility.Analysis.SyntheticTypes.CreateInstance(\"_test\",@rbx)");

    exe("lm");

    output("over :)\n");
}
