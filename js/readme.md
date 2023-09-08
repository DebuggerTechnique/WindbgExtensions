# windbg js script

## invoke commands
```js
//
// reference from https://www.zcgonvh.com/post/powershell_malware_analysis_helper_clr_hook.html
//
function listmodule()
{
    var result = [];
    var obj = host.namespace.Debugger.Utility.Control.ExecuteCommand("lm");
    // js  of not in
    for(var l of obj){
        result.push(l);
    }
    return result;
}
```

## export function alias
```js
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
        ];
}
function bopin(){
    return null;
}
```